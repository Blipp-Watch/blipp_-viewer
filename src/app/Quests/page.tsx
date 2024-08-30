export default function Quests() {
    const quests = [
        {
            title: "🎥 Watch 3 Videos",
            description: "Earn 50 points by enjoying 3 awesome videos today!",
            points: 50,
            completed: false,
            progress: 2, // Simulating progress (e.g., 2 out of 3 videos watched)
            total: 3,
        },
        {
            title: "👥 Refer a Friend",
            description: "Earn 100 points by inviting a friend to join Blipp.",
            points: 100,
            completed: false,
            progress: 0, // No progress yet
            total: 1,
        },
        {
            title: "📣 Share on Social Media",
            description: "Earn 30 points by sharing Blipp with your followers.",
            points: 30,
            completed: false,
            progress: 0,
            total: 1,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-start w-full h-full p-6 bg-gradient-to-b from-purple-600 to-indigo-600 text-white">
            <h1 className="text-5xl font-extrabold mb-8 mt-4">🎯 Daily Quests</h1>
            <div className="w-full max-w-lg">
                {quests.map((quest, index) => (
                    <div key={index} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">{quest.title}</h2>
                            {quest.completed && (
                                <span className="text-2xl text-green-500">🏆</span>
                            )}
                        </div>
                        <p className="text-lg mb-4">{quest.description}</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(quest.progress / quest.total) * 100}%` }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">🏅 Points: {quest.points}</span>
                            <button
                                className={`py-2 px-4 rounded-full font-bold ${quest.completed ? 'bg-green-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
                            >
                                {quest.completed ? '✅ Completed' : `🚀 ${quest.progress < quest.total ? 'Continue' : 'Start'}`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-indigo-800 text-center">
                <p className="text-lg">🔥 Quest Streak: 3 Days</p>
                <p className="text-sm text-gray-300">Complete quests daily to keep your streak alive!</p>
            </div>
        </div>
    );
}
