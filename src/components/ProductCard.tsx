import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getProducts, getCategories } from "../api"; // Import API functions
import { Product } from "../types";
import "../styles/loader.css"; // Import loader styles
import Heading from "./heading";

const Products = () => {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>( []);
   const [headingText, setHeadingText] = useState('Products')
  

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Show loader before fetching
    getProducts()
      .then((res) => {
        setProducts(res.data);
        const initialWishlist: { [key: number]: boolean } = {};
        res.data.forEach((product: Product) => {
          initialWishlist[product.id] = false;
        });
        setWishlist(initialWishlist);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false)); // Hide loader after fetching

    getCategories()
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleWishlist = (productId: number) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (

    <>
  

      <Box sx={{ flexGrow: 1, padding: 2, marginTop: "100px" }}>
      <Heading  text={headingText} width="300px" />
      {loading ? (
        <Box className="loader-container">
          <div className="loader"></div>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  width="100%"
                  image={product.images[0]}
                  alt={product.name}
                  onError={(e: any) =>
                    (e.target.src =
                      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7")
                  }
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  }}
                  onClick={() => handleWishlist(product.id)}
                >
                  {wishlist[product.id] ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getCategoryName(product.categoryId)}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    LKR {product.price}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setOpenModal(product.id)}
                    >
                      Quick View
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Quick View Modal */}
      <Modal
        open={openModal !== null}
        onClose={() => setOpenModal(null)}
        aria-labelledby="product-modal"
        aria-describedby="product-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 2,
          }}
        >
          {openModal !== null && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                {products.find((p) => p.id === openModal)?.name}
              </Typography>
              <CardMedia
                component="img"
                height="300"
                image={products.find((p) => p.id === openModal)?.images[0]}
                alt={products.find((p) => p.id === openModal)?.name}
                sx={{ borderRadius: 1, mb: 2 }}
              />
              <Typography variant="body1" paragraph>
                {products.find((p) => p.id === openModal)?.description}
              </Typography>
              <Button variant="contained" onClick={() => setOpenModal(null)}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
    </>

  
  );
};

export default Products;
