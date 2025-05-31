
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface SpeedGaugeProps {
  title: string;
  value: number | string;
  unit: string;
  icon?: ReactNode;
  isLoading?: boolean;
}

export function SpeedGauge({ title, value, unit, icon, isLoading = false }: SpeedGaugeProps) {
  return (
    <Card className="text-center shadow-lg w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
           <div className="h-12 w-full animate-pulse bg-muted rounded-md my-1"></div>
        ) : (
          <div className="text-4xl font-bold text-primary font-headline">
            {value}
          </div>
        )}
        <p className="text-sm text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  );
}
