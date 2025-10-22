import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { ShoesValidation } from './validation.projects';
import { projectControllers } from './controller.projects';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/constant.user';

const router = express.Router();

router.post(
  '/create-shoes',
  // auth(USER_ROLE.seller, USER_ROLE.superAdmin),
  // validateRequest(ShoesValidation.CreateShoesValidationSchema),
  projectControllers.createProject,
);

router.get(
  '/',
  // auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),

  projectControllers.getAllProjects,
);
// get single
router.get(
  '/:shoeId',
  // auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),
  projectControllers.getSingleProject,
);
// delete
router.delete(
  '/:projectId',
  // auth(USER_ROLE.superAdmin),
  projectControllers.deleteProject,
);

router.put(
  '/:projectId',
  // auth(USER_ROLE.seller, USER_ROLE.superAdmin),

  // validateRequest(ShoesValidation.UpdateShoesValidationSchema),
  projectControllers.updateProject,
);



export const projectRoutes = router;
