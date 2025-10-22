/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProject } from './interface.projects';
import { Projects } from './model.projects';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

// create shoes
const createProject = async (projectData: TProject) => {
  const result = await Projects.create(projectData);
  return result;
};

// get all shoes
const getAllProjects = async (payload: Record<string, unknown>) => {
  try {
    const {
      page = 1,
      limit = 15,
      sortBy = 'startDate',
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      releasedAt,
      productName,
      brand,
      model,
      size,
      category,
      color,
      gender,
      rawMaterial,
    } = payload;

    //  filter object based on query parameters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(String(minPrice));
      if (maxPrice) filter.price.$lte = parseFloat(String(maxPrice));
    }

    if (releasedAt) {
      const releaseDate = new Date(releasedAt as string);

      // Check if the parsed date is valid
      if (!isNaN(releaseDate.getTime())) {
        // Filter documents where createdAt is greater than or equal to releaseDate
        filter.createdAt = { $gte: releaseDate };
      }
    }

    if (productName)
      filter.productName = { $regex: new RegExp(productName as string, 'i') };
    if (brand) filter.brand = { $regex: new RegExp(brand as string, 'i') };
    if (model) filter.model = { $regex: new RegExp(model as string, 'i') };
    if (size) filter.size = { $regex: new RegExp(size as string, 'i') };
    if (gender) filter.gender = { $regex: new RegExp(gender as string, 'i') };
    if (color) filter.color = { $regex: new RegExp(color as string, 'i') };
    if (rawMaterial)
      filter.rawMaterial = { $regex: new RegExp(rawMaterial as string, 'i') };
    if (category)
      filter.category = { $regex: new RegExp(category as string, 'i') };

    // sort order && sort by
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort: Record<string, any> = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // calculate skip value for pagination
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));

    const result = await Projects.find(filter)
      // .populate('createdBy', '-password -createdAt -updatedAt')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(String(limit)));

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

// getSingle shoe
const getSingleProject = async (id: string) => {
  const singleShoe = await Projects.findById({ _id: id });

  return singleShoe;
};

// delete shoes
const deleteProject = async (ids: string[]) => {
  // get reviews
  const deleteProject= await Projects.deleteMany({ _id: { $in: ids } });
  return deleteProject;
};

// update
const updateProject = async (id: string, updatedData: Partial<TProject>) => {
  // console.log(id);

  // Basic update primitive fields
  const updatedBasicShoeInfo = await Projects.findOneAndUpdate(
    { _id: id },

    { $set: updatedData },
    { upsert: true, new: true, runValidators: true },
  );

  if (!updatedBasicShoeInfo) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update basic product',
      'shoe update',
    );
  }

  const result = await Projects.findById({ _id: id });

  return result;
};

 

export const ProjectServices = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getSingleProject,
  // verifyProduct,
};
