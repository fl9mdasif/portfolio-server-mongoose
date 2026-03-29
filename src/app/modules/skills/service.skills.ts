/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { TSkill } from './interface.skills';
import { Skill } from './model.skills';

// 1. Create a new skill
const createSkillIntoDB = async (payload: TSkill) => {
  const result = await Skill.create(payload);
  return result;
};

// 2. Get all skills with optional filtering
const getAllSkillsFromDB = async (payload: Record<string, unknown>) => {
  const { 
    category, 
    isSelect, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    page = 1,
    limit = 10 
  } = payload;
  
  const filter: any = {};
  if (category) {
    filter.category = { $regex: new RegExp(category as string, 'i') };
  }
  if (isSelect !== undefined) {
    filter.isSelect = isSelect === 'true';
  }

  const sort: any = {};
  sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);

  const result = await Skill.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Skill.countDocuments(filter);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

// 3. Get single skill
const getSingleSkillFromDB = async (id: string) => {
  const result = await Skill.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found with this ID');
  }
  return result;
};

// 4. Update skill
const updateSkillIntoDB = async (id: string, payload: Partial<TSkill>) => {
  const result = await Skill.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update skill. Skill not found.');
  }
  return result;
};

// 5. Delete skill
const deleteSkillFromDB = async (id: string) => {
  const result = await Skill.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found to delete');
  }
  return result;
};

export const SkillServices = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  getSingleSkillFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};
