import z from 'zod';
import { Gender } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

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
