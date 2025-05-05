import { JSX } from 'react';
import { DiaryEntry } from '../types';
import Diary from './Diary';

interface DiariesProps {
  diaries: DiaryEntry[];
}

const Diaries = (props: DiariesProps): JSX.Element => {
  const diaries = props.diaries;

  return (
    <div>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default Diaries;
