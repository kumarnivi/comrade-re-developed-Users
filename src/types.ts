export interface Product {
  categoryId: number;
  id: number;
  name: string;
  category: { id: number; name: string; description: string; image: string };
  price: number;
  description: string;
  images: string[];
  stock: number;
  reviews: { id: number; productId: number; rating: number; comment: string }[];
}

  
  export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }
  
  export interface CheckoutSession {
    id: string;
  }

  

  