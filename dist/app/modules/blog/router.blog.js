"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const const_auth_1 = require("../auth/const.auth");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const controller_blog_1 = require("./controller.blog");
const router = express_1.default.Router();
router.post('/create-blog', (0, auth_1.default)(const_auth_1.USER_ROLE.user, const_auth_1.USER_ROLE.superAdmin), 
// validateRequest(ShoesValidation.CreateShoesValidationSchema),
controller_blog_1.blogControllers.createBlog);
router.get('/', 
// auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),
controller_blog_1.blogControllers.getAllBlogs);
// get single
router.get('/:blogId', 
// auth(USER_ROLE.buyer, USER_ROLE.seller, USER_ROLE.superAdmin),
controller_blog_1.blogControllers.getSingleBlog);
// delete
router.delete('/:blogId', 
// auth(USER_ROLE.superAdmin),
controller_blog_1.blogControllers.deleteBlogs);
router.patch('/:blogId', 
// auth(USER_ROLE.seller, USER_ROLE.superAdmin),
// validateRequest(ShoesValidation.UpdateShoesValidationSchema),
controller_blog_1.blogControllers.updateBlog);
exports.blogRoutes = router;
