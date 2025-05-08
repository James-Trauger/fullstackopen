import { HospitalEntry } from '../../types';

interface HospitalEntryInfoProps {
  entry: HospitalEntry;
}

const HospitalEntryInfo = (props: HospitalEntryInfoProps) => {
  const entry = props.entry;
  return (
    <div>
      {entry.type}
      discharged on {entry.discharge.date} because: {entry.discharge.criteria}
    </div>
  );
};

export default HospitalEntryInfo;
