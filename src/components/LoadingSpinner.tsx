import { Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSpinnerProps {
  message?: string;
  variant?: 'default' | 'page' | 'card';
}

export const LoadingSpinner = ({ message = "Loading...", variant = 'default' }: LoadingSpinnerProps) => {
  if (variant === 'page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Shield className="h-16 w-16 text-primary mx-auto animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <Shield className="h-16 w-16 text-primary/30 mx-auto" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-lg text-foreground">EduShield</p>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary animate-spin" />
        <span className="text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};