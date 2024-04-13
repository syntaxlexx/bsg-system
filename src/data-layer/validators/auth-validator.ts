import { z } from "zod";

export const LoginValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, "A valid email is required")
    .max(191)
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "A valid, longer password is required")
    .max(191),
});

export type LoginRequest = z.infer<typeof LoginValidator>;

export const RegistrationValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, "A valid email is required")
    .max(191)
    .email("A valid email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "A valid, longer password is required")
    .max(191),
  confirm_password: z
    .string({ required_error: "Confirm password is required" })
    .min(3)
    .max(191),
  isShopManager: z.coerce.boolean().optional(),
});

export type RegistrationRequest = z.infer<typeof RegistrationValidator>;

export const ResetPasswordValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, "A valid email is required")
    .max(191)
    .email("A valid email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "A valid, longer password is required")
    .max(191),
  confirm_password: z
    .string({ required_error: "Confirm password is required" })
    .min(3, "A valid, longer password is required")
    .max(191),
  token: z.string(),
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordValidator>;
