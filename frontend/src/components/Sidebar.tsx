import { Drawer, Toolbar, Typography, Box } from '@mui/material';

export default function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold">idMatrix</Typography>
      </Box>
    </Drawer>
  );
}