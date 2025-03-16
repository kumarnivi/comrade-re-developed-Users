import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link, styled } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Phone, Mail, PinDrop } from "@mui/icons-material";
import Logo from '../assets/logo-comrade.png'

const StyledFooter = styled(Box)<{ component?: React.ElementType }>(({
    theme
  }) => ({
    backgroundColor: "#121212",
    color: "#E0E0E0",
    padding: theme.spacing(6, 0),
    marginTop: "auto"
  }));

const StyledLink = styled(Link)({
  color: "#B0B0B0",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#FDFBEE"
  }
});

const SocialIcon = styled(IconButton)({
  color: "#E0E0E0",
  transition: "transform 0.3s ease, color 0.3s ease",
  "&:hover": {
    color: "#FDFBEE",
    transform: "scale(1.1)"
  }
});

const Footer = () => {
  const navigationLinks = {
    About: ["Company", "Team", "Careers", "Blog"],
    Services: ["Consulting", "Development", "Design", "Marketing"],
   
  };

  return (
    <StyledFooter component="footer" as = "footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo Section */}
          <Grid item xs={12} md={4}>
            <Box mb={2}>
              <img
                src={Logo}
                alt="Company Logo"
                style={{ height: 100, marginBottom: 16 }}
                onError={(e:any) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1563694983011-6f4d90358083";
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
            The tea company specializes in sourcing and
             blending premium loose-leaf teas from around the world.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {Object.entries(navigationLinks).map(([category, links]) => (
                <Grid item xs={6} key={category}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#57B4BA" }}>
                    {category}
                  </Typography>
                  {links.map((link) => (
                    <Box key={link} mb={1}>
                      <StyledLink href="#">{link}</StyledLink>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, color: "#57B4BA" }}>
              Contact Us
            </Typography>
            <Box mb={2} display="flex" alignItems="center">
              <Phone style={{ marginRight: 8 }} />
              <StyledLink href="tel:+1234567890">+1 (234) 567-890</StyledLink>
            </Box>
            <Box mb={2} display="flex" alignItems="center">
              <Mail style={{ marginRight: 8 }} />
              <StyledLink href="mailto:info@company.com">info@company.com</StyledLink>
            </Box>
            <Box mb={3} display="flex" alignItems="center">
              <PinDrop style={{ marginRight: 8 }} />
              <Typography variant="body2">
                123 Business Street, Suite 100
                <br />
                New York, NY 10001
              </Typography>
            </Box>

            {/* Social Media Icons */}
            <Box>
              <SocialIcon aria-label="Facebook">
                <Facebook />
              </SocialIcon>
              <SocialIcon aria-label="Twitter">
                <Twitter />
              </SocialIcon>
              <SocialIcon aria-label="Instagram">
                <Instagram />
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn">
                <LinkedIn />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} pt={3} borderTop={1} borderColor="#333333">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} The Comrade. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;