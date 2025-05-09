import { useParams } from 'react-router-dom';

import { Diagnosis, Gender, Patient } from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { List, ListItemText, Typography } from '@mui/material';
import EntryInfo from './EntryInfo';

interface PatientInfoPageProps {
  patients: Patient[];
  diagnoses: Map<string, Diagnosis>;
}

const PatientInfoPage = (props: PatientInfoPageProps) => {
  const id = useParams().id;
  const patient = props.patients.find((p) => p.id === id);

  if (!patient) {
    return <>patient not found</>;
  }

  const icon = () => {
    if (patient.gender === Gender.Male) {
      return <MaleIcon />;
    } else if (patient.gender === Gender.Female) {
      return <FemaleIcon />;
    } else {
      return <></>;
    }
  };
  return (
    <div>
      <Typography variant="h4">
        {patient.name} {icon()}
      </Typography>
      <List>
        <ListItemText>Occupation: {patient.occupation}</ListItemText>
        <ListItemText>Date of Birth: {patient.dateOfBirth}</ListItemText>
        <ListItemText>
          {patient.ssn ? 'ssn' : ''} {patient.ssn}
        </ListItemText>
      </List>
      <Typography variant="h4">entries</Typography>
      {patient.entries.map((e) => (
        <EntryInfo key={e.id} entry={e} diagnoses={props.diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
