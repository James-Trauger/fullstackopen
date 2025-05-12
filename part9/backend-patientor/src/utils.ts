import z from 'zod';
import { Gender, Diagnosis, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const NewBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z
    .array(z.string())
    .refine((vals) => parseDiagnosisCodes(vals), 'invalid diagnosis codes')
    .optional(),
});

const NewHealthCheckEntry = NewBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const NewHospitalEntry = NewBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const NewOccupationalHealthcareEntry = NewBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  specialist: z.string(),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
]);

// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const parseString = (str: unknown, fieldName: string): string => {
//     if (!isString(str)) {
//         throw new Error(`incorrect or missing data for field ${fieldName}=${str}`);
//     }
//     return str;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//     if (!isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date ' + date);
//     }
//     return date;
// };

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender).map(g => g.toString()).includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!isString(gender) || !isGender(gender)) {
//         throw new Error('Incorrect or missing gender');
//     }
//     return gender;
// };

// export const toNewPatient = (object: unknown): NewPatient => {

//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }

//     if ('name' in object && 'dateOfBirth' in object && 'gender' in object
//         && 'occupation' in object && 'ssn' in object
//     ) {
//         return {
//             name: parseString(object.name, 'name'),
//             dateOfBirth: parseDate(object.dateOfBirth),
//             gender: parseGender(object.gender),
//             ssn: parseString(object.ssn, 'ssn'),
//             occupation: parseString(object.occupation, 'occupation'),
//         };
//     }

//     throw new Error('Incorrect data: some fields are missing');
// };
