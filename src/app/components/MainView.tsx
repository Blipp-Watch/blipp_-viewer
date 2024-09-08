"use client";
import { useState, useContext, useEffect } from "react";
import Video from "./Video";
import { VideoContext } from "../context/VideoContextz";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronUp, ChevronDown, ArrowDown, ArrowUp, Home, Users, Target, User } from 'lucide-react';

export default function MainView() {
    const { videos, fetchYouTubeData } = useContext(VideoContext);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const navigateVideo = (direction: 'up' | 'down') => {
        if (direction === 'down' && currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
        } else if (direction === 'up' && currentVideoIndex > 0) {
            setCurrentVideoIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                navigateVideo('down');
            } else if (e.deltaY < 0) {
                navigateVideo('up');
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                navigateVideo('down');
            } else if (e.key === 'ArrowUp') {
                navigateVideo('up');
            }
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentVideoIndex, videos.length]);

    return (
        <div className="relative h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="snap-y snap-mandatory h-full overflow-hidden">
                    {videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <p className="text-lg mt-4 text-white">No videos found</p>
                        </div>
                    ) : (
                        <div className="relative h-full w-full">
                            <Video video={videos[currentVideoIndex]} />
                            
                            {/* Blipp Logo */}
                            <div className="absolute top-6 left-4 z-10">
                                <span className="text-2xl font-bold text-white">Blipp</span>
                            </div>

                            {/* Navigation Indicators */}
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                                <button 
                                    onClick={() => navigateVideo('up')} 
                                    className="p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
                                    aria-label="Previous video"
                                >
                                    <ArrowUp className="w-6 h-6" />
                                </button>
                                <button 
                                    onClick={() => navigateVideo('down')} 
                                    className="p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
                                    aria-label="Next video"
                                >
                                    <ArrowDown className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
}