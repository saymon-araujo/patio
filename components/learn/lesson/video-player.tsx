/**
 * Video Player Component
 * Custom video player with controls using expo-video
 */

import React, { useState, useEffect } from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@/components/ui/slider';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Pressable, StyleSheet } from 'react-native';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react-native';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoPlayer = ({ videoUrl, thumbnail }: VideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.muted = isMuted;
    player.playbackRate = playbackSpeed;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        setCurrentTime(player.currentTime);
        setDuration(player.duration);
        setIsPlaying(player.playing);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player]);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const toggleMute = () => {
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (value: number) => {
    player.currentTime = value;
    setCurrentTime(value);
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    player.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const speedOptions = [0.5, 1.0, 1.5, 2.0];

  return (
    <VStack className="gap-2 bg-black rounded-lg overflow-hidden">
      <Box style={{ position: 'relative' }}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
        />

        {/* Speed Menu Overlay */}
        {showSpeedMenu && (
          <Box
            className="absolute top-4 right-4 bg-black/80 rounded-lg p-2"
            style={{ zIndex: 10 }}
          >
            <VStack className="gap-1">
              {speedOptions.map((speed) => (
                <Pressable key={speed} onPress={() => changeSpeed(speed)}>
                  <Box
                    className={`px-3 py-2 rounded ${
                      playbackSpeed === speed ? 'bg-primary-500' : 'bg-transparent'
                    }`}
                  >
                    <Text size="sm" className="text-white">
                      {speed}x
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </Box>
        )}
      </Box>

      {/* Custom Controls */}
      <VStack className="bg-black/50 p-3 gap-2">
        {/* Seek Bar */}
        <HStack className="gap-2 items-center">
          <Text size="xs" className="text-white">
            {formatTime(currentTime)}
          </Text>
          <Box className="flex-1">
            <Slider
              value={currentTime}
              onChange={handleSeek}
              minValue={0}
              maxValue={duration || 100}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack className="bg-primary-500" />
              </SliderTrack>
              <SliderThumb className="bg-white" />
            </Slider>
          </Box>
          <Text size="xs" className="text-white">
            {formatTime(duration)}
          </Text>
        </HStack>

        {/* Controls */}
        <HStack className="items-center gap-3">
          <Pressable onPress={togglePlayPause}>
            {isPlaying ? (
              <Pause size={24} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </Pressable>

          <Pressable onPress={toggleMute}>
            {isMuted ? <VolumeX size={20} color="#FFFFFF" /> : <Volume2 size={20} color="#FFFFFF" />}
          </Pressable>

          <Box className="flex-1" />

          {/* Speed Control */}
          <Pressable onPress={() => setShowSpeedMenu(!showSpeedMenu)}>
            <Box className="px-2 py-1 bg-white/20 rounded">
              <Text size="xs" className="text-white font-semibold">
                {playbackSpeed}x
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 220,
  },
});
