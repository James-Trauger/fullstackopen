import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { Diagnosis, EntryFormValues, EntryType } from '../../types';

interface Props extends React.PropsWithChildren {
  modalOpen: boolean;
  onClose: () => void;
  addEntry: (values: EntryFormValues) => void;
  entryType: EntryType;
  diagnoses: Map<string, Diagnosis>;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  addEntry,
  entryType,
  diagnoses,
  error,
  children,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new {entryType} entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        addEntry={addEntry}
        onCancel={onClose}
        type={entryType}
        diagnoses={diagnoses}
      >
        {children}
      </AddEntryForm>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
