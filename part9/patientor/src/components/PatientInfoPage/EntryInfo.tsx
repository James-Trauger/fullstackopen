import { Diagnosis, Entry, assertNever } from '../../types';
import HealthCheckEntryInfo from './HealthCheckEntryInfo';
import HospitalEntryInfo from './HospitalEntryInfo';
import OccupationalHealthcareEntryInfo from './OcculpationalHealthcareInfo';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryInfo entry={entry} />;
    case 'Hospital':
      return <HospitalEntryInfo entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryInfo entry={entry} />;
    default:
      return assertNever(entry);
  }
};

interface EntryInfoProps {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

const EntryInfo = (props: EntryInfoProps) => {
  const entry = props.entry;
  const diagnoses = props.diagnoses;

  if (!entry) {
    return <></>;
  }

  return (
    <div>
      <p>
        <b>{entry.specialist}</b> {entry.date} <br />
        <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={entry.id + code}>
            {code} {diagnoses.get(code)?.name}
          </li>
        ))}
      </ul>
      <EntryDetails entry={entry} />
    </div>
  );
};

export default EntryInfo;
