import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const active = 'Home';
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Home', icon: <HomeRoundedIcon />, path: '/' },
    { label: 'Movies', icon: <MovieRoundedIcon />, path: '/movies'},
  ];

  const otherItems = [
    { label: 'Settings', icon: <SettingsRoundedIcon /> },
    { label: 'Help', icon: <HelpRoundedIcon /> },
  ];

  return (
    <Box
      sx={{
        position: 'fixed', // Ensures it sticks to the side even when scrolling
    top: 0,            // Keeps it at the top of the viewport
    left: 0,           // Keeps it at the left side of the viewport
    width: 200,        // Sidebar width
    height: '100vh',   // Full height of the screen
    bgcolor: '#1c1c1c',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    zIndex: 10,
      }}
    >
      <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
        Menu
      </Typography>

      <List>
  {navItems.map((item) => (
    <ListItem
      key={item.label}
      component={Link}
      to={item.path}
      sx={{
        color: currentPath === item.path ? 'white' : 'gray',
        bgcolor: currentPath === item.path ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'rgba(255, 0, 0, 0.1)',
        },
        textDecoration: 'none',
      }}
      button
    >
      <ListItemIcon
        sx={{
          color: currentPath === item.path ? '#e50914' : 'gray',
          minWidth: 36,
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItem>
  ))}
</List>

      <Divider sx={{ borderColor: '#444', my: 1 }} />

      <List>
        {otherItems.map((item) => (
          <ListItem
            key={item.label}
            sx={{
              color: 'gray',
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
            button
          >
            <ListItemIcon
              sx={{
                color: 'gray',
                minWidth: 36,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;