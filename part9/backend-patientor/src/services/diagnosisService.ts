import dianoses from '../../data/diagnoses';
import { Dianosis } from '../types';

const getAllDiagnoses = (): Dianosis[] => {
    return dianoses;
};

export default {
    getAllDiagnoses,
};