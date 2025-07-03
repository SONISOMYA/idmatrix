import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Props {
  open: boolean;
  errors: string[];
  onClose: () => void;
}

export default function BulkUploadErrorDialog({ open, errors, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { bgcolor: 'black', color: '#fff' } }}
    >
      <DialogTitle sx={{ color: '#FF5555' }}>Upload Errors</DialogTitle>
      <DialogContent dividers >
        <Typography sx={{ mb: 1 }}>
          The following issues were found. Please fix and try again:
        </Typography>
        {errors.map((err, idx) => (
          <Typography key={idx} sx={{ mb: 1 }}>
            • {err}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ bgcolor: '#7F00FF', textTransform: 'none' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}