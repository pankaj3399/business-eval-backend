"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const business_1 = require("../controllers/business");
const auth_1 = require("../middleware/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const business_2 = require("../validators/business");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = express_1.default.Router();
router.post('/', business_1.createBusiness);
router.put('/:id', business_1.updateBusiness);
router.post('/upload/:id', upload.single('file'), business_1.uploadFiles);
router.get("/", auth_1.isAuthenticated, business_1.getAllBusiness);
router.get('/:id', business_1.getBusinessById);
router.delete('/:id', auth_1.isAuthenticated, business_1.deleteBusiness);
router.post('/add-metric/:id', (0, validate_1.default)(business_2.newMetricSchema), business_1.addNewMetric);
router.put('/update-metric/:id', (0, validate_1.default)(business_2.updateMetricSchema), business_1.updateMetric);
router.delete('/delete-metric/:id', (0, validate_1.default)(business_2.updateMetricSchema), business_1.deleteMetric);
exports.default = router;
//# sourceMappingURL=business.js.map