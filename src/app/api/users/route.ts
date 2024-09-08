import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import User from '../../../models/userModel'

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    
    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ name: 'BlippMaster99' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, level, xp, badges, blippTokens, achievements, dailyBonus } = req.body;
            const newUser = new User({ name, level, xp, badges, blippTokens, achievements, dailyBonus });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save user' });
        }
    }
}
