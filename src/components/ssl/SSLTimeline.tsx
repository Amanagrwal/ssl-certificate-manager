import { cn } from "@/lib/utils";
import { Check, Circle, X } from "lucide-react";
import type { SSLStatus } from "@/data/ssl-mock-data";
import { TIMELINE_STEPS, STATUS_TO_STEP } from "@/data/ssl-mock-data";

export function SSLTimeline({ status }: { status: SSLStatus }) {
  const currentStep = STATUS_TO_STEP[status];
  const isFailed = status === "failed";

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-[600px] px-2 py-4">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index <= currentStep && !isFailed;
          const isFailedStep = isFailed && index === currentStep;
          const isCurrent = index === currentStep && !isFailed;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                    isCompleted
                      ? "border-status-success bg-status-success text-background"
                      : isFailedStep
                        ? "border-destructive bg-destructive text-background"
                        : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isFailedStep ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs text-center whitespace-nowrap font-medium",
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < TIMELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-0.5 flex-1",
                    index < currentStep && !isFailed
                      ? "bg-status-success"
                      : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
