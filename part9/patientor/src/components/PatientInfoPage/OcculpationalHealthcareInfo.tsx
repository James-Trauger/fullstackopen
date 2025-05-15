import { List } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import TextItem from './TextItem';

interface OccupationalHealthcareEntryInfoProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryInfo = (
  props: OccupationalHealthcareEntryInfoProps
) => {
  const entry = props.entry;
  return (
    <List>
      <TextItem primary={`Employer's name`} secondary={entry.employerName} />
      <TextItem primary="Specialist" secondary={entry.specialist} />
      <TextItem
        primary="Sick leave start"
        secondary={entry.sickLeave.startDate}
      />
      <TextItem primary="Sick leave end" secondary={entry.sickLeave.endDate} />
    </List>
  );
};

export default OccupationalHealthcareEntryInfo;
