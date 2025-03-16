import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../api";
import { Product } from "../types";
import { Card, CardContent, CardMedia, Button, Chip, Typography, Link as MuiLink, Box, Rating } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Products.css"; // Import your custom loader styles

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data);
        const categoryMap = categoriesRes.data.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {} as Record<number, string>);
        setCategories(categoryMap);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h2>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <div className="loader"></div> {/* Custom Loader */}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 2,
            justifyContent: "space-between",
            alignItems:"center"
           
          }}
        >
          {products.map((product) => (
            <Card key={product.id} sx={{ width: 320, maxWidth: "100%", boxShadow: 3, borderRadius: 2, }}>
              <CardMedia
                component="img"
                height="190"
                image={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                sx={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
              <CardContent>
                <Typography variant="caption" color="textSecondary">
                  {categories[product.categoryId] || "Unknown Category"}
                </Typography>
                <MuiLink
                  href="#"
                  color="inherit"
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center", fontWeight: 600, fontSize: "1.1rem" }}
                >
                  {product.name} <ArrowOutwardIcon sx={{ ml: 0.5, fontSize: "1rem" }} />
                </MuiLink>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Rating value={getAverageRating(product.reviews)} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({product.reviews?.length || 0})
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                  ${product.price}
                  {product.reviews?.length > 3 && (
                    <Chip label="Best Seller" color="success" size="small" sx={{ ml: 1 }} />
                  )}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: "center", pb: 2, px: 2 }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="large" fullWidth>
                    View Product
                  </Button>
                </Link>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Products;
