import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcryptjs";
import type { UserRole } from "../types/index.js";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: UserRole;
  avatar: string;
  phone: string;
  bio: string;
  comparePassword: (candidate: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, minlength: 6, select: false },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password") || !this.password) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function comparePassword(
  candidate: string,
): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", userSchema);
