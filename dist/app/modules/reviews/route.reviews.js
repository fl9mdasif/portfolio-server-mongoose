"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_reviews_1 = require("./controller.reviews");
const const_auth_1 = require("../auth/const.auth");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_reviews_1 = require("./validation.reviews");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(validation_reviews_1.ReviewValidations.createReviewValidationSchema), controller_reviews_1.ReviewControllers.createReview);
router.get('/', controller_reviews_1.ReviewControllers.getAllReviews);
router.get('/:id', controller_reviews_1.ReviewControllers.getSingleReview);
router.patch('/:id', (0, auth_1.default)(const_auth_1.USER_ROLE.superAdmin, const_auth_1.USER_ROLE.user), (0, validateRequest_1.default)(validation_reviews_1.ReviewValidations.updateReviewValidationSchema), controller_reviews_1.ReviewControllers.updateReview);
router.delete('/:id', (0, auth_1.default)(const_auth_1.USER_ROLE.superAdmin, const_auth_1.USER_ROLE.user), controller_reviews_1.ReviewControllers.deleteReview);
exports.ReviewRoutes = router;
