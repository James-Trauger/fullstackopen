import { Diagnosis, Entry, assertNever } from '../../types';
import HealthCheckEntryInfo from './HealthCheckEntryInfo';
import HospitalEntryInfo from './HospitalEntryInfo';
import OccupationalHealthcareEntryInfo from './OcculpationalHealthcareInfo';
import { List, ListItem, ListItemText } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import TextItem from './TextItem';

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

const IconOfEntry: React.FC<{ type: Entry['type'] }> = ({ type }) => {
  switch (type) {
    case 'HealthCheck':
      return <MedicalInformationIcon color="inherit" fontSize="large" />;
    case 'Hospital':
      return <MedicalServicesIcon color="inherit" fontSize="large" />;
    case 'OccupationalHealthcare':
      return <WorkIcon color="inherit" fontSize="large" />;
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
    <List
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        outline: 'solid',
        marginBottom: '0.25rem',
        paddingLeft: '0.25rem',
      }}
    >
      <ListItem sx={{ padding: 0, fontSize: 20 }}>
        {entry.date}
        <IconOfEntry type={entry.type} />
      </ListItem>
      <ListItem
        component="div"
        disablePadding={true}
        alignItems="flex-start"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextItem primary="Specialist:" secondary={entry.specialist} />
        <TextItem primary="Description:" secondary={entry.description} />
      </ListItem>
      <List sx={{ padding: 0 }}>
        <TextItem primary="Codes:" />
        {entry.diagnosisCodes?.map((code) => (
          <ListItemText
            sx={{ marginLeft: '1rem' }}
            key={entry.id + code}
            primary={`${code} | ${diagnoses.get(code)?.name}`}
          />
        ))}
      </List>
      <EntryDetails entry={entry} />
    </List>
  );
};

export default EntryInfo;
