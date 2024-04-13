"use client";

import { cn } from "@/lib/utils";
import { ChevronDownCircle, CopyIcon } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  id: string | number | BigInt;
  text?: string;
  children?: ReactNode;
  className?: string;
}

const IdToggler: FC<Props> = ({ id, text = "#ID", children, className }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [open]);

  // copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(String(id))
      .then(() => {
        toast.success(String(id) + " copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <div className={cn("flex gap-x-1 items-center")}>
      {!open ? (
        <span className="transition">
          {children ? (
            <span className="flex gap-x-1 items-center cursor-pointer">
              {children}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronDownCircle
                      className="w-3 h-3 text-muted-foreground cursor-pointer"
                      onClick={() => setOpen(true)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View ID</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="flex gap-x-1 items-center cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <span className={cn("text-sm", className)}>{text}</span>
                    <ChevronDownCircle className="w-3 h-3 text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View ID</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </span>
      ) : (
        <span
          className={cn(
            "text-sm flex items-center gap-x-2 transition",
            className
          )}
        >
          <span>{String(id)}</span>
        </span>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="ml-2 cursor-pointer">
              <CopyIcon
                className="w-4 h-4 text-muted-foreground"
                onClick={copyToClipboard}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy ID</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default IdToggler;
