import mongoose, { Schema, Document } from 'mongoose';

export interface IQuest extends Document {
    title: string;
    description: string;
    icon: string;
    progress: number;
    total: number;
    completed: boolean;
    points: number;
}

const QuestSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    progress: { type: Number, default: 0 },
    total: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    points: { type: Number, required: true },
});

export default mongoose.models.Quest || mongoose.model<IQuest>('Quest', QuestSchema);