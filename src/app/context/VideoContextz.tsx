import { createContext } from 'react';

interface ProviderProps {
    videos: any[];
    setVideos: React.Dispatch<React.SetStateAction<any[]>>;
    fetchYouTubeData: () => Promise<void>;
}

// Create a new context
export const VideoContext = createContext<ProviderProps>({
  videos: [],
  setVideos: () => {},
  fetchYouTubeData: async () => {},
});