"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_skills_1 = require("./controller.skills");
const const_auth_1 = require("../auth/const.auth");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_skills_1 = require("./validation.skills");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(const_auth_1.USER_ROLE.user, const_auth_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(validation_skills_1.SkillValidations.createSkillValidationSchema), controller_skills_1.SkillControllers.createSkill);
router.get('/', controller_skills_1.SkillControllers.getAllSkills);
router.get('/:id', controller_skills_1.SkillControllers.getSingleSkill);
router.patch('/:id', (0, auth_1.default)(const_auth_1.USER_ROLE.user, const_auth_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(validation_skills_1.SkillValidations.updateSkillValidationSchema), controller_skills_1.SkillControllers.updateSkill);
router.delete('/:id', (0, auth_1.default)(const_auth_1.USER_ROLE.user, const_auth_1.USER_ROLE.superAdmin), controller_skills_1.SkillControllers.deleteSkill);
exports.SkillRoutes = router;
