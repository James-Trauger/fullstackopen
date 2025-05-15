import { List } from '@mui/material';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import TextItem from './TextItem';

interface HealthCheckEntryInfoProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryInfo = (props: HealthCheckEntryInfoProps) => {
  const entry = props.entry;
  return (
    <List>
      <TextItem
        primary="Health Rating"
        secondary={HealthCheckRating[entry.healthCheckRating]}
      />
    </List>
  );
};

export default HealthCheckEntryInfo;
