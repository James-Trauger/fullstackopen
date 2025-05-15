import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Diagnosis,
  Gender,
  Patient,
  EntryFormValues,
  HealthCheckRating,
  EntryType,
} from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {
  List,
  ListItemText,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Input,
} from '@mui/material';
import EntryInfo from './EntryInfo';
import AddEntryModal from '../AddEntryModal';

import patientService from '../../services/patients';

const useEntryModal = (
  type: EntryType,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  return { type, modalOpen, openModal, closeModal };
};

interface RatingOptions {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOptions[] = Object.values(HealthCheckRating)
  .filter((k) => typeof k !== 'string')
  .map((key) => ({
    value: key,
    label: HealthCheckRating[key],
  }));

interface PatientInfoPageProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnoses: Map<string, Diagnosis>;
}

const PatientInfoPage = ({
  patients,
  setPatients,
  diagnoses,
}: PatientInfoPageProps) => {
  const [error, setError] = useState<string>();
  const healthCheckModal = useEntryModal('HealthCheck', setError);
  const hospitalModal = useEntryModal('Hospital', setError);
  const occupationalModal = useEntryModal('OccupationalHealthcare', setError);

  // healthcheck fields
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  // hospital fields
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // occupational healthcare fields
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  if (!patient || !id) {
    return <>patient not found</>;
  }

  const submitNewEntry =
    (id: string, type: EntryType) => async (values: EntryFormValues) => {
      let updatedPatient: Patient;
      try {
        switch (type) {
          case 'HealthCheck':
            updatedPatient = await patientService.addEntry(
              {
                ...values,
                type,
                healthCheckRating,
              },
              id
            );
            healthCheckModal.closeModal();
            break;
          case 'Hospital':
            updatedPatient = await patientService.addEntry(
              {
                ...values,
                type,
                discharge: {
                  date: dischargeDate,
                  criteria: dischargeCriteria,
                },
              },
              id
            );
            hospitalModal.closeModal();
            break;
          case 'OccupationalHealthcare':
            updatedPatient = await patientService.addEntry(
              {
                ...values,
                type,
                employerName,
                sickLeave: {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                },
              },
              id
            );
            occupationalModal.closeModal();
            break;
        }

        // reset fields
        setHealthCheckRating(HealthCheckRating.Healthy);
        setDischargeDate('');
        setDischargeCriteria('');
        setEmployerName('');
        setSickLeaveStart('');
        setSickLeaveEnd('');

        // update patient info
        setPatients(patients.map((p) => (p.id === id ? updatedPatient : p)));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            setError(message);
          } else {
            setError('Unrecognized axios error');
          }
        } else if (e instanceof Error) {
          console.error(e.message);
          setError(e.message);
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    };

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
        <EntryInfo key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
      <AddEntryModal
        modalOpen={healthCheckModal.modalOpen}
        addEntry={submitNewEntry(id, healthCheckModal.type)}
        entryType={healthCheckModal.type}
        diagnoses={diagnoses}
        error={error}
        onClose={healthCheckModal.closeModal}
      >
        <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
        <Select
          label="HealthCheckRating"
          fullWidth
          value={healthCheckRating}
          onChange={(event: SelectChangeEvent<HealthCheckRating>) => {
            event.preventDefault();
            const rating = event.target.value;
            if (typeof rating !== 'string') {
              setHealthCheckRating(rating);
            }
          }}
        >
          {ratingOptions.map((option) => {
            return (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </AddEntryModal>
      <AddEntryModal
        modalOpen={hospitalModal.modalOpen}
        addEntry={submitNewEntry(id, hospitalModal.type)}
        entryType={hospitalModal.type}
        diagnoses={diagnoses}
        error={error}
        onClose={hospitalModal.closeModal}
      >
        <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </AddEntryModal>
      <AddEntryModal
        modalOpen={occupationalModal.modalOpen}
        addEntry={submitNewEntry(id, occupationalModal.type)}
        entryType={occupationalModal.type}
        diagnoses={diagnoses}
        error={error}
        onClose={occupationalModal.closeModal}
      >
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Sick Leave Start Date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Sick Leave End Date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        />
      </AddEntryModal>
      <Button variant="contained" onClick={() => healthCheckModal.openModal()}>
        Add Health Check Entry
      </Button>
      <Button
        style={{ marginLeft: '0.2rem' }}
        variant="contained"
        onClick={() => hospitalModal.openModal()}
      >
        Add Hospital Entry
      </Button>
      <Button
        style={{ marginLeft: '0.2rem' }}
        variant="contained"
        onClick={() => occupationalModal.openModal()}
      >
        Add Occupational Healthcare Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
