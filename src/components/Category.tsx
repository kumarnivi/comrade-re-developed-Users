import React, { useState, useEffect } from "react";
import { 
  Box, Card, CardContent, CardMedia, Typography, Button, 
  Modal, IconButton, Tooltip, Skeleton, styled, CircularProgress 
} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/loader.css'

const StyledCard = styled(Card)(({ theme }) => ({
  width: 345,
  margin: "16px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8]
  }
}));

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 24,
  maxWidth: 600,
  maxHeight: "90vh",
  overflow: "auto",
  position: "relative"
});

interface Category {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  productCount: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/categories/categories-with-product-count")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const handleImageError = (id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/345"; 
  };

  const handleImageLoad = (id: number) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {loading ? (
        <Box className="loader-container">
                   <div className="loader"></div>
                 </Box>
      ) : (
        categories.map((category) => (
          <StyledCard key={category.id}>
            {!imageLoaded[category.id] && (
              <Skeleton animation="wave" variant="rectangular" width="100%" height={200} />
            )}
            <CardMedia
              component="img"
              image={category.image}
              alt={category.name}
              onError={(e) => handleImageError(category.id, e)}
              onLoad={() => handleImageLoad(category.id)}
              sx={{ 
                width: "100%", 
                aspectRatio: "16/9", 
                display: imageLoaded[category.id] ? "block" : "none"
              }}
            />
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocalOfferIcon />
                <Typography variant="h6" noWrap>{category.name}</Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 2
                }}
              >
                {category.description}
              </Typography>
              <Tooltip title={`${category.productCount} products available`}>
                <Typography variant="caption" color="primary" sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
                  <Inventory2Icon /> {category.productCount} items
                </Typography>
              </Tooltip>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#007074" }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsModalOpen(true);
                  }}
                >
                  View More
                </Button>
                <Button
                  variant="outlined"
                  style={{ outline: "#007074", color: "black" }}
                  onClick={() => navigate(`/products/${category.id}`)}
                >
                  Go to Products
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        ))
      )}

      {selectedCategory && (
        <StyledModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setIsModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <CardMedia
              component="img"
              image={selectedCategory.image}
              alt={selectedCategory.name}
              onError={(e) => handleImageError(selectedCategory.id, e)}
              sx={{ width: "100%", aspectRatio: "16/9", borderRadius: 1, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>{selectedCategory.name}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 2
              }}
            >
              {selectedCategory.description}
            </Typography>
          </ModalContent>
        </StyledModal>
      )}
    </Box>
  );
};

export default Category;
