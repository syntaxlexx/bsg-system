"use client";

import { cn } from "@/lib/utils";
import { LoaderIcon, Search, XIcon } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "./ui/input";

const iconClasses = "h-4 w-4 md:h-6 md:w-6 text-primary/50";

interface Props {
  placeholder?: string;
  onChange?: (val: string) => void;
  isLoading?: boolean;
  className?: string;
  defaultValue?: string;
}

const SearchInput: FC<Props> = ({
  placeholder = "Search products",
  onChange,
  isLoading = false,
  className,
  defaultValue,
}) => {
  const [input, setInput] = useState<string>(defaultValue || "");

  return (
    <div className="group relative">
      <Input
        placeholder={placeholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        className={cn("relative pr-9", className)}
      />

      <div className="absolute bottom-0 right-2 top-0 grid items-center justify-center">
        {isLoading ? (
          <LoaderIcon className={cn(iconClasses, "animate-spin ")} />
        ) : (
          <Search className={cn(iconClasses, "group-hover:text-primary")} />
        )}
      </div>

      {input && input.length > 0 && (
        <div className="absolute top-0 bottom-0 right-8 grid items-center">
          <XIcon
            className={cn(iconClasses, "hover:text-primary cursor-pointer")}
            onClick={() => {
              setInput("");
              if (onChange) onChange("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
