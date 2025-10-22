import { Router } from 'express';
import { authRoute } from '../modules/auth/route.auth';
import { projectRoutes } from '../modules/projects/route.projects';

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
 
  // {
  //   path: '/shoePolish',
  //   route: polishRoute,
  // },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;
