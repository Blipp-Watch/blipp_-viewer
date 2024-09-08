"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';
import VideoInteractionButtons from './VideoInteractionButtons';


interface VideoProps {
  video: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
        standard: {
          url: string;
          width: number;
          height: number;
        };
        maxres: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      tags: string[];
      categoryId: string;
      liveBroadcastContent: string;
      defaultLanguage: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      contentRating: Record<string, unknown>;
      projection: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  };
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const [isInView, setIsInView] = useState(false);
  const [likes, setLikes] = useState(parseInt(video.statistics.likeCount));
  const [comments, setComments] = useState(parseInt(video.statistics.commentCount));
  const [shares, setShares] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
  
    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }
  
    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      videoRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      const progressInterval = setInterval(() => {
        if (videoRef.current && videoRef.current.contentWindow) {
          videoRef.current.contentWindow.postMessage('{"event":"listening"}', '*');
          videoRef.current.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
          videoRef.current.contentWindow.postMessage('{"event":"command","func":"getDuration","args":""}', '*');
        }
      }, 1000);
      const coinInterval = setInterval(() => {
        setEarnedCoins(prev => prev + 0.1);
      }, 1000);
      return () => {
        clearInterval(progressInterval);
        clearInterval(coinInterval);
      };
    } else {
      videoRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }, [isInView]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange" && data.info === 1) {
          // Video is playing
        } else if (data.event === "infoDelivery") {
          if (data.info && data.info.duration) {
            setVideoDuration(data.info.duration);
          }
          if (data.info && data.info.currentTime) {
            setVideoProgress((data.info.currentTime / videoDuration) * 100);
          }
        }
      } catch (error) {
        console.error("Error parsing message from YouTube iframe:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videoDuration]);

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleComment = () => {
    alert('Comment feature coming soon!');
  };

  const handleShare = () => {
    setShares(prev => prev + 1);
    alert('Video shared successfully!');
  };

  const handleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
      {isInView && (
        <iframe
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          title={video.snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 z-10">
        <div className="h-1 w-full bg-gray-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${videoProgress}%` }}
          />
        </div>
      </div>

      <VideoInteractionButtons
        likes={likes}
        comments={comments}
        shares={shares}
        earnedCoins={earnedCoins}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
      />

      {/* Bottom Info */}
      <div className="absolute bottom-16 w-full p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <User className="w-8 h-8 mr-2 text-white" />
            <h2 className="text-lg font-semibold text-white">{video.snippet.channelTitle}</h2>
          </div>
          <button 
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
              isFollowing ? 'bg-white text-black' : 'bg-primary text-white'
            }`}
            onClick={handleFollow}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <p className="text-sm mt-1 text-white">{video.snippet.title}</p>
      </div>
    </div>
  );
};

export default Video;