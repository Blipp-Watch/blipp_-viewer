'use client'
import { initUtils } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";

interface ReferralSystemProps {
    initData: string
    userId: string
    startParam: string
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
    const [referrals, setReferrals] = useState<string[]>([]);
    const [referrer, setReferrer] = useState<string | null>(null);
    const INVITE_URL = "https://t.me/blipp_official_bot/start";
    const [loading, setLoading] = useState<boolean>(true);

    const handleReferral = async () => {
        const utils = initUtils();
        const inviteLink = await `${INVITE_URL}?start=${userId}`;
        const shareText = `Join Blipp, watch videos and get rewarded!`;
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
    }

    const handleCopyLink = () => {
        const inviteLink = `${INVITE_URL}?start=${userId}`;
        navigator.clipboard.writeText(inviteLink);
        alert("Link copied to clipboard!");
    }

    useEffect(() => {
        const checkReferral = async () => {
            if(startParam && userId){
                try {
                    const response = await fetch(`/api/referrals`, {
                        method: "POST",
                        body: JSON.stringify({ userId, referrerId: startParam }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Failed to refer a friend");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            const response = await fetch(`/api/referrals?userId=${userId}`);
            const data = await response.json();
            setReferrals(data.referrals);
            setReferrer(data.referrer);
            setLoading(false);
        };

        const fetchReferrals = async () => {
            if(userId){
                try {
                    const response = await fetch(`/api/referrals?userId=${userId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch referrals");
                    }
                    const data = await response.json();
                    setReferrals(data.referrals);
                    setReferrer(data.referrer);
                } catch (error) {
                    console.error("Error fetching referrals: ",error);
                }
            }
        }
        checkReferral();
        fetchReferrals();
    }, [userId, startParam]);



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Referral System</h1>
      {referrer && (
        <p className="mb-2">
            <span className="font-semibold">Referrer:</span> {referrer || "None"}
        </p>)}
        <div className="flex flex-col space-y-4">
            <button 
                onClick={handleReferral} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Refer a friend
            </button>
            <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Copy Referral Link
                </button>
        </div>
        {referrals.length > 0 && (
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Referrals</h2>
                <ul>
                    {referrals.map((referral, index) => (
                        <li key={index} className="bg-gray-100 mb-2 p-2 rounded">
                            <p>User: {referral}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
    );
}

export default ReferralSystem;