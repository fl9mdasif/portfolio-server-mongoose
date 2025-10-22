import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ProjectServices } from './service.projects';
import { response } from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { Projects } from './model.projects';
 

// create course
const createProject: RequestHandler = async (req, res) => {
  const result = await ProjectServices.createProject(req.body);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created Successfully',
    data: result,
  });
};

// get all course
const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjects(req.query);

  // Get the total number of documents
  let total = 0;

  const page = req.query.page;
  const limit = req.query.limit;

  // show total if limit query not used
  if (!req.query) {
    const res = await Projects.find();
    total = res.length;
  } else {
    total = result.length;
  }

  response.getSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: {
      page: Number(page ? page : 1),
      limit: Number(limit ? limit : 20),
      total,
      // total: 0,
    },
    message: 'Shoes retrieved successfully',
    data: result,
  });
});
// delete shoe
const deleteProject = catchAsync(async (req, res) => {
  const shoeIds = req.body as string[];
  // console.log({ courseId });

  const resp = await ProjectServices.deleteProject(shoeIds);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoes deleted successfully',
    data: resp,
  });
});

// Get singleShoe
const getSingleProject = catchAsync(async (req, res) => {
  const { shoeId } = req.params;

  const result = await ProjectServices.getSingleProject(shoeId);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe retrieved successfully',
    data: result,
  });
});

// update
const updateProject = catchAsync(async (req, res) => {
  const { shoeId } = req.params;
  // console.log(shoeId);
  const updatedData = req.body;

  const result = await ProjectServices.updateProject(shoeId, updatedData);
  // console.log('res', result);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});



export const projectControllers = {
  createProject,
  getAllProjects,
  deleteProject,
  getSingleProject,
  updateProject,
  
};
