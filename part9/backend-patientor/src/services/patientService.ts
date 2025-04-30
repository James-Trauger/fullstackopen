import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getAllPatients = (): Patient[] => {
    return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatient): Patient => {

    const newPatientEntry: Patient = {
        id: uuid(),
        ...entry,
    };

    console.log(patients.concat(newPatientEntry));
    return newPatientEntry;
};

export default {
    getAllPatients,
    getAllNonSensitivePatients,
    addPatient,
};