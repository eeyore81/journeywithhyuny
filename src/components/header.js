import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => (
  <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e9ecef', mb: 2 }}>
    <Toolbar sx={{ gap: 1 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Journey With Hyuny
      </Typography>
      <Button component={RouterLink} to="/main" color="inherit">
        Main
      </Button>
      <Button component={RouterLink} to="/diary" color="inherit">
        Diary
      </Button>
      <Button component={RouterLink} to="/new" color="inherit">
        New
      </Button>
      <Button component={RouterLink} to="/about" color="inherit">
        About
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
