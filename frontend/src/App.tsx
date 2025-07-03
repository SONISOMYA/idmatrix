import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material';
import { getUsers, deleteUser, uploadUsers } from './api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import type { User } from './types';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadUsers(file);
      alert('✅ Bulk upload successful!');
      fetchUsers();
    } catch (err: any) {
      const errors = await err.response?.json();
      alert('❌ Errors:\n' + (errors?.detail?.join('\n') || err.message));
    } finally {
      e.target.value = '';
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ bgcolor: '#0d0d0d', minHeight: '100vh', color: '#fff' }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 4,
          }}
        >
          <Typography variant="h4">🧩 idMatrix — User Management</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#7F00FF' }}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Close Form' : 'Add User'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Excel
            </Button>
            <input
              type="file"
              accept=".xlsx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleBulkUpload}
            />
            <Button
              variant="outlined"
              href="http://localhost:8000/download-template"
            >
              Download Template
            </Button>
          </Box>
        </Box>

        {showForm && (
          <Box sx={{ mb: 4 }}>
            <UserForm onUserCreated={fetchUsers} />
          </Box>
        )}

        <UserTable users={users} onUserDeleted={handleDelete} />
      </Container>
    </Box>
  );
}