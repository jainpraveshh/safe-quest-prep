import { ReactNode, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface PageTransitionProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
}

export const PageTransition = ({ 
  children, 
  isLoading = false, 
  loadingMessage = "Loading..." 
}: PageTransitionProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner variant="page" message={loadingMessage} />;
  }

  return (
    <div className={`transition-all duration-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
};