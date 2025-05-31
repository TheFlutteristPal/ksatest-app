
"use client";

import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

interface StartTestButtonProps {
  onClick: () => void;
  isLoading: boolean;
  text: string;
}

export function StartTestButton({ onClick, isLoading, text }: StartTestButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading} 
      size="lg" 
      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 px-10 shadow-lg"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Play className="mr-2 h-5 w-5" />
      )}
      {text}
    </Button>
  );
}
