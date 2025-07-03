import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  pan_number: string;
}

interface Props {
  users: User[];
  onUserDeleted: (id: number) => void;
}

export default function UserTable({ users, onUserDeleted }: Props) {
  const rows = users.map((user, index) => ({
    ...user,
    srNo: index + 1,
  }));

  const columns: GridColDef[] = [
    { field: 'srNo', headerName: 'S.No.', width: 80 },
    { field: 'first_name', headerName: 'First Name', flex: 1 },
    { field: 'last_name', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'phone_number', headerName: 'Phone', flex: 1 },
    { field: 'pan_number', headerName: 'PAN', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions', // ✅ MUST be exactly "actions"
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: '#f44336' }} />}
          label="Delete"
          onClick={() => {
            if (window.confirm('Delete this user?')) {
              onUserDeleted(params.row.id);
            }
          }}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
}