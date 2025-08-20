'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export default function ProductVideo({ src, poster, className = '', autoPlay = false, onPlay }: ProductVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to handle autoPlay
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(error => console.error("Error attempting to auto-play video:", error));
      if (onPlay) {
        onPlay();
      }
    }
  }, [autoPlay, onPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => console.error("Error playing video:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // Optionally reset video to start
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover rounded-lg"
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={isMuted}
        playsInline
        preload="metadata"
      />
      
      {/* Hover Overlay with Play/Pause */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.25)'
        }}
      >
        {isPlaying ? (
          <Pause className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <Play className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Volume Control */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 p-2 text-white rounded-full transition-all duration-300 cursor-pointer transform hover:scale-110"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
} 