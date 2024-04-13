"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  text: string;
  textClassName?: string;
  maxWidth?: number;
}

const TitleWithLine: FC<Props> = ({
  text,
  maxWidth = 90,
  textClassName = "font-medium",
}) => {
  return (
    <div className={cn("relative", `w-[${maxWidth}%]`)}>
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t"></div>
      </div>
      <div className="relative flex justify-center">
        <span className={cn("bg-background px-2 text-muted-foreground")}>
          <span className={cn(textClassName)}>{text}</span>
        </span>
      </div>
    </div>
  );
};

export default TitleWithLine;
