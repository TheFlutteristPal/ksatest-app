
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FILE_SIZES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageProvider";

interface FileSizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
  disabled?: boolean;
}

export function FileSizeSelector({ selectedSize, onSizeChange, disabled }: FileSizeSelectorProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <Label htmlFor="file-size-select">{t('selectFileSize')}</Label>
      <Select
        value={selectedSize.toString()}
        onValueChange={(value) => onSizeChange(parseInt(value))}
        disabled={disabled}
        
      >
        <SelectTrigger id="file-size-select" className="w-full sm:w-[200px]">
          <SelectValue placeholder={t('selectFileSize')} />
        </SelectTrigger>
        <SelectContent>
          {FILE_SIZES.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size} MB
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
