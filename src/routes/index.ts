import express from 'express';

import user from './user';
import business from './business';

const router = express.Router();

router.use('/user', user);
router.use('/business', business);


export default router;