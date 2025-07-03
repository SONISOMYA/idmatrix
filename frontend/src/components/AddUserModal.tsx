// src/components/AddUserModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Stack
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddUserModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Button variant="contained" fullWidth>Add Manually</Button>
          <Button variant="outlined" fullWidth>Upload Excel</Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}