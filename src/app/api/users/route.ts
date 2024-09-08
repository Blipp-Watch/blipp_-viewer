import mongoose from 'mongoose';
import User from '../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);
}

export async function POST(request: NextRequest) {
    await connectDB();
    const { name, level, xp, badges, blippTokens, achievements, dailyBonus, user_id } = await request.json();

    if (!name || user_id) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const newUser = new User({ name, level, xp, badges, blippTokens, achievements, dailyBonus });
        await newUser.save();
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    await connectDB();
    const user_id = request.nextUrl.searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    try {
        const user = await User.findOne({ user_id });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}