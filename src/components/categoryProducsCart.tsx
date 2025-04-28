import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton
  // CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import '../styles/loader.css'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${categoryId}`)
      .then((response) => {
        setProducts(response.data);
        const initialWishlist: { [key: number]: boolean } = {};
        response.data.forEach((product: Product) => {
          initialWishlist[product.id] = false;
        });
        setWishlist(initialWishlist);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleWishlist = (productId: number) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading) {
    return (
     <Box className="loader-container">
             <div className="loader"></div>
           </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2, marginTop: "100px" }}>
      <Grid container spacing={3} justifyContent="center">
        {products.length > 0 ? (
          products.map((product) => (
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
                  image={product?.images[0]}
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
                  {wishlist[product.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    LKR {product.price}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" fullWidth>
                      Quick View
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
            No products available in this category.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductByCategory;
