import React from "react";
// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
// import { CardMedia } from '@mui/material';
import logo from '../assets/logo-comrade.png'

const Navbar = () => {
  const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };
// main part of  handle mobile menu
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{ backgroundColor: "transparent", }}>
        <Toolbar style={{ backgroundColor: "rgb(18 139 133 / 96%)" }}>
         
          {/* Brand Name */}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
           <img src={logo} alt="Logo" style={{ height: 55, marginRight: 10 }} />
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuItem component={Link} to="/">Home</MenuItem>
            <MenuItem component={Link} to="/about">About</MenuItem>
            <MenuItem component={Link} to="/products">Products</MenuItem>
            <MenuItem component={Link} to="/contact">Contact</MenuItem>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icons */}
          <IconButton size="large" color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
           {/* Mobile Menu Icon */}
           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit" onClick={handleMobileMenuOpen}>
            <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuItem component={Link} to="/">Home</MenuItem>
        <MenuItem component={Link} to="/about">About</MenuItem>
        <MenuItem component={Link} to="/products">Products</MenuItem>
        <MenuItem component={Link} to="/contact">Contact</MenuItem>
        <MenuItem component={Link} to="/">
        <IconButton size="large" color="inherit" >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem component={Link} to="/">
        <IconButton size="large" color="inherit" >
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
