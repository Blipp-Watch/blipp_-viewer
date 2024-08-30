import { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

interface Friend {
    id: string;
    referredBy: string;
}

export default function Friens() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        // Generate a unique referral code for the user
        const code = uuid();
        setReferralCode(code);
    }, []);

    // Simulate adding a referred friend (this would normally be done via a backend service)
    const handleAddFriend = () => {
        const newFriend: Friend = {
            id: uuid(),
            referredBy: referralCode,
        };
        setFriends([...friends, newFriend]);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <h1 className="text-2xl mb-4">Referral System</h1>
            <div className="mb-4">
                <p>Your Referral Code: <strong>{referralCode}</strong></p>
                <p>Share this link to refer friends: <strong>{`https://yourapp.com/signup?ref=${referralCode}`}</strong></p>
            </div>
            <button
                onClick={handleAddFriend}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Simulate Referral
            </button>
            <div className="w-full">
                <h2 className="text-xl mb-2">Referred Friends</h2>
                {friends.length === 0 ? (
                    <p>No friends referred yet.</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {friends.map((friend) => (
                            <li key={friend.id} className="mb-2">
                                <p>Friend ID: {friend.id}</p>
                                <p>Referred By: {friend.referredBy}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}