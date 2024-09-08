import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  progress: { type: Number, required: true },
  goal: { type: Number, required: true },
  completed: { type: Boolean, required: true },
});

const DailyBonusSchema = new mongoose.Schema({
  streak: { type: Number, default: 0 },
  nextReward: { type: String, required: true },
  available: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  username: { type: String, required: true },
  language_code: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpToNextLevel: { type: Number, default: 1000 },
  badges: [BadgeSchema], // Embedded schema for badges
  avatar: { type: String, default: 'default-avatar-url' }, // URL to avatar
  blippTokens: { type: Number, default: 0 },
  achievements: [AchievementSchema], // Embedded schema for achievements
  dailyBonus: DailyBonusSchema, // Embedded schema for daily bonus
});

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;