import { initUtils } from '@telegram-apps/sdk';
import React, { useState, useEffect, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ProviderProps{
    initData:string;
    setInitData:React.Dispatch<React.SetStateAction<string>>;
    userId:string;
    setUserId:React.Dispatch<React.SetStateAction<string>>;
    startParam:string;
    setStartParam:React.Dispatch<React.SetStateAction<string>>;
    referrals:string[];
    setReferrals:React.Dispatch<React.SetStateAction<string[]>>;
    referrer:string | null;
    setReferrer:React.Dispatch<React.SetStateAction<string | null>>;
    loading:boolean;
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
    referralLevel:number;
    setReferralLevel:React.Dispatch<React.SetStateAction<number>>;
    progress:number;
    setProgress:React.Dispatch<React.SetStateAction<number>>;
    handleReferral:()=>void;
    handleCopyLink:()=>void;
    referralCode?:string;
}

export const TelegramContext = createContext<ProviderProps>({
    initData:"",
    setInitData:()=>{},
    userId:"",
    setUserId:()=>{},
    startParam:"",
    setStartParam:()=>{},
    referrals:[],
    setReferrals:()=>{},
    referrer:null,
    setReferrer:()=>{},
    loading:false,
    setLoading:()=>{},
    referralLevel:1,
    setReferralLevel:()=>{},
    progress:0,
    setProgress:()=>{},
    handleReferral:()=>{},
    handleCopyLink:()=>{},
    referralCode:"" 
})

export const TelegramContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [initData, setInitData] = useState("");
    const [userId, setUserId] = useState("");
    const [startParam, setStartParam] = useState("");
    const [referrals, setReferrals] = useState<string[]>([]);
    const [referrer, setReferrer] = useState<string | null>(null);
    const INVITE_URL = "https://t.me/blipp_official_bot";
    const [loading, setLoading] = useState<boolean>(false);
    const [referralLevel, setReferralLevel] = useState(1);
    const [progress, setProgress] = useState(0);
    const [referralCode, setReferralCode] = useState<string>();


    const getReferralCode = () => {
        const referralCode = localStorage.getItem("referralCode");
        if (referralCode) {
            setReferralCode(referralCode);
        } else {
            const newReferralCode = uuidv4().toString().substring(0, 8);
            localStorage.setItem("referralCode", newReferralCode);
            setReferralCode(newReferralCode);
        }
    }
  
    const handleReferral = async () => {
      const utils = initUtils();
      const inviteLink = `${INVITE_URL}?startapp=${referralCode}`;
      const shareText = `Join Blipp, watch videos and get rewarded!`;
      const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
      utils.openTelegramLink(fullUrl);
    };
  
    const handleCopyLink = () => {
      const inviteLink = `${INVITE_URL}?startapp=${referralCode}`;
      navigator.clipboard.writeText(inviteLink);
      alert("Link copied to clipboard!");
    };

    useEffect(() => {
        const initWebApp = async () => {
            if (typeof window !== 'undefined') {
              const WebApp = (await import('@twa-dev/sdk')).default;
              console.log("WebApp: ", WebApp.initDataUnsafe);
              WebApp.ready();
              setInitData(WebApp.initData);
              setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
              setStartParam(WebApp.initDataUnsafe.start_param || '');
              console.log(WebApp.initDataUnsafe);
            }
          };
      
          initWebApp();
        }, [userId, startParam, initData]);


        useEffect(() => {
            getReferralCode();
        }, []);


    return (
        <TelegramContext.Provider value={{ initData, setInitData, userId, setUserId, startParam, setStartParam, referrals, setReferrals, referrer, setReferrer, loading, setLoading, referralLevel, setReferralLevel, progress, setProgress, handleReferral, handleCopyLink, referralCode }}>
            {children}
        </TelegramContext.Provider>
    );
};
