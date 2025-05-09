import { List } from '@mui/material';
import { HospitalEntry } from '../../types';
import TextItem from './TextItem';

interface HospitalEntryInfoProps {
  entry: HospitalEntry;
}

const HospitalEntryInfo = (props: HospitalEntryInfoProps) => {
  const entry = props.entry;
  return (
    <List sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
      <TextItem primary="Discharged on:" secondary={entry.discharge.date} />
      <TextItem primary="Reason:" secondary={entry.discharge.criteria} />
    </List>
  );
};

export default HospitalEntryInfo;
