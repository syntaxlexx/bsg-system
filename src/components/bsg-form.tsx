"use client";

import { FC, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { BSG_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {}

const BsgForm: FC<Props> = ({}) => {
  const [selectedStep, setSelectedStep] = useState<any>(
    Object.values(BSG_STEPS)[0]
  );

  return (
    <div>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(BSG_STEPS).map((step) => (
              <div
                key={step.title}
                className={cn(
                  "rounded-full px-4 py-1.5 border border-primary flex flex-col items-center justify-center space-y-2 cursor-pointer",
                  {
                    "bg-primary text-white": step.title === selectedStep?.title,
                  }
                )}
                onClick={() => setSelectedStep(step)}
              >
                <p className="text-center">{step.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BsgForm;
