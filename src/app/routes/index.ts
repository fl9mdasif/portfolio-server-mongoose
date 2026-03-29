import { Router } from 'express';
import { authRoute } from '../modules/auth/route.auth';
import { projectRoutes } from '../modules/projects/route.projects';
import { blogRoutes } from '../modules/blog/router.blog';
import { SkillRoutes } from '../modules/skills/route.skills';
import { ReviewRoutes } from '../modules/reviews/route.reviews';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },

  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  }
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;
