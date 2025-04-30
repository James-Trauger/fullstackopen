import express from 'express';
import { Response } from 'express';
import { Dianosis } from '../types';
import diagnosisService from '../services/diagnosisService';
const router = express.Router();

router.get('/', (_req, res: Response<Dianosis[]>) => {
    res.send(diagnosisService.getAllDiagnoses());
});

export default router;