import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getNonSensitivePatient = (
  id: string
): NonSensitivePatient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
};
