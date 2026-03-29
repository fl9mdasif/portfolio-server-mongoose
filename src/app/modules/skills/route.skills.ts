import express from 'express';
import { SkillControllers } from './controller.skills';
import { USER_ROLE } from '../auth/const.auth';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidations } from './validation.skills';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.superAdmin),
  validateRequest(SkillValidations.createSkillValidationSchema),
  SkillControllers.createSkill,
);

router.get(
  '/',
  SkillControllers.getAllSkills,
);

router.get(
  '/:id',
  SkillControllers.getSingleSkill,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin),
  validateRequest(SkillValidations.updateSkillValidationSchema),
  SkillControllers.updateSkill,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin),
  SkillControllers.deleteSkill,
);

export const SkillRoutes = router;
