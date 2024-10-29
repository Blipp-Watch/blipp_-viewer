import questModel from "@/models/questModel";
import { createClient } from "@sanity/client";
import { icons } from "lucide-react";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from 'next/server';
import { title } from "process";

export const client = createClient({
   projectId: "trlejzgy", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: true, 
});

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI! || '');
};

export async function GET(request: NextRequest) {
    await connectDB();
    const { searchParams } = request.nextUrl;
    const stats = searchParams.get('stats');

    if (stats) {
        try {
            console.log(`Fetching stats for questId: ${stats}`);
            let statsData = await questModel.findOne({ questId: stats });
            if (!statsData) {
                console.log(`No stats found for questId: ${stats}, creating default stats.`);
                return NextResponse.json({ error: 'No stats found for questId', questId: stats }, { status: 404 });
            }
            return NextResponse.json(statsData, { status: 200 });
        } catch (error) {
            console.error('Failed to fetch quest stats:', error);
            return NextResponse.json({ error: 'Failed to fetch quest stats', details: error }, { status: 500 });
        }
    } else {
        try {
            const query = `*[_type == "quest"]`;
            const quests = await client.fetch(query);
            
            if (!quests) {
                return NextResponse.json({ error: "Quests Not found" }, { status: 404 });
            }
            return NextResponse.json(quests, { status: 200 });
        } catch (error) {
            console.error('Failed to fetch quests:', error);
            return NextResponse.json({ error: 'Failed to fetch quests', details: error }, { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    await connectDB();
    const { id, progress, completed, stats, questId, totalQuests, completedQuests, totalProgress, title, description, icon, total, points } = await request.json();

    if (stats) {
        if (!questId || !title || !description || !icon || total === undefined || points === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        try {
            let statsData = await questModel.findOne({ questId });
            if (!statsData) {
                statsData = new questModel({
                    questId,
                    totalQuests,
                    completedQuests,
                    totalProgress,
                    title,
                    description,
                    icon,
                    total,
                    points,
                });
                await statsData.save();
            }
            return NextResponse.json(statsData, { status: 200 });
        } catch (error) {
            console.error('Failed to create quest stats:', error);
            return NextResponse.json({ error: 'Failed to create quest stats', details: error }, { status: 500 });
        }
    } else {
        if (!id) {
            return NextResponse.json({ error: 'Missing quest ID' }, { status: 400 });
        }

        try {
            const quest = await questModel.findById(id);
            if (!quest) {
                return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
            }

            quest.progress = progress;
            quest.completed = completed;
            await quest.save();

            return NextResponse.json(quest, { status: 200 });
        } catch (error) {
            console.error('Failed to update quest:', error);
            return NextResponse.json({ error: 'Failed to update quest', details: error }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest) {
    await connectDB();
    const { id, title, description, icon, progress, total, completed, points } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'Missing quest ID' }, { status: 400 });
    }

    try {
        const quest = await questModel.findById(id);
        if (!quest) {
            return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
        }

        quest.title = title;
        quest.description = description;
        quest.icon = icon;
        quest.progress = progress;
        quest.total = total;
        quest.completed = completed;
        quest.points = points;
        await quest.save();

        return NextResponse.json(quest, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update quest' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'Missing quest ID' }, { status: 400 });
    }

    try {
        const quest = await questModel.findByIdAndDelete(id);
        if (!quest) {
            return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Quest deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete quest' }, { status: 500 });
    }
}