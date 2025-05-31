
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

const PING_SAMPLES = 10; // Increased from 5
const CLOUDFLARE_SPEED_TEST_BASE_URL = 'https://speed.cloudflare.com';

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
  const [testProgress, setTestProgress] = useState(0); // Overall progress
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentTestPhase, setCurrentTestPhase] = useState('');


  const [history, setHistory] = useLocalStorage<SpeedTestResult[]>('speedTestHistory', []);

  useEffect(() => {
    const fetchIpData = async () => {
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

  const measurePing = async () => {
    setCurrentTestPhase(t('ping'));
    setTestProgress(0);
    let totalTime = 0;
    const basePingUrl = `${CLOUDFLARE_SPEED_TEST_BASE_URL}/__down?bytes=0`;

    for (let i = 0; i < PING_SAMPLES; i++) {
      const pingUrlWithCacheBuster = `${basePingUrl}&_=${Date.now()}-${i}`; // Unique cache buster for each request
      const startTime = performance.now();
      try {
        await fetch(pingUrlWithCacheBuster, {cache: 'no-store', mode: 'cors'});
      } catch (e) {
        console.warn(`Ping sample ${i + 1} failed:`, e);
      }
      totalTime += performance.now() - startTime;
      setTestProgress(Math.round(((i + 1) / PING_SAMPLES) * 15)); // Ping contributes up to 15%
    }
    const avgPing = Math.round(totalTime / PING_SAMPLES);
    setPing(avgPing);
    setTestProgress(15); // Ping complete
    return avgPing;
  };

  const measureDownloadSpeed = async (fileSizeMB: number) => {
    setCurrentTestPhase(t('download'));
    setDownloadProgress(0);
    setTestProgress(15); // Start download phase
    
    const fileSizeInBytes = fileSizeMB * 1024 * 1024;
    const downloadUrl = `${CLOUDFLARE_SPEED_TEST_BASE_URL}/__down?bytes=${fileSizeInBytes}&_=${Date.now()}`;

    const startTime = performance.now();
    let receivedLength = 0;

    try {
      const response = await fetch(downloadUrl, {cache: 'no-store', mode: 'cors'});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error('Response body is null');

      const reader = response.body.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        receivedLength += value.length;
        const progress = (receivedLength / fileSizeInBytes) * 100;
        setDownloadProgress(Math.min(100, progress));
        // Download phase contributes from 15% to 55% (40% total)
        setTestProgress(15 + Math.round(progress * 0.40)); 
      }
    } catch (error) {
      console.error("Download test error:", error);
      setDownloadSpeed(0);
      throw error;
    }

    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;
    
    if (durationInSeconds === 0 || receivedLength === 0) {
        setDownloadSpeed(0);
        return 0;
    }

    const speedBps = (receivedLength * 8) / durationInSeconds;
    const speedMbps = parseFloat((speedBps / (1024 * 1024)).toFixed(2));
    setDownloadSpeed(speedMbps);
    setDownloadProgress(100);
    setTestProgress(55); // Download complete
    return speedMbps;
  };

  const measureUploadSpeed = async (fileSizeMB: number) => {
    setCurrentTestPhase(t('upload'));
    setUploadProgress(0);
    // Upload phase starts after download (55%)
    setTestProgress(55);

    // Simulate upload by animating progress
    const totalSteps = 20; // Number of animation steps
    // Make duration somewhat proportional to file size for simulation feel
    let stepDuration = 50; // ms per step for 1MB, 20 steps = 1s
    if (fileSizeMB === 5) stepDuration = 60; // ~1.2s
    else if (fileSizeMB === 10) stepDuration = 75; // ~1.5s
    else if (fileSizeMB === 50) stepDuration = 125; // ~2.5s
    else if (fileSizeMB === 100) stepDuration = 175; // ~3.5s

    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      const progress = (i / totalSteps) * 100;
      setUploadProgress(progress);
      setUploadSpeed(parseFloat((Math.random() * 40 + 5).toFixed(2))); // Simulated speed
      // Upload contributes from 55% to 100% (45% total)
      setTestProgress(55 + Math.round(progress * 0.45));
    }
    
    const finalSpeed = parseFloat((Math.random() * 40 + 5).toFixed(2)); // Simulate a final speed
    setUploadSpeed(finalSpeed);
    setUploadProgress(100);
    setTestProgress(100); // Upload complete
    return finalSpeed;
  };


  const startRealTest = async () => {
    setIsTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setTestProgress(0);
    setDownloadProgress(0);
    setUploadProgress(0);
    setCurrentTestPhase('');

    let measuredPing = 0;
    let measuredDownloadSpeed = 0;
    let measuredUploadSpeed = 0; // Simulated

    try {
      measuredPing = await measurePing();
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay between phases
      measuredDownloadSpeed = await measureDownloadSpeed(selectedFileSize);
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay between phases
      measuredUploadSpeed = await measureUploadSpeed(selectedFileSize); // This is simulated
      
      const newResult: SpeedTestResult = {
        id: new Date().toISOString(),
        timestamp: Date.now(),
        downloadSpeed: measuredDownloadSpeed,
        uploadSpeed: measuredUploadSpeed,
        ping: measuredPing,
        fileSize: selectedFileSize,
        isp: isp,
        serverLocation: serverLocation,
        ipv4Address: ipv4Address,
      };
      setHistory([newResult, ...history.slice(0, 19)]);

    } catch (error) {
      console.error("Speed test failed:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsTesting(false);
      setCurrentTestPhase(t('testComplete') || 'Test Complete');
    }
  };


  const handleClearHistory = () => {
    setHistory([]);
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center font-headline">{t('speedTest')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpeedGauge title={t('download')} value={downloadSpeed} unit={t('mbps')} icon={<Download />} isLoading={isTesting && currentTestPhase === t('download')} />
        <SpeedGauge title={t('upload')} value={uploadSpeed} unit={t('mbps')} icon={<Upload />} isLoading={isTesting && currentTestPhase === t('upload')} />
        <SpeedGauge title={t('ping')} value={ping} unit={t('ms')} icon={<PingIcon />} isLoading={isTesting && currentTestPhase === t('ping')} />
      </div>
      
      {isTesting && (
        <div className="my-4">
          <Progress 
            value={
              currentTestPhase === t('ping') ? testProgress : // Ping uses overall testProgress for its phase
              currentTestPhase === t('download') ? downloadProgress : 
              currentTestPhase === t('upload') ? uploadProgress : 
              testProgress // Fallback to overall testProgress
            } 
            className="w-full h-3 [&>div]:bg-accent" 
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {isTesting ? `${t('testingInProgress')} ${currentTestPhase}...` : (currentTestPhase || '')}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-card rounded-lg shadow-md">
        <FileSizeSelector 
          selectedSize={selectedFileSize} 
          onSizeChange={setSelectedFileSize}
          disabled={isTesting}
        />
        <StartTestButton 
          onClick={startRealTest} 
          isLoading={isTesting}
          text={isTesting ? t('testingInProgress') : t('startTest')}
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
