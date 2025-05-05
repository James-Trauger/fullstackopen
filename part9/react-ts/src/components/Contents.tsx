import { JSX } from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courses.map((c, i) => (
        <Part key={i} course={c} />
      ))}
    </div>
  );
};

export default Content;
