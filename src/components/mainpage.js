import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MainPage = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      Main Page
    </Typography>
    <Typography sx={{ mb: 2 }}>
      Welcome back. Open your diary list or write a new entry.
    </Typography>
    <Stack direction="row" spacing={1}>
      <Button component={RouterLink} to="/diary" variant="contained">
        Open Diary
      </Button>
      <Button component={RouterLink} to="/new" variant="outlined">
        Write New
      </Button>
    </Stack>
  </Box>
);

export default MainPage;
