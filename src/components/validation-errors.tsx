"use client";

import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  errors: string | string[];
}

const ValidationErrors: FC<Props> = ({ errors }) => {
  if (Array.isArray(errors))
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        {/* <AlertTitle>Form validation errors</AlertTitle> */}
        <AlertDescription>
          {errors.map((item, i) => (
            <p className="text-sm" key={i}>
              {item}
            </p>
          ))}
        </AlertDescription>
      </Alert>
    );

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      {/* <AlertTitle>Form validation errors</AlertTitle> */}
      <AlertDescription>{errors}</AlertDescription>
    </Alert>
  );
};

export default ValidationErrors;
