import mongoose from 'mongoose';
import Referral from '../../models/Referrals';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/referrals', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

export async function saveReferral(userId: string, referrerId: string) {
    const referral = new Referral({ userId, referrerId });
    await referral.save();
}

export async function getReferrals(referrerId: string): Promise<string[]> {
    const referrals = await Referral.find({ referrerId }).exec();
    return referrals.map(referral => referral.userId);
}

export async function getReferrer(userId: string): Promise<string | null> {
    const referral = await Referral.findOne({ userId }).exec();
    return referral ? referral.referrerId : null;
}