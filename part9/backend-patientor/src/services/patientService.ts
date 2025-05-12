import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';

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

/* adds the entry to the patient with the specified id */
const addEntry = (newEntry: NewEntry, id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return;
  }
  const entry = {
    ...newEntry,
    id: uuid(),
  };
  patient.entries.push(entry);
  return patient;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  addEntry,
};
