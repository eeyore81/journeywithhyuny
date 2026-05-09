import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const AboutUs = () => (
  <Box sx={{ p: 2, pb: 6 }}>
    <Typography variant="h4" gutterBottom textAlign="center">
      Our Family
    </Typography>

    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      {['/images/cat.jpg', '/images/cat.jpg', '/images/cat.jpg'].map((src, idx) => (
        <Box
          key={`family-${idx}`}
          component="img"
          src={src}
          alt={`family-${idx + 1}`}
          sx={{
            width: { xs: '100%', sm: 360, md: 280 },
            maxWidth: 380,
            borderRadius: 2,
            objectFit: 'cover',
          }}
        />
      ))}
    </Stack>
  </Box>
);

export default AboutUs;
