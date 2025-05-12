import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { NewEntry, NewPatient, NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import middleware from './middleware';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getAllNonSensitivePatients());
});

router.get(
  '/:id',
  (req, res: Response<NonSensitivePatient>, next: NextFunction) => {
    const id = req.params.id;
    const patient = patientService.getNonSensitivePatient(id);
    if (!patient) {
      // patient not found, does not exist
      res.status(404);
      next(new Error('patient not found'));
    } else {
      res.send(patient);
    }
  }
);

router.post(
  '/',
  middleware.newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<NewPatient>,
    next: NextFunction
  ) => {
    try {
      const addedPatient = patientService.addPatient(req.body);
      res.json(addedPatient);
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.post(
  '/:id',
  middleware.newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<NonSensitivePatient>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const addedEntry = patientService.addEntry(req.body, id);
      res.json(addedEntry);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default router;
