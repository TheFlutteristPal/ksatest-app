
"use client";

import { useState, useEffect } from 'react';
import { Download, Upload, Zap as PingIcon, AlertTriangle } from 'lucide-react';
import { SpeedGauge } from '@/components/speed-test/SpeedGauge';
import { FileSizeSelector } from '@/components/speed-test/FileSizeSelector';
import { IspInfoDisplay } from '@/components/speed-test/IspInfoDisplay';
import { StartTestButton } from '@/components/speed-test/StartTestButton';
import { useLanguage } from '@/contexts/LanguageProvider';
import type { SpeedTestResult } from '@/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { Progress } from "@/components/ui/progress";
import { HistoryDisplay } from '@/components/history/HistoryDisplay';

export default function SpeedTestPage() {
  const { t } = useLanguage();
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [selectedFileSize, setSelectedFileSize] = useState(10); // Default 10MB
  const [isp, setIsp] = useState(t('loadingIsp'));
  const [serverLocation, setServerLocation] = useState(t('loadingServer'));
  const [ipv4Address, setIpv4Address] = useState(t('loadingIpv4Address'));
  const [testProgress, setTestProgress] = useState(0);

  const [history, setHistory] = useLocalStorage<SpeedTestResult[]>('speedTestHistory', []);

  useEffect(() => {
    const fetchIpData = async () => {
      // Fetch ISP and Location from ipapi.co
      try {
        const ipApiResponse = await fetch('https://ipapi.co/json/');
        if (!ipApiResponse.ok) throw new Error('Failed to fetch IP info from ipapi.co');
        const ipApiData = await ipApiResponse.json();
        setIsp(ipApiData.org || t('unavailableIsp'));
        setServerLocation(ipApiData.city && ipApiData.country_name ? `${ipApiData.city}, ${ipApiData.country_name}` : t('unavailableServer'));
      } catch (error) {
        console.error("Error fetching IP info from ipapi.co:", error);
        setIsp(t('unavailableIsp'));
        setServerLocation(t('unavailableServer'));
      }

      // Fetch IPv4
      try {
        const ipv4Response = await fetch('https://api.ipify.org?format=json');
        if (!ipv4Response.ok) throw new Error('Failed to fetch IPv4 address');
        const ipv4Data = await ipv4Response.json();
        setIpv4Address(ipv4Data.ip || t('unavailableIpv4Address'));
      } catch (error) {
        console.error("Error fetching IPv4 address:", error);
        setIpv4Address(t('unavailableIpv4Address'));
      }
    };

    fetchIpData();
  }, [t]);

  const simulateSpeedTest = () => {
    setIsTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setTestProgress(0);

    // Simulate Ping
    setTimeout(() => {
      setPing(Math.floor(Math.random() * 50) + 10); // 10-60 ms
      setTestProgress(20);
    }, 500);

    // Simulate Download
    setTimeout(() => {
      const dlSpeed = parseFloat((Math.random() * 100 + 5).toFixed(2)); // 5-105 Mbps
      let currentDl = 0;
      const dlInterval = setInterval(() => {
        currentDl += dlSpeed / 10;
        if (currentDl >= dlSpeed) {
          setDownloadSpeed(dlSpeed);
          clearInterval(dlInterval);
          setTestProgress(60);
        } else {
          setDownloadSpeed(parseFloat(currentDl.toFixed(2)));
        }
      }, 100);
    }, 1500);
    
    // Simulate Upload
    setTimeout(() => {
      const ulSpeed = parseFloat((Math.random() * 50 + 2).toFixed(2)); // 2-52 Mbps
      let currentUl = 0;
      const ulInterval = setInterval(() => {
        currentUl += ulSpeed / 10;
        if (currentUl >= ulSpeed) {
          setUploadSpeed(ulSpeed);
          clearInterval(ulInterval);
          setTestProgress(100);
        } else {
          setUploadSpeed(parseFloat(currentUl.toFixed(2)));
        }
      }, 100);
    }, 3500);

    // Finish test
    setTimeout(() => {
      setIsTesting(false);
      const finalDownloadSpeed = parseFloat((Math.random() * 100 + 5).toFixed(2));
      const finalUploadSpeed = parseFloat((Math.random() * 50 + 2).toFixed(2));
      const finalPing = Math.floor(Math.random() * 50) + 10;
      
      setDownloadSpeed(finalDownloadSpeed);
      setUploadSpeed(finalUploadSpeed);
      setPing(finalPing);

      const newResult: SpeedTestResult = {
        id: new Date().toISOString(),
        timestamp: Date.now(),
        downloadSpeed: finalDownloadSpeed,
        uploadSpeed: finalUploadSpeed,
        ping: finalPing,
        fileSize: selectedFileSize,
        isp: isp,
        serverLocation: serverLocation,
        ipv4Address: ipv4Address,
      };
      setHistory([newResult, ...history.slice(0, 19)]); // Keep last 20 results
    }, 5500);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center font-headline">{t('speedTest')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpeedGauge title={t('download')} value={downloadSpeed} unit={t('mbps')} icon={<Download />} isLoading={isTesting && downloadSpeed === 0} />
        <SpeedGauge title={t('upload')} value={uploadSpeed} unit={t('mbps')} icon={<Upload />} isLoading={isTesting && uploadSpeed === 0} />
        <SpeedGauge title={t('ping')} value={ping} unit={t('ms')} icon={<PingIcon />} isLoading={isTesting && ping === 0} />
      </div>
      
      {isTesting && (
        <div className="my-4">
          <Progress value={testProgress} className="w-full h-3 [&>div]:bg-accent" />
          <p className="text-center text-sm text-muted-foreground mt-2">{t('testingInProgress')}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-card rounded-lg shadow-md">
        <FileSizeSelector 
          selectedSize={selectedFileSize} 
          onSizeChange={setSelectedFileSize}
          disabled={isTesting}
        />
        <StartTestButton 
          onClick={simulateSpeedTest} 
          isLoading={isTesting}
          text={t('startTest')}
        />
      </div>

      <IspInfoDisplay 
        isp={isp} 
        serverLocation={serverLocation} 
        ipv4Address={ipv4Address}
      />

      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold font-headline text-center mb-6">{t('testHistory')}</h2>
        <HistoryDisplay history={history} onClearHistory={handleClearHistory} />
      </div>

      <footer className="text-center text-muted-foreground text-sm py-8">
        BY Abo Yassir, All Rights Reserved 2025
      </footer>
    </div>
  );
}
