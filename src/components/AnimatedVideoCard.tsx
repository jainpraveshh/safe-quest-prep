import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AnimatedVideoCardProps {
  title: string;
  description: string;
  videoSrc: string;
  thumbnail?: string;
  autoPlay?: boolean;
}

export const AnimatedVideoCard = ({ 
  title, 
  description, 
  videoSrc, 
  thumbnail,
  autoPlay = true 
}: AnimatedVideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video && !hasError) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => setHasError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video && !hasError) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  // Animated SVG Placeholder when video fails to load
  const renderAnimatedPlaceholder = () => {
    const getEmoji = () => {
      if (title.includes('Fire')) return '🚒';
      if (title.includes('Flood')) return '🌊';
      if (title.includes('Earthquake')) return '🏠';
      if (title.includes('Cyclone')) return '🌪️';
      return '🦸‍♀️';
    };

    return (
      <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <div className="text-center animate-bounce">
          <div className="text-8xl mb-4 animate-pulse">{getEmoji()}</div>
          <p className="text-xl font-bold text-gray-700">{title}</p>
          <p className="text-sm text-gray-600 mt-2">Animated Video Coming Soon!</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-100 to-pink-100 border-4 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-6">
        <div className="relative bg-white rounded-xl overflow-hidden mb-4 shadow-lg">
          {!hasError ? (
            <video
              ref={videoRef}
              className="w-full h-48 object-cover"
              autoPlay={false}
              muted={isMuted}
              loop
              poster={thumbnail}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handleVideoError}
            >
              <source src={videoSrc} type="video/mp4" />
              {renderAnimatedPlaceholder()}
            </video>
          ) : (
            renderAnimatedPlaceholder()
          )}
          
          {/* Video Controls - Only show if video is available */}
          {!hasError && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button
                onClick={togglePlay}
                size="sm"
                className="bg-white/80 hover:bg-white text-gray-700 rounded-full w-8 h-8 p-0"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                onClick={toggleMute}
                size="sm"
                className="bg-white/80 hover:bg-white text-gray-700 rounded-full w-8 h-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-purple-800 mb-2 text-center">
          {title}
        </h3>
        <p className="text-purple-600 font-medium text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};