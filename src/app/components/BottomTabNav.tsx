"use client"
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Users, Target, User } from 'lucide-react';

export default function BottomTabNavigator() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('Home');

    useEffect(() => {
        // Set the active tab based on the current pathname
        if (pathname === '/') setActiveTab('Home');
        else if (pathname === '/frens') setActiveTab('Frens');
        else if (pathname === '/quests') setActiveTab('Quests');
        else if (pathname === '/profile') setActiveTab('Profile');
    }, [pathname]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        switch (tab) {
            case 'Home':
                router.push('/');
                break;
            case 'Frens':
                router.push('/Frens');
                break;
            case 'Quests':
                router.push('/Quests');
                break;
            case 'Profile':
                router.push('/Profile');
                break;
        }
    };

    return (
        <nav className="fixed bottom-0 w-full z-10 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
            <ul className="flex justify-around items-center">
                <li>
                    <button
                        onClick={() => handleTabClick('Home')}
                        className={`flex flex-col items-center ${activeTab === 'Home' ? 'text-primary' : ''}`}
                        aria-label="Home"
                        aria-current={activeTab === 'Home' ? 'page' : undefined}
                    >
                        <Home className="w-6 h-6" />
                        <span className="text-xs">Home</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleTabClick('Frens')}
                        className={`flex flex-col items-center ${activeTab === 'Frens' ? 'text-primary' : ''}`}
                        aria-label="Friends"
                        aria-current={activeTab === 'Frens' ? 'page' : undefined}
                    >
                        <Users className="w-6 h-6" />
                        <span className="text-xs">Frens</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleTabClick('Quests')}
                        className={`flex flex-col items-center ${activeTab === 'Quests' ? 'text-primary' : ''}`}
                        aria-label="Quests"
                        aria-current={activeTab === 'Quests' ? 'page' : undefined}
                    >
                        <Target className="w-6 h-6" />
                        <span className="text-xs">Quests</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleTabClick('Profile')}
                        className={`flex flex-col items-center ${activeTab === 'Profile' ? 'text-primary' : ''}`}
                        aria-label="Profile"
                        aria-current={activeTab === 'Profile' ? 'page' : undefined}
                    >
                        <User className="w-6 h-6" />
                        <span className="text-xs">Profile</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}