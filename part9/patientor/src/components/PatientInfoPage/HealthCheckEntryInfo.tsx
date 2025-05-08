import { HealthCheckEntry } from '../../types';

interface HealthCheckEntryInfoProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryInfo = (props: HealthCheckEntryInfoProps) => {
  const entry = props.entry;
  return (
    <div>
      {entry.type}
      {entry.healthCheckRating}
    </div>
  );
};

export default HealthCheckEntryInfo;
