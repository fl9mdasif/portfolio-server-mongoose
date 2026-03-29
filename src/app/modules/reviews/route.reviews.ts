import express from 'express';
import { ReviewControllers } from './controller.reviews';
import { USER_ROLE } from '../auth/const.auth';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './validation.reviews';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

router.get(
  '/',
  ReviewControllers.getAllReviews,
);

router.get(
  '/:id',
  ReviewControllers.getSingleReview,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user),
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewControllers.updateReview,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user),
  ReviewControllers.deleteReview,
);

export const ReviewRoutes = router;
