import type { NextFunction, Request, Response } from "express";
import crypto from "node:crypto";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { User } from "../models/User.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { signToken } from "../utils/token.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../utils/validators.js";

function setAuthCookie(res: Response, token: string): void {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function sanitizeUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  bio: string;
  createdAt?: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    phone: user.phone,
    bio: user.bio,
    createdAt: user.createdAt,
  };
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: payload.email });
    if (exists) {
      throw new AppError("Email is already registered", 409);
    }

    const user = await User.create(payload);
    const token = signToken(user.id, user.role);
    setAuthCookie(res, token);

    sendSuccess(
      res,
      { user: sanitizeUser(user), token },
      "Account created successfully",
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await User.findOne({ email: payload.email }).select(
      "+password",
    );

    if (!user || !(await user.comparePassword(payload.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken(user.id, user.role);
    setAuthCookie(res, token);

    sendSuccess(res, { user: sanitizeUser(user), token }, "Login successful");
  } catch (error) {
    next(error);
  }
}

export async function logout(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.clearCookie("token");
    sendSuccess(res, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
}

export async function getMe(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    sendSuccess(res, { user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = {
      name: typeof req.body.name === "string" ? req.body.name : undefined,
      phone: typeof req.body.phone === "string" ? req.body.phone : undefined,
      bio: typeof req.body.bio === "string" ? req.body.bio : undefined,
      password:
        typeof req.body.password === "string" && req.body.password.length > 0
          ? req.body.password
          : undefined,
      avatar:
        typeof req.body.avatar === "string" && req.body.avatar.length > 0
          ? req.body.avatar
          : undefined,
    };

    const payload = updateProfileSchema.parse(body);
    const user = await User.findById(req.user?.id).select("+password");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (payload.name !== undefined) user.name = payload.name;
    if (payload.phone !== undefined) user.phone = payload.phone;
    if (payload.bio !== undefined) user.bio = payload.bio;
    if (payload.password !== undefined) user.password = payload.password;

    if (req.file) {
      user.avatar = `${env.SERVER_URL}/uploads/${req.file.filename}`;
    } else if (payload.avatar !== undefined) {
      user.avatar = payload.avatar;
    }

    await user.save();
    sendSuccess(res, { user: sanitizeUser(user) }, "Profile updated");
  } catch (error) {
    next(error);
  }
}

export async function getDemoCredentials(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    sendSuccess(res, {
      admin: {
        email: env.DEMO_ADMIN_EMAIL,
        password: env.DEMO_ADMIN_PASSWORD,
      },
      user: {
        email: env.DEMO_USER_EMAIL,
        password: env.DEMO_USER_PASSWORD,
      },
      googleEnabled: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
    });
  } catch (error) {
    next(error);
  }
}

export function googleAuthRedirect(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      res.redirect(
        `${env.CLIENT_URL}/login?google=missing_config`,
      );
      return;
    }

    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "openid email profile",
      access_type: "online",
      prompt: "select_account",
    });

    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    );
  } catch (error) {
    next(error);
  }
}

export async function googleAuthCallback(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      throw new AppError("Google login is not configured", 503);
    }

    const code = typeof req.query.code === "string" ? req.query.code : "";
    if (!code) {
      throw new AppError("Google authorization code missing", 400);
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      throw new AppError("Failed to exchange Google authorization code", 401);
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
    };

    if (!tokenData.access_token) {
      throw new AppError("Google access token missing", 401);
    }

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    if (!profileResponse.ok) {
      throw new AppError("Failed to fetch Google profile", 401);
    }

    const profile = (await profileResponse.json()) as {
      id: string;
      email: string;
      name: string;
      picture?: string;
    };

    let user = await User.findOne({
      $or: [{ googleId: profile.id }, { email: profile.email.toLowerCase() }],
    });

    if (!user) {
      user = await User.create({
        name: profile.name || "Google Traveler",
        email: profile.email.toLowerCase(),
        googleId: profile.id,
        password: crypto.randomBytes(32).toString("hex"),
        avatar:
          profile.picture ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
      });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      if (profile.picture) user.avatar = profile.picture;
      await user.save();
    }

    const token = signToken(user.id, user.role);
    setAuthCookie(res, token);
    res.redirect(
      `${env.CLIENT_URL}/login?google=success&token=${encodeURIComponent(token)}`,
    );
  } catch (error) {
    next(error);
  }
}
