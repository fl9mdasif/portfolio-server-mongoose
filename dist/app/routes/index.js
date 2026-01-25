"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_auth_1 = require("../modules/auth/route.auth");
const route_projects_1 = require("../modules/projects/route.projects");
const router_blog_1 = require("../modules/blog/router.blog");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/auth',
        route: route_auth_1.authRoute,
    },
    {
        path: '/projects',
        route: route_projects_1.projectRoutes,
    },
    {
        path: '/blogs',
        route: router_blog_1.blogRoutes,
    }
];
moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));
exports.default = router;
