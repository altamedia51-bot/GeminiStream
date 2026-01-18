
export enum StreamStatus {
  IDLE = 'IDLE',
  STARTING = 'STARTING',
  STREAMING = 'STREAMING',
  ERROR = 'ERROR',
  STOPPING = 'STOPPING'
}

export interface VideoFile {
  id: string;
  name: string;
  size: string;
  duration: string;
  thumbnail: string;
  uploadDate: string;
}

export interface RTMPDestination {
  id: string;
  name: string;
  url: string;
  streamKey: string;
  enabled: boolean;
}

export interface ScheduledStream {
  id: string;
  videoId: string;
  destinationIds: string[];
  startTime: string;
  loop: boolean;
  active: boolean;
}

export interface StreamLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'ffmpeg';
  message: string;
}

export interface StreamConfig {
  resolution: '720p' | '1080p' | '4k';
  bitrate: string;
  fps: number;
}
