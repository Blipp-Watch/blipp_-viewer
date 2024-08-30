import Image from "next/image";

export default function Profile() {
    const user = {
        name: "BlippMaster99",
        level: 12,
        xp: 3200,
        xpToNextLevel: 4000,
        badges: [
            { title: "First Referral", icon: "🏅" },
            { title: "Quest Streak: 5 Days", icon: "🔥" },
            { title: "Social Media Star", icon: "📣" },
        ],
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Buddy", // Replace with your avatar image path
        blippTokens: 1500,
        achievements: [
            { title: "Watched 50 Videos", icon: "🎥", progress: 50, goal: 50, completed: true },
            { title: "Referred 10 Friends", icon: "👥", progress: 8, goal: 10, completed: false },
            { title: "Social Media Shares", icon: "📣", progress: 15, goal: 20, completed: false },
        ],
        dailyBonus: {
            streak: 3, // Days in a row
            nextReward: "500 Blipp Tokens",
            available: true, // Whether the daily bonus is available to claim
        }
    };

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen p-6 bg-gradient-to-b from-green-500 to-blue-500 text-white space-y-6">
            {/* Profile Header */}
            <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center relative">
                <Image
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-indigo-600 mb-4"
                    width={96}
                    height={96}
                />
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-lg font-medium mb-2">Level {user.level} 🛡️</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2 relative">
                    <div
                        className="bg-purple-600 h-4 rounded-full"
                        style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
                    ></div>
                    <span className="text-xs ml-2 mt-1">{user.xp}/{user.xpToNextLevel} XP</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4 animate-bounce">
                    🎉 Claim Rewards
                </button>
                <div className="text-lg font-bold mt-4">
                    Blipp Tokens: <span className="text-yellow-400">{user.blippTokens}</span> 🪙
                </div>
            </div>

            {/* Daily Bonus Section */}
            <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">🌟 Daily Bonus</h2>
                <p className="text-lg mb-2">Streak: {user.dailyBonus.streak} Days 🔥</p>
                <p className="text-lg mb-4">Next Reward: {user.dailyBonus.nextReward}</p>
                <button
                    className={`py-2 px-4 rounded-full font-bold ${user.dailyBonus.available ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white transition-colors duration-300`}
                    disabled={!user.dailyBonus.available}
                >
                    {user.dailyBonus.available ? '🎁 Claim Daily Bonus' : '⏳ Come Back Tomorrow'}
                </button>
            </div>

            {/* Achievements Section */}
            <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
                <div className="flex flex-col space-y-4">
                    {user.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-3xl mr-4">{achievement.icon}</span>
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{achievement.title}</p>
                                <div className="w-full bg-gray-200 rounded-full h-3 relative mt-1">
                                    <div
                                        className="bg-green-500 h-3 rounded-full py-2"
                                        style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                                    ></div>
                                    <span className="absolute top-0 right-0 text-xs text-gray-600 mr-2">{achievement.progress}/{achievement.goal}</span>
                                </div>
                                {achievement.completed && <span className="text-green-500 text-sm mt-1">✅ Completed</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges Section */}
            <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">🎖️ Badges</h2>
                <div className="flex flex-wrap justify-start space-y-4">
                    {user.badges.map((badge, index) => (
                        <div key={index} className="flex items-center mb-4 mr-4">
                            <span className="text-3xl">{badge.icon}</span>
                            <span className="ml-2 text-lg font-semibold">{badge.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
