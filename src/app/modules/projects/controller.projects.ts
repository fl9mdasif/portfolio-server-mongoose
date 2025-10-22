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
    message: 'Project created Successfully',
    data: result,
  });
};

// get all course
const getAllProjects = catchAsync(async (req, res) => {

  const result = await ProjectServices.getAllProjects(req.query);
// console.log('result',result)
  // Get the total number of documents
  let total = 0;

  const page = req.query.page;
  const limit = req.query.limit;

  // show total if limit query not used
  if (!req.query) {
    const res = await Projects.find();
    total = res.length;
  } else {
    total = result.data.length;
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
    message: 'Projects retrieved successfully',
    data: result,
  });
});

// delete project
const deleteProject = catchAsync(async (req, res) => {
  const projectId = req.body as string[];

  const resp = await ProjectServices.deleteProjects(projectId);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    data: resp,
  });
});

// Get singleShoe
const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const result = await ProjectServices.getSingleProject(projectId);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project retrieved successfully',
    data: result,
  });
});

// update
const updateProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const updatedData = req.body;

  // console.log('update',updatedData)

  const result = await ProjectServices.updateProject(projectId, updatedData);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
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
