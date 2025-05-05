import { JSX } from 'react';
import { DiaryEntry } from '../types';

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps): JSX.Element => {
  const diary = props.diary;
  return (
    <div>
      <h3>{diary.date}</h3>
      <ul>
        <li>{diary.visibility}</li>
        <li>{diary.weather}</li>
      </ul>
    </div>
  );
};

export default Diary;
