'use client'
import { initUtils } from '@telegram-apps/sdk';
import React, { useState, useEffect, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WebApp from "@twa-dev/sdk";



interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    badges: [
        {
            title: string;
            icon: string;
        }
    ];
    avatar: string;
    blippTokens: number;
    achievements: [];
    dailyBonus: {
        streak: number;
        nextReward: string;
        available: boolean;
    };
}

interface ProviderProps {
    initData: string;
    setInitData: React.Dispatch<React.SetStateAction<string>>;
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    startParam: string;
    setStartParam: React.Dispatch<React.SetStateAction<string>>;
    referrals: string[];
    setReferrals: React.Dispatch<React.SetStateAction<string[]>>;
    referrer: string | null;
    setReferrer: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    referralLevel: number;
    setReferralLevel: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    handleReferral: () => void;
    handleCopyLink: () => void;
    referralCode?: string;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const TelegramContext = createContext<ProviderProps>({
    initData: "",
    setInitData: () => {},
    userId: "",
    setUserId: () => {},
    startParam: "",
    setStartParam: () => {},
    referrals: [],
    setReferrals: () => {},
    referrer: null,
    setReferrer: () => {},
    loading: false,
    setLoading: () => {},
    referralLevel: 0,
    setReferralLevel: () => {},
    progress: 0,
    setProgress: () => {},
    handleReferral: () => {},
    handleCopyLink: () => {},
    referralCode: "",
    user: {
        user_id: "",
        first_name: "",
        last_name: "",
        username: "",
        language_code: "",
        name: "",
        level: 1,
        xp: 0,
        xpToNextLevel: 1000,
        badges: [
            {
                title: "",
                icon: ""
            }
        ],
        avatar: "default-avatar-url",
        blippTokens: 0,
        achievements: [],
        dailyBonus: {
            streak: 0,
            nextReward: "Reward",
            available: false
        }
    },
    setUser: () => {}
});

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
    const [isDataSaved, setIsDataSaved] = useState<boolean>(false); 
    const [user, setUser] = useState<any>({});


    const saveUserToDb = async (data: any) => {
        try {
            const checkResponse = await fetch(`/api/users?user_id=${data.user_id}`);
            const existingUser = await checkResponse.json();

            if (existingUser) {
                setUser(existingUser);
                return;
            }

            // If user does not exist, add the user
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('User saved:', await response.json());
        } catch (error) {
            console.error('Failed to save user to DB:', error);
        }
    };


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
              console.log("WebApp: ", WebApp.initDataUnsafe);
              WebApp.ready();
              setInitData(WebApp.initData);
              let userUnsafeData = WebApp.initDataUnsafe.user;
              setUserId(userUnsafeData?.id.toString() || '');
              setStartParam(WebApp.initDataUnsafe.start_param || '');
              console.log(WebApp.initDataUnsafe);

            if (userUnsafeData && !isDataSaved) {
                const userData = {
                    user_id: userUnsafeData.id,
                    first_name: userUnsafeData.first_name,
                    last_name: userUnsafeData.last_name,
                    username: userUnsafeData.username,
                    language_code: userUnsafeData.language_code,
                    name: userUnsafeData.username,
                    level: 1,
                    xp: 0,
                    xpToNextLevel: 1000,
                    badges: [],
                    avatar: userUnsafeData.photo_url || 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Buddy',
                    blippTokens: 0,
                    achievements: [],
                    dailyBonus: { streak: 0, nextReward: '', available: false },
                };
                await saveUserToDb(userData);
                setUser(userData);
                setIsDataSaved(true);
            }
            }
          };
      
          initWebApp();
        }, [userId, startParam, initData, isDataSaved]);


        useEffect(() => {
            getReferralCode();
        }, []);


    return (
        <TelegramContext.Provider value={{ initData, user, setInitData, userId, setUserId, startParam, setStartParam, referrals, setReferrals, referrer, setReferrer, loading, setLoading, referralLevel, setReferralLevel, progress, setProgress, handleReferral, handleCopyLink, referralCode, setUser }}>
            {children}
        </TelegramContext.Provider>
    );
};
