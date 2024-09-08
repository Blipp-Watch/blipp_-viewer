import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface VideoInteractionButtonsProps {
  likes: number;
  comments: number;
  shares: number;
  earnedCoins: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const VideoInteractionButtons: React.FC<VideoInteractionButtonsProps> = ({
  likes,
  comments,
  shares,
  earnedCoins,
  onLike,
  onComment,
  onShare
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-end space-y-4">
      <button 
        className="group flex flex-col justify-center items-center space-x-2 p-2 rounded-full bg-gray-800 bg-opacity-50 transition-transform active:scale-90"
        onClick={onLike}
        aria-label={`Like video, ${likes} likes`}
      >
        <Heart className="w-8 h-8 text-white" />
        <span className="text-xs text-white min-w-[3rem] group-hover:min-w-fit group-hover:bg-gray-700 group-hover:px-2 group-hover:py-1 group-hover:rounded transition-all duration-200 ease-in-out">
          {formatNumber(likes)}
        </span>
      </button>
      <button 
        className="group flex flex-col items-center space-x-2 p-2 rounded-full bg-gray-800 bg-opacity-50 transition-transform active:scale-90"
        onClick={onComment}
        aria-label={`Comment on video, ${comments} comments`}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="text-xs text-white min-w-[3rem] group-hover:min-w-fit group-hover:bg-gray-700 group-hover:px-2 group-hover:py-1 group-hover:rounded transition-all duration-200 ease-in-out">
          {formatNumber(comments)}
        </span>
      </button>
      <div className="group flex flex-col items-center space-x-2 p-2 rounded-full transition-transform active:scale-90">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>
        <span className="text-sm font-bold text-white">+{earnedCoins.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default VideoInteractionButtons;