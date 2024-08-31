'use client';
import { initUtils } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

const Referral: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);
  const INVITE_URL = "https://t.me/blipp_official_bot/";
  const [loading, setLoading] = useState<boolean>(false);
  const [referralLevel, setReferralLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleReferral = async () => {
    const utils = initUtils();
    const inviteLink = `${INVITE_URL}?start=${userId}`;
    const shareText = `Join Blipp, watch videos and get rewarded!`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
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
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch referrals");
          }
          const data = await response.json();
          setReferrals(data.referrals || []); // Ensure referrals is an array
          setReferrer(data.referrer || null);
        } catch (error) {
          console.error("Error fetching referrals: ", error);
        }
      }
    };
    
    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  useEffect(() => {
    if (referrals) {
      // Update referral level and progress only when referrals is defined
      const newLevel = Math.floor(referrals.length / 5) + 1;
      setReferralLevel(newLevel);
      setProgress((referrals.length % 5) * 20);
    }
  }, [referrals]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4">
          Invite Your Friends, Earn Rewards!
        </h1>
        <p className="text-lg font-medium mb-4 max-w-lg">
          Share your referral code and earn amazing rewards when your friends join! Level up as you refer more friends and unlock exclusive bonuses!
        </p>
      </div>

      <div className="bg-white text-gray-800 rounded-lg shadow-xl p-8 max-w-xl w-full text-center transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-6">Your Referral Code</h2>
        <div className="bg-gray-100 text-indigo-600 rounded-lg p-4 mb-6">
          <p className="text-xl font-semibold">{userId.substring(0, 6)}</p>
        </div>
        <p className="text-lg mb-8">
          Share this link to refer friends:
          <strong className="block mt-2 text-indigo-700 text-xl break-words">
            {`${INVITE_URL}?start=${userId}`}
          </strong>
        </p>
        <button
          onClick={handleReferral}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-2xl animate-pulse"
        >
          Share Referral
        </button>
        <button
          onClick={handleCopyLink}
          className="mt-4 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-lg hover:bg-gray-400"
        >
          Copy Link
        </button>
      </div>

      <div className="w-full max-w-xl mt-12">
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          Your Referrals
        </h2>
        <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-2">Referral Level: {referralLevel}</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-lg mb-4">Refer {5 - (referrals.length % 5)} more friends to level up!</p>
        </div>
        {referrals.length === 0 ? (
          <div className="text-center">
            <Image
              src="/icon.png"
              alt="No friends"
              width={250}
              height={250}
              className="mx-auto"
            />
            <p className="mt-6 text-lg font-medium text-white">
              You haven&apos;t referred anyone yet. Start sharing your code!
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {referrals.map((referral, index) => (
              <li
                key={index}
                className="bg-white text-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <p className="text-lg font-bold">Friend ID: {referral}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Referral;
