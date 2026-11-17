import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthTokenPayload, UserRole } from "../types/index.js";

export function signToken(id: string, role: UserRole): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign({ id, role }, env.JWT_SECRET as Secret, options);
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.JWT_SECRET as Secret) as AuthTokenPayload;
}
