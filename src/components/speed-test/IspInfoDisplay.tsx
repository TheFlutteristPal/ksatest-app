
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageProvider";
import { Wifi, Server as ServerIcon, Network } from "lucide-react"; 

interface IspInfoDisplayProps {
  isp?: string;
  serverLocation?: string;
  ipAddress?: string;
}

export function IspInfoDisplay({ isp = "N/A", serverLocation = "N/A", ipAddress = "N/A" }: IspInfoDisplayProps) {
  const { t } = useLanguage();
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center">
          <Wifi className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-medium">{t('isp')}:</p>
            <p className="text-muted-foreground">{isp}</p>
          </div>
        </div>
        <div className="flex items-center">
          <ServerIcon className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-medium">{t('server')}:</p>
            <p className="text-muted-foreground">{serverLocation}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Network className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-medium">{t('ipAddress')}:</p>
            <p className="text-muted-foreground">{ipAddress}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
