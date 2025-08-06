'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { autoDetectLocation } from '@/lib/telegram';

interface LocationDetectorProps {
  onLocationDetected: (location: { country: string; city: string }) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function LocationDetector({ 
  onLocationDetected, 
  onError, 
  disabled = false 
}: LocationDetectorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDetectLocation = async () => {
    setIsLoading(true);
    try {
      const location = await autoDetectLocation();
      if (location) {
        onLocationDetected({
          country: location.country,
          city: location.city
        });
      } else {
        onError('Не удалось определить местоположение');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Ошибка определения местоположения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <button
        onClick={handleDetectLocation}
        disabled={disabled || isLoading}
        className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-colors ${
          disabled || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span>{isLoading ? 'Определяем...' : 'Определить местоположение'}</span>
      </button>
    </div>
  );
} 