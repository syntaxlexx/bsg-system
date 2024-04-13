"use client";

import {
  LoginRequest,
  LoginValidator,
} from "@/data-layer/validators/auth-validator";
import { FC, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signInUser } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { TitleWithLine, ValidationErrors } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { boolean } from "boolean";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";

const socialsEnabled = boolean(process.env.NEXT_PUBLIC_SOCIALS_LOGIN_ENABLED);

interface Props {
  className?: string;
  redirectTo?: string;
}

const AuthForm: FC<Props> = ({ className, redirectTo }) => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | string[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
  });

  async function onSubmit(formData: LoginRequest) {
    setErrors(null);

    startTransition(() => {
      signInUser(formData)
        .then((resp) => {
          if (!resp?.ok) {
            console.log("resp", resp);
            if (resp?.isValidationError) {
              setErrors(resp?.message);
              toast.error("Check your email and password and try again");
            } else {
              setErrors(resp?.message);
            }

            return;
          }

          toast.success("Sign In Successful", {
            description: "Redirecting to dashboard...",
          });
        })
        .catch((error) => {
          console.log("error", error);
          setErrors("We could not sign you in");
        });
    });
  }

  const loginWithGoogle = async () => {
    return toast.message("Google Signin Coming Soon");

    try {
      throw new Error("Unimplemented");
      // await signIn("google", { callbackUrl: `${url}${redirectTo}` });
    } catch (error) {
      // toast notification
      toast.error("There was an error login in with Google.");
    }
  };

  const loginWithFacebook = async () => {
    return toast.message("FaceBook Signin Coming Soon");
    try {
      throw new Error("Unimplemented");
      // await signIn("google", { callbackUrl: `${url}${redirectTo}` });
    } catch (error) {
      // toast notification
      toast.error("There was an error login in with Facebook.");
    }
  };

  if (!isMounted) return <LoadingSkeleton />;

  return (
    <div className="space-y-4 w-full">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className={cn("grid gap-6 w-full", className)}>
          {/* <p className="text-base">Enter Your Email/Password.</p> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="">Email</FormLabel>
                    <div className="">
                      <FormControl>
                        <Input
                          placeholder="johndoe@gmail.com"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isPending}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex w-full justify-end items-center mb-1">
                <Link href="/forgot-password">
                  <p className="text-sm underline underline-offset-2 text-muted-foreground">
                    Forgot password
                  </p>
                </Link>
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="">Password</FormLabel>
                    <div className="">
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          disabled={isPending}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {errors && <ValidationErrors errors={errors} />}

              <Button
                disabled={isPending}
                type="submit"
                size="lg"
                isLoading={isPending}
                iconSuffix={<ChevronRight />}
                className="mt-2"
              >
                Sign In
              </Button>
            </form>
          </Form>

          {socialsEnabled && (
            <div className="space-y-4">
              <TitleWithLine text="Or continue with" />

              <div className={cn("grid gap-4 md:grid-cols-2", className)}>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 hover:shadow-lg",
                    {
                      "opacity-50": isPending,
                    }
                  )}
                  onClick={loginWithGoogle}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Image
                      src="/img/google.svg"
                      alt="google"
                      width={200}
                      height={200}
                      className="mr-2 h-8 w-8"
                    />
                  )}
                  <span>Sign in with Google</span>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-4 rounded-lg border bg-[#3b5998]  p-4 text-white hover:shadow-lg",
                    {
                      "opacity-50": isPending,
                    }
                  )}
                  onClick={loginWithFacebook}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Image
                      src="/img/facebook-white.svg"
                      alt="facebook"
                      width={200}
                      height={200}
                      className="mr-2 h-8 w-8"
                    />
                  )}

                  <span className="text-white">Sign in with Facebook</span>
                </motion.div>
              </div>
            </div>
          )}

          <TitleWithLine text="Don't have an account yet?" />

          <Link
            href="/sign-up"
            className={cn(buttonVariants({ variant: "subtle" }))}
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="flex min-w-[300px] flex-col items-center space-y-4 md:min-w-[400px]">
      <div className="mt-4 flex w-full flex-col space-y-4">
        <Skeleton className="h-6 w-[60%]" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="mb-4 flex w-full flex-col space-y-4">
        <TitleWithLine text="Or" textClassName="text-base font-light" />
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardContent className="flex items-center gap-2 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 flex-1" />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="flex items-center gap-2 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 flex-1" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
