import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getAllNonSensitivePatients());
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
});

export default router;