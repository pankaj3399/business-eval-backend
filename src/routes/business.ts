import express from 'express';
import { createBusiness, deleteBusiness, getAllBusiness, getBusinessById, updateBusiness } from '../controllers/business';
import { isAuthenticated } from '../middleware/auth';
import validate from '../middleware/validate';
import { createBusinessValidator, updateBusinessValidator } from '../validators/business';

const router = express.Router();

router.post('/', validate(createBusinessValidator), createBusiness);
router.put('/:id', validate(updateBusinessValidator), updateBusiness);
router.get("/", isAuthenticated, getAllBusiness);
router.get('/:id', getBusinessById);
router.delete('/:id', isAuthenticated, deleteBusiness);

export default router;