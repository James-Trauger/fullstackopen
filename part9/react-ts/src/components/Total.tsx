import { JSX } from 'react';

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <div>
      <h2>Total Exercises</h2>
      <p>{props.totalExercises}</p>
    </div>
  );
};

export default Total;
