import express from 'express';
import * as imageController from '../controller/imageController.js';

const router = express.Router();

router.get('/images', imageController.modifyImage);

export default router;
