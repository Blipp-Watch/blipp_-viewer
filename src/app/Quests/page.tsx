'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Share2, Video, UserPlus, Zap, ChevronUp, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Quests() {
    const [quests, setQuests] = useState([
        {
            id: 1,
            title: "Watch 3 Videos",
            description: "Earn 50 points by enjoying 3 awesome videos today!",
            points: 50,
            completed: false,
            progress: 2,
            total: 3,
            icon: <Video className="w-6 h-6 text-purple-400" />,
        },
        {
            id: 2,
            title: "Refer a Friend",
            description: "Earn 100 points by inviting a friend to join Blipp.",
            points: 100,
            completed: false,
            progress: 0,
            total: 1,
            icon: <UserPlus className="w-6 h-6 text-green-400" />,
        },
        {
            id: 3,
            title: "Share on Social Media",
            description: "Earn 30 points by sharing Blipp with your followers.",
            points: 30,
            completed: false,
            progress: 0,
            total: 1,
            icon: <Share2 className="w-6 h-6 text-blue-400" />,
        },
    ])

    const [streak, setStreak] = useState(3)
    const [showReward, setShowReward] = useState(false)
    const [showStreak, setShowStreak] = useState(true)

    useEffect(() => {
        const completedQuests = quests.filter(quest => quest.completed)
        if (completedQuests.length === quests.length) {
            setShowReward(true)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
        }
    }, [quests])

    const handleQuestProgress = (id: number) => {
        setQuests(prevQuests => prevQuests.map(quest => {
            if (quest.id === id) {
                const newProgress = quest.progress + 1
                const completed = newProgress >= quest.total
                if (completed) {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.8 }
                    })
                }
                return {
                    ...quest,
                    progress: newProgress,
                    completed: completed
                }
            }
            return quest
        }))
    }

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen pb-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold mb-8 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
                🎯 Epic Quests
            </motion.h1>
            <div className="w-full max-w-lg space-y-6 px-4">
                <AnimatePresence>
                    {quests.map((quest, index) => (
                        <motion.div
                            key={quest.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-800 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold flex items-center">
                                    {quest.icon}
                                    <span className="ml-2">{quest.title}</span>
                                </h2>
                                {quest.completed && (
                                    <Trophy className="w-6 h-6 text-yellow-400" />
                                )}
                            </div>
                            <p className="text-gray-300 mb-4">{quest.description}</p>
                            
                            <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                                <motion.div 
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold flex items-center">
                                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                    {quest.points} Points
                                </span>
                                <button
                                    onClick={() => handleQuestProgress(quest.id)}
                                    className={`py-2 px-4 rounded-full font-bold ${
                                        quest.completed 
                                            ? 'bg-green-600 hover:bg-green-700' 
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                    } text-white transition-all duration-300 transform hover:scale-105 flex items-center`}
                                >
                                    {quest.completed ? (
                                        <>
                                            <Trophy className="w-5 h-5 mr-2" />
                                            Completed
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 mr-2" />
                                            {quest.progress < quest.total ? 'Continue' : 'Start'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="fixed bottom-16 left-0 right-0 bg-gray-800 border-t border-gray-700"
            >
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={() => setShowStreak(!showStreak)}
                        className="w-full p-2 flex items-center justify-center text-yellow-400"
                    >
                        {showStreak ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
                    </button>
                    <AnimatePresence>
                        {showStreak && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 text-center">
                                    <p className="text-lg flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                                        Quest Streak: {streak} Days
                                    </p>
                                    <p className="text-sm text-gray-400">Complete quests daily to keep your streak alive!</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    >
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-lg text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Quest Master!</h2>
                            <p className="text-xl mb-4">You&apos;ve completed all quests! Here&apos;s a special reward:</p>
                            <div className="text-4xl mb-4">🏆</div>
                            <p className="text-2xl font-bold">500 Bonus Points!</p>
                            <button
                                onClick={() => setShowReward(false)}
                                className="mt-6 py-2 px-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-200 transition-colors duration-300"
                            >
                                Awesome!
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}