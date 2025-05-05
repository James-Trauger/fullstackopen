import { CoursePart } from '../types';

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const course = props.course;

  const extras = (course: CoursePart) => {
    switch (course.kind) {
      case 'basic':
        return (
          <p>
            <em>A basic course</em>
          </p>
        );
      case 'group':
        return <p>Group Projects: {course.groupProjectCount}</p>;
      case 'background':
        return (
          <p>
            <em>{course.description}</em>
            <br />
            {course.backgroundMaterial}
          </p>
        );
      case 'special':
        return (
          <p>
            <em>{course.description}</em>
            <br />
            {course.requirements}
          </p>
        );
      default:
        assertNever(course);
        break;
    }
  };

  return (
    <div>
      <h3>
        {course.name}
        {course.exerciseCount}
      </h3>
      {extras(course)}
    </div>
  );
};

export default Part;
