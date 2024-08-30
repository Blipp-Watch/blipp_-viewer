"use client";
import { useState, useContext } from "react";
import Video from "./Video";
import BottomTabNavigator from "./BottomTabNav";
import { VideoContext } from "../context/VideoContextz";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MainView() {
    const { videos, fetchYouTubeData } = useContext(VideoContext);

    return (
        <InfiniteScroll dataLength={videos.length} 
            next={async()=> await fetchYouTubeData()} 
            hasMore={true} 
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            {
                videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <p className="text-lg mt-4">No videos found</p>
                    </div>
                ) : 
                videos.map((video, index) => {
                    return (
                        <div key={index} className="snap-start w-screen h-screen">
                            <Video video={video} />
                            <BottomTabNavigator />
                        </div>
                    );
                })
            }
        </div>
        </InfiniteScroll>
    );
}