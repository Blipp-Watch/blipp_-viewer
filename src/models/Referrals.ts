import mongoose, { Schema, Document } from 'mongoose';

interface IReferral extends Document {
    userId: string;
    referrerId: string;
}

const referralSchema: Schema = new Schema({
    userId: { type: String, required: true },
    referrerId: { type: String, required: true }
});

const Referral = mongoose.model<IReferral>('Referral', referralSchema);

export default Referral;