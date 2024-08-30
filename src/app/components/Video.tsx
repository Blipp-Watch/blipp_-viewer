"use client";
import React, { useRef, useState, useEffect } from 'react';

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
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      videoRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } else {
      videoRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center relative bg-black w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {isInView && (
          <iframe
            ref={videoRef}
            width="1280"
            height="720"
            src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&autoplay=1`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Video;