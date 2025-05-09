import { List, ListItemText } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';

interface OccupationalHealthcareEntryInfoProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryInfo = (
  props: OccupationalHealthcareEntryInfoProps
) => {
  const entry = props.entry;
  return (
    <List>
      <ListItemText>{entry.type}</ListItemText>
      <ListItemText>{entry.employerName}</ListItemText>
      <ListItemText>{entry.specialist}</ListItemText>
      <ListItemText>{entry.sickLeave.startDate}</ListItemText>
      <ListItemText>{entry.sickLeave.endDate}</ListItemText>
    </List>
  );
};

export default OccupationalHealthcareEntryInfo;
