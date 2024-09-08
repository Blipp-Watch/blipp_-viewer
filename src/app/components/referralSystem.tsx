'use client';

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { TelegramContext } from "../context/TelegramProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Award, Users, ChevronUp, ChevronDown, Star, Zap, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

const RewardTier = ({ level, rewards, currentLevel }: { level: number; rewards: string[]; currentLevel: number }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gray-800 rounded-lg p-4 shadow-md ${currentLevel >= level ? 'border-2 border-green-500' : 'opacity-70'}`}
  >
    <h3 className="text-lg font-bold mb-2 text-white flex items-center">
      <Star className={`mr-2 ${currentLevel >= level ? 'text-yellow-400' : 'text-gray-500'}`} />
      Level {level}
    </h3>
    <ul className="list-disc list-inside">
      {rewards.map((reward, index) => (
        <li key={index} className="text-sm text-gray-300 flex items-center">
          <Gift className="mr-2 h-4 w-4 text-purple-400" />
          {reward}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Referral: React.FC<ReferralSystemProps> = ({initData, startParam, userId}) => {
  const INVITE_URL = "https://t.me/blipp_official_bot/";
  const { referrals, setReferrals, setReferrer, loading, referralLevel, setReferralLevel, referralCode, progress, setProgress, handleReferral, handleCopyLink } = useContext(TelegramContext);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ userId: string; referralCount: number }[]>([]);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch(`https://blipp-watch.vercel.app/api/referrals`, {
            method: "POST",
            body: JSON.stringify({ userId, referrerId: startParam }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to refer a friend");
          }
          // Trigger confetti on successful referral
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`https://blipp-watch.vercel.app/api/referrals?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch referrals");
          }
          const data = await response.json();
          setReferrals(data.referrals || []);
          setReferrer(data.referrer || null);
        } catch (error) {
          console.error("Error fetching referrals: ", error);
        }
      }
    };
    
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`https://blipp-watch.vercel.app/api/leaderboard`);
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
      }
    };

    checkReferral();
    fetchReferrals();
    fetchLeaderboard();
  }, [userId, startParam]);

  useEffect(() => {
    if (referrals) {
      const newLevel = Math.floor(referrals.length / 5) + 1;
      if (newLevel > referralLevel) {
        setShowRewardAnimation(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => setShowRewardAnimation(false), 3000);
      }
      setReferralLevel(newLevel);
      setProgress((referrals.length % 5) * 20);
    }
  }, [referrals]);

  const rewardTiers = [
    { level: 1, rewards: ["5 Blipp Coins", "1 Extra Life"] },
    { level: 2, rewards: ["10 Blipp Coins", "2 Extra Lives", "Exclusive Avatar"] },
    { level: 3, rewards: ["20 Blipp Coins", "3 Extra Lives", "Special Effect in Chat"] },
    { level: 4, rewards: ["50 Blipp Coins", "5 Extra Lives", "Custom Blipp Username"] },
    { level: 5, rewards: ["100 Blipp Coins", "10 Extra Lives", "VIP Status"] },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 p-8 text-white pb-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Invite Friends, Unlock Rewards!
        </h1>
        <p className="text-lg font-medium mb-4 max-w-lg">
          Share your referral code and watch your rewards grow! Level up as you refer more friends and unlock exclusive bonuses!
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white rounded-lg shadow-xl p-8 max-w-xl w-full text-center transform hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <Zap className="mr-2 text-yellow-400" />
          Your Power Code
        </h2>
        <div className="bg-gray-700 text-blue-400 rounded-lg p-4 mb-6">
          <p className="text-xl font-semibold">{referralCode}</p>
        </div>
        <p className="text-lg mb-8">
          Share this magical link to summon friends:
          <strong className="block mt-2 text-blue-400 text-xl break-words">
            {`${INVITE_URL}?startapp=${referralCode}`}
          </strong>
        </p>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReferral}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-2xl flex items-center"
          >
            <Share2 className="mr-2" /> Share Power Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg hover:bg-gray-700 flex items-center"
          >
            <Copy className="mr-2" /> Copy Spell
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-xl mt-12"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Your Quest Progress
        </h2>
        <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <Star className="mr-2 text-yellow-400" />
            Referral Level: {referralLevel}
          </h3>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
            />
          </div>
          <p className="text-lg mb-4">Summon {5 - (referrals.length % 5)} more friends to level up!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {rewardTiers.map((tier) => (
            <RewardTier key={tier.level} {...tier} currentLevel={referralLevel} />
          ))}
        </div>
        {referrals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Image
              src="/icon.png"
              alt="No friends"
              width={250}
              height={250}
              className="mx-auto"
            />
            <p className="mt-6 text-lg font-medium text-white">
              Your friend circle awaits! Start sharing your power code to begin your quest!
            </p>
          </motion.div>
        ) : (
          <ul className="space-y-6">
            {referrals.map((referral, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 text-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <p className="text-lg font-bold flex items-center">
                  <Users className="mr-2 text-blue-400" />
                  Friend Summoned: {referral}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-xl mt-12 mb-24"
      >
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center"
        >
          {showLeaderboard ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
          {showLeaderboard ? "Hide Hall of Fame" : "Show Hall of Fame"}
        </button>
        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 text-white rounded-lg shadow-xl p-6 mt-4"
            >
              <h3 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Top Summoners</h3>
              <ul className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Award className={`mr-2 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-yellow-700' : 'text-gray-500'}`} />
                      <span className="font-semibold">{user.userId}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 text-blue-500" />
                      <span>{user.referralCount}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showRewardAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Level Up!</h2>
              <p className="text-xl">Congratulations! You've reached level {referralLevel}!</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="text-yellow-400 w-16 h-16 mx-auto mt-4" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Referral;