import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createUser } from '../api';
import type { User } from '../types';

interface Props {
  onUserCreated: () => void;
}

export default function UserForm({ onUserCreated }: Props) {
  const [form, setForm] = useState<Omit<User, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    pan_number: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(form);
      onUserCreated();
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        pan_number: '',
      });
    } catch {
      alert('Error creating user.');
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
          value={form.pan_number}
          onChange={handleChange}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
      </Box>

      <Button
        variant="contained"
        type="submit"
        sx={{
          mt: 3,
          background: '#7F00FF',
          color: '#fff',
          borderRadius: '2px',
          px: 3,
          py: 1.5,
          fontSize: '1rem',
          textTransform: 'none',
          '&:hover': {
            transform: 'scale(1.05)',
            background: '#7F00FF',
          },
        }}
      >
        Create User
      </Button>
    </Box>
  );
}