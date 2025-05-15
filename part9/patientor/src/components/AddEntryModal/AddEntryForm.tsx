import { PropsWithChildren, SyntheticEvent, useState } from 'react';
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  Input,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { Diagnosis, EntryFormValues, EntryType } from '../../types';

interface Props extends PropsWithChildren {
  onCancel: () => void;
  addEntry: (values: EntryFormValues, type: EntryType) => void;
  type: EntryType;
  diagnoses: Map<string, Diagnosis>;
}

const AddEntryForm = ({
  onCancel,
  addEntry,
  type,
  diagnoses,
  children,
}: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    addEntry(baseEntry, type);

    //reset fields
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
  };

  const onDiagnosisChange = (
    event: SelectChangeEvent<Array<Diagnosis['code']>>
  ) => {
    event.preventDefault();
    const code = event.target.value;
    setDiagnosisCodes(typeof code === 'string' ? code.split(', ') : code);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input type="date" onChange={({ target }) => setDate(target.value)} />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {Array.from(diagnoses).map(([key]) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>

        {children}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
