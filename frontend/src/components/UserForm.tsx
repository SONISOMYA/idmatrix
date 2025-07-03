import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createUser, updateUser } from '../api';
import type { User } from '../types';

interface Props {
  onUserSaved: () => void;
  userToEdit?: User | null;
  onCancelEdit: () => void;
}

export default function UserForm({ onUserSaved, userToEdit, onCancelEdit }: Props) {
  const [form, setForm] = useState<Omit<User, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    pan_number: '',
  });

  const [showPAN, setShowPAN] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setForm({
        first_name: userToEdit.first_name,
        last_name: userToEdit.last_name,
        email: userToEdit.email,
        phone_number: userToEdit.phone_number,
        pan_number: userToEdit.pan_number,
      });
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.first_name || !form.last_name || !form.email || !form.phone_number || !form.pan_number) {
      return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return 'Invalid email format.';
    }
    if (!/^\d{10}$/.test(form.phone_number)) {
      return 'Phone number must be 10 digits.';
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan_number.toUpperCase())) {
      return 'PAN must be in format AAAAA9999A.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, form);
        alert('✅ User updated successfully!');
      } else {
        await createUser(form);
        alert('✅ User created successfully!');
      }
      onUserSaved();
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        pan_number: '',
      });
    } catch {
      alert('❌ Error saving user.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          fullWidth
          label="PAN Number"
          name="pan_number"
          type={showPAN ? 'text' : 'password'}
          value={form.pan_number}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{
            style: { color: '#fff' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPAN(!showPAN)} sx={{ color: '#fff' }}>
                  {showPAN ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: '#7F00FF',
            color: '#fff',
            borderRadius: '2px',
            px: 3,
            py: 1.2,
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              background: '#7F00FF',
            },
          }}
        >
          {userToEdit ? 'Update User' : 'Create User'}
        </Button>
        {userToEdit && (
          <Button variant="outlined" onClick={onCancelEdit} sx={{ color: '#fff', borderColor: '#fff' }}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}