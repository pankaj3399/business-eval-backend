import express from 'express';
import { createBusiness, deleteBusiness, getAllBusiness, getBusinessById, updateBusiness, addNewMetric, updateMetric, deleteMetric, uploadFiles } from '../controllers/business';
import { isAuthenticated } from '../middleware/auth';
import validate from '../middleware/validate';
import { createBusinessValidator, newMetricSchema, updateBusinessValidator, updateMetricSchema   } from '../validators/business';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.post('/upload/:id', upload.single('file'), uploadFiles);    
router.get("/", isAuthenticated, getAllBusiness);
router.get('/:id', getBusinessById);
router.delete('/:id', isAuthenticated, deleteBusiness);
router.post('/add-metric/:id', validate(newMetricSchema), addNewMetric);
router.put('/update-metric/:id', validate(updateMetricSchema), updateMetric);
router.delete('/delete-metric/:id', validate(updateMetricSchema), deleteMetric);    
export default router;