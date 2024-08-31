import React, { useState, useEffect, createContext } from 'react';

const ytBaseURL = process.env.NEXT_PUBLIC_YT_BASE_URL;
const youtubeKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
interface ProviderProps{
    initData:string;
    setInitData:React.Dispatch<React.SetStateAction<string>>;
    userId:string;
    setUserId:React.Dispatch<React.SetStateAction<string>>;
    startParam:string;
    setStartParam:React.Dispatch<React.SetStateAction<string>>;
}

export const TelegramContext = createContext<ProviderProps>({
    initData:"",
    setInitData:()=>{},
    userId:"",
    setUserId:()=>{},
    startParam:"",
    setStartParam:()=>{}
})

export const TelegramContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [initData, setInitData] = useState("");
    const [userId, setUserId] = useState("");
    const [startParam, setStartParam] = useState("");

    useEffect(() => {
        const initWebApp = async () => {
            if (typeof window !== 'undefined') {
              const WebApp = (await import('@twa-dev/sdk')).default;
              WebApp.ready();
              setInitData(WebApp.initData);
              setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
              setStartParam(WebApp.initDataUnsafe.start_param || '');
              console.log(WebApp.initDataUnsafe);
            }
          };
      
          initWebApp();
        }, [userId, startParam, initData]);

    return (
        <TelegramContext.Provider value={{ initData, setInitData, userId, setUserId, startParam, setStartParam }}>
            {children}
        </TelegramContext.Provider>
    );
};
