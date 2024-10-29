"use client"
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface Quest {
    _id: string;
    title: string;
    description: string;
    icon: string;
    progress: number;
    total: number;
    completed: boolean;
    points: number;
}

export interface QuestStats {
    questId: string;
    totalQuests: number;
    completedQuests: number;
    totalProgress: number;
}

interface QuestsContextType {
    quests: Quest[];
    stats: QuestStats[];
    setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
    updateQuest: (id: string, progress: number, completed: boolean) => Promise<void>;
}

export const QuestsContext = createContext<QuestsContextType>({
    quests: [],
    stats: [],
    setQuests: () => {},
    updateQuest: async () => {},
});

export const QuestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [stats, setStats] = useState<QuestStats[]>([]);

    const fetchQuests = async () => {
        try {
            const response = await fetch(`/api/quests`);
            const data = await response.json();
            console.log('Quests:', data);
            setQuests(data);
            return data;
        } catch (error) {
            console.error('Error fetching quests:', error);
        }
    };

    const fetchStats = async (questId: string) => {
        try {
            const response = await fetch(`/api/quests?stats=${questId}`);
            if (!response.ok) {
                console.error('Error fetching quest stats:', response.statusText);
                return null;
            }
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error('Error fetching quest stats:', error);
            return null;
        }
    };

    const createDefaultStats = async (questId: string, title: string, description: string, icon: string, total: number, points: number) => {
        try {
            const defaultStats = {
                questId,
                totalQuests: 0,
                completedQuests: 0,
                totalProgress: 0,
                title,
                description,
                icon,
                total,
                points,
            };
            await fetch('/api/quests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(defaultStats),
            });
            return defaultStats;
        } catch (error) {
            console.error('Error creating default stats:', error);
        }
    };

    const updateQuest = async (id: string, progress: number, completed: boolean) => {
        try {
            await fetch('/api/quests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, progress, completed }),
            });
        } catch (error) {
            console.error('Error updating quest:', error);
        }
    };

    useEffect(() => {
        const initializeQuests = async () => {
            const questsData = await fetchQuests();
            if (questsData && questsData.length > 0) {
                const allStats = await Promise.all(
                    questsData.map(async (quest: any) => {
                        let statsData = await fetchStats(quest._id);
                        if (!statsData) {
                            statsData = await createDefaultStats(quest._id, quest.title, quest.description, quest.icon, quest.total, quest.points);
                        }
                        return statsData;
                    })
                );
                setStats(allStats);
            }
        };

        initializeQuests();
    }, []);

    return (
        <QuestsContext.Provider value={{ quests, stats, setQuests, updateQuest }}>
            {children}
        </QuestsContext.Provider>
    );
};