import { List, ListItemText } from '@mui/material';
import { HealthCheckEntry } from '../../types';

interface HealthCheckEntryInfoProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryInfo = (props: HealthCheckEntryInfoProps) => {
  const entry = props.entry;
  return (
    <List>
      <ListItemText>{entry.type}</ListItemText>
      <ListItemText>{entry.healthCheckRating}</ListItemText>
    </List>
  );
};

export default HealthCheckEntryInfo;
