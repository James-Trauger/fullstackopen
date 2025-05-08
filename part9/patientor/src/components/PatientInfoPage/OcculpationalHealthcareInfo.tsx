import { OccupationalHealthcareEntry } from '../../types';

interface OccupationalHealthcareEntryInfoProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryInfo = (
  props: OccupationalHealthcareEntryInfoProps
) => {
  const entry = props.entry;
  return (
    <div>
      {entry.type}
      {entry.employerName}
      {entry.specialist}
      {entry.sickLeave.startDate}
      {entry.sickLeave.endDate}
    </div>
  );
};

export default OccupationalHealthcareEntryInfo;
