import React, { useState, useEffect } from 'react';
import { VideoContext } from './VideoContextz';

const ytBaseURL = process.env.NEXT_PUBLIC_YT_BASE_URL;
const youtubeKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const VideoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [videos, setVideos] = useState<any[]>([]);

    const fetchYouTubeData = async () => {
        if (!ytBaseURL || !youtubeKey) {
            console.error('YouTube base URL or API key is not defined.');
            return;
        }

        try {
            console.log('Fetching YouTube data...');
            const url = new URL(ytBaseURL);
            url.searchParams.append('part', 'snippet,contentDetails,statistics');
            url.searchParams.append('chart', 'mostPopular');
            url.searchParams.append('maxHeight', '1000');
            url.searchParams.append('maxResults', '60');
            url.searchParams.append('regionCode', 'US');
            url.searchParams.append('key', youtubeKey);

            console.log('Fetching YouTube data:', url.toString());

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('YouTube data:', data.items);
            setVideos(prevVideos => [...prevVideos, ...data.items]);
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    };

    useEffect(() => {
        fetchYouTubeData();
    }, []);

    return (
        <VideoContext.Provider value={{ videos, setVideos, fetchYouTubeData }}>
            {children}
        </VideoContext.Provider>
    );
};
