import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async (): Promise<Map<string, Diagnosis>> => {
  const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  const codeMap: Map<string, Diagnosis> = new Map();
  result.data.forEach((d) => codeMap.set(d.code, d));
  return codeMap;
};

export default {
  getAll,
};
