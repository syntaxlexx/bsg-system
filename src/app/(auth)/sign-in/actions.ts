"use server";

import {
  LoginRequest,
  LoginValidator,
} from "@/data-layer/validators/auth-validator";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { getZodErrors, serverActionResponse } from "@/lib/server-utils";
import { sendErrorToSlack } from "@/lib/slack";
import { AUTH_ERROR } from "@/types";
import { AuthError } from "next-auth";
import { ZodError } from "zod";

export async function signInUser(payload: LoginRequest) {
  try {
    const { email, password } = LoginValidator.parse(payload);

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return serverActionResponse({
        ok: false,
        isValidationError: true,
        message: await getZodErrors(error),
      });
    }

    if (error instanceof AuthError) {
      let message = "Something went wrong! Please try again later.";
      const exactError = error.cause?.err?.message || error.message;

      switch (exactError) {
        case "CredentialsSignin":
          message = "Invalid email or password";
          break;
        case AUTH_ERROR.MISSING_CREDENTIALS:
          message = "Please enter an email and password";
          break;
        case AUTH_ERROR.USER_NOT_FOUND:
        case AUTH_ERROR.PASSWORD_ERROR:
          message = "Incorrect credentials provided";
          break;
        case AUTH_ERROR.ACCOUNT_DEACTIVATED:
          message =
            "Your account is deactivated! Please contact the administrators for further information.";
          break;
        case AUTH_ERROR.OAuthNotLinked:
          message = "Email already in use with a different provider.";
          break;
        default:
          break;
      }

      await sendErrorToSlack(exactError);

      return serverActionResponse({
        ok: false,
        message: message,
      });
    }

    throw error;
  }
}
