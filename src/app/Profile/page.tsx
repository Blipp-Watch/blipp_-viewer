'use client'

import { useState, useEffect, useContext } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Gift, Trophy, Award, Star, ChevronRight, ChevronLeft } from 'lucide-react'
import confetti from 'canvas-confetti'
import { TelegramContext } from '../context/TelegramProvider'

export default function Profile() {
    const [showReward, setShowReward] = useState(false)
    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)
    const {user} = useContext(TelegramContext)

    const xp = user?.xp || 0;
    const xpToNextLevel = user?.xpToNextLevel || 1000;
    const progress = (xp / xpToNextLevel) * 100;

    useEffect(() => {
        const interval = setInterval(() => {
            if (user?.badges && user.badges.length > 0) {
                setCurrentBadgeIndex((prevIndex) => (prevIndex + 1) % user.badges.length);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [user]);


    const handleClaimRewards = () => {
        setShowReward(true)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen pb-24 bg-gradient-to-b from-gray-900 to-indigo-900 text-white space-y-6">
            {/* Profile Header */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center relative mt-6"
            >
                <div className="relative">
                    <Image
                        src={user?.avatar}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-4 border-indigo-600 mb-4"
                        width={96}
                        height={96}
                    />
                    <motion.div 
                        className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Shield className="w-4 h-4 text-gray-900" />
                    </motion.div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <p className="text-lg font-medium mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-1 text-yellow-400" />
                    Level {user?.level || 1}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2 relative">
                    <motion.div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {xp}/{xpToNextLevel} XP
                    </span>
                </div>
                <motion.button 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 px-6 rounded-full mt-4 font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClaimRewards}
                >
                    <Zap className="w-5 h-5 inline mr-2" />
                    Claim Rewards
                </motion.button>
                <div className="text-lg font-bold mt-4 flex items-center">
                    <motion.span 
                        className="text-yellow-400 mr-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        {user?.blippTokens || 0}
                    </motion.span>
                    <span>Blipp Tokens</span>
                </div>
            </motion.div>

            {/* Daily Bonus Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6 text-center"
            >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Gift className="w-6 h-6 mr-2 text-yellow-400" />
                    Daily Bonus
                </h2>
                <p className="text-lg mb-2">Streak: {user?.dailyBonus?.streak || 0} Days 🔥</p>
                <p className="text-lg mb-4">Next Reward: {user?.dailyBonus?.nextReward || 'N/A'}</p>
                <motion.button
                    className={`py-2 px-6 rounded-full font-bold ${user?.dailyBonus?.available ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' : 'bg-gray-600 cursor-not-allowed'} text-white transition-all duration-300 transform hover:scale-105`}
                    disabled={!user?.dailyBonus?.available}
                    whileHover={user?.dailyBonus?.available ? { scale: 1.05 } : {}}
                    whileTap={user?.dailyBonus?.available ? { scale: 0.95 } : {}}
                >
                    {user?.dailyBonus?.available ? '🎁 Claim Daily Bonus' : '⏳ Come Back Tomorrow'}
                </motion.button>
            </motion.div>

            {/* Achievements Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6"
            >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                    Achievements
                </h2>
                <div className="flex flex-col space-y-4">
                    {user?.achievements?.length > 0 ? ( user?.achievements?.map((achievement:any, index:number) => (
                        <motion.div 
                            key={index} 
                            className="flex items-center bg-gray-700 p-4 rounded-lg"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <span className="text-3xl mr-4">{achievement.icon}</span>
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{achievement.title}</p>
                                <div className="w-full bg-gray-600 rounded-full h-3 relative mt-1">
                                    <motion.div
                                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    />
                                    <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-bold">
                                        {achievement.progress}/{achievement.goal}
                                    </span>
                                </div>
                                {achievement.completed && (
                                    <motion.span 
                                        className="text-green-400 text-sm mt-1 flex items-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                    >
                                        <Award className="w-4 h-4 mr-1" />
                                        Completed
                                    </motion.span>
                                )}
                            </div>
                        </motion.div>
                    ))): (
                        <li>No achievements yet.</li>
                    )
                }
                </div>
            </motion.div>

            {/* Badges Section */}
            <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-24"
>
    <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Star className="w-6 h-6 mr-2 text-yellow-400" />
        Badges
    </h2>
    <div className="relative h-24 overflow-hidden">
        <AnimatePresence mode="wait">
            {user?.badges && user.badges.length > 0 && currentBadgeIndex < user.badges.length ? (
                <motion.div
                    key={currentBadgeIndex}
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-5xl mr-4">{user.badges[currentBadgeIndex].icon}</span>
                    <span className="text-xl font-semibold">{user.badges[currentBadgeIndex].title}</span>
                </motion.div>
            ) : (
                <motion.div
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xl font-semibold">No badges available</span>
                </motion.div>
            )}
        </AnimatePresence>
                    <button 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2"
                        onClick={() => setCurrentBadgeIndex((prevIndex) => (prevIndex - 1 + user?.badges.length) % user?.badges.length)}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2"
                        onClick={() => setCurrentBadgeIndex((prevIndex) => (prevIndex + 1) % user?.badges.length)}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>

            {/* Reward Popup */}
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                        onClick={() => setShowReward(false)}
                    >
                        <motion.div 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg text-white text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-3xl font-bold mb-4">Rewards Claimed!</h2>
                            <p className="text-xl mb-4">You&apos;ve earned:</p>
                            <ul className="text-2xl font-bold space-y-2 mb-6">
                                <li>🪙 100 Blipp Tokens</li>
                                <li>⭐ 500 XP</li>
                                <li>🎁 Mystery Gift</li>
                            </ul>
                            <motion.button
                                className="bg-white text-purple-600 py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition-colors duration-300"
                                onClick={() => setShowReward(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Awesome!
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}