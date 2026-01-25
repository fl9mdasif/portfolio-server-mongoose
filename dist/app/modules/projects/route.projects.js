"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_projects_1 = require("./controller.projects");
const const_auth_1 = require("../auth/const.auth");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-project', (0, auth_1.default)(const_auth_1.USER_ROLE.user, const_auth_1.USER_ROLE.superAdmin), 
// validateRequest(ShoesValidation.CreateShoesValidationSchema),
controller_projects_1.projectControllers.createProject);
router.get('/', 
// auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),
controller_projects_1.projectControllers.getAllProjects);
// get single
router.get('/:projectId', 
// auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),
controller_projects_1.projectControllers.getSingleProject);
// delete
router.delete('/:projectId', 
// auth(USER_ROLE.superAdmin),
controller_projects_1.projectControllers.deleteProject);
router.put('/:projectId', 
// auth(USER_ROLE.seller, USER_ROLE.superAdmin),
// validateRequest(ShoesValidation.UpdateShoesValidationSchema),
controller_projects_1.projectControllers.updateProject);
exports.projectRoutes = router;
