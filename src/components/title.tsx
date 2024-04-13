"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  text: string;
  subtitle?: string;
  className?: string;
  size?: "lg" | "n" | "sm" | "xs";
  isSubtitle?: string | boolean | undefined;
  isH1?: string | boolean | undefined;
  dark?: string | boolean | undefined;
}

const Title: FC<Props> = ({
  text,
  className = "",
  size = "n",
  dark,
  subtitle,
  isH1,
  isSubtitle,
}) => {
  return (
    <div className="flex items-center justify-between">
      {isH1 ? (
        <h1
          className={cn(
            "mont font-bold leading-8 tracking-tight ",
            size == "n" && "text-2xl lg:text-4xl",
            size == "lg" && "text-3xl lg:text-5xl",
            size == "sm" && "text-xl lg:text-2xl",
            className,
            { "text-primary": dark }
          )}
        >
          {text}
        </h1>
      ) : (
        <h2
          className={cn(
            "mont font-bold leading-8 tracking-tight ",
            size == "n" && "text-2xl lg:text-4xl",
            size == "lg" && "text-3xl lg:text-5xl",
            size == "sm" && "text-xl lg:text-2xl",
            size == "xs" && "text-md lg:text-lg",
            className,
            { "text-primary": dark }
          )}
        >
          {text}
        </h2>
      )}

      {subtitle && (
        <p
          className={cn(
            "font-medium leading-6 tracking-tight",
            size == "n" && "text-xl lg:text-2xl",
            size == "lg" && "text-md lg:text-lg",
            size == "sm" && "text-xs lg:text-sm",
            className,
            { "text-primary": dark }
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
