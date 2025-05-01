import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { NewPatient, NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import middleware from './middleware';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getAllNonSensitivePatients());
});

router.post('/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>, next: NextFunction) => {
    try {
        const addedPatient = patientService.addPatient(req.body);
        res.json(addedPatient);
    } catch (error: unknown) {
        next(error);
    }
});

export default router;