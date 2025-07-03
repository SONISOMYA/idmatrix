import { uploadUsers, downloadSample } from '../api';
import { Button } from '@mui/material';

interface Props {
  onUploaded: () => void;
}

export default function BulkUpload({ onUploaded }: Props) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        await uploadUsers(e.target.files[0]);
        alert('Uploaded successfully');
        onUploaded();
      } catch {
        alert('Upload failed');
      }
    }
  };

  return (
    <>
      <Button component="label" variant="outlined">
        Upload Excel
        <input type="file" hidden onChange={handleFile} />
      </Button>
      <Button onClick={downloadSample} variant="outlined" sx={{ ml: 2 }}>
        Download Sample
      </Button>
    </>
  );
}