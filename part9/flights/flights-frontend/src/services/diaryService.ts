import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const createDiary = (newDiaryEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, newDiaryEntry)
    .then((response) => response.data);
};

export default {
  getAllDiaries,
  createDiary,
};
