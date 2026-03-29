import { Schema, model } from 'mongoose';
import { TSkill } from './interface.skills';

const skillSchema = new Schema<TSkill>({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isSelect: { type: Boolean, default: false },
}, { timestamps: true });

export const Skill = model<TSkill>('Skill', skillSchema);
