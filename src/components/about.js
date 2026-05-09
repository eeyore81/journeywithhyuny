import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUs = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      About
    </Typography>
    <Typography>
      Personal diary application powered by Firebase and a GAS proxy.
    </Typography>
  </Box>
);

export default AboutUs;
