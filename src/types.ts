export interface Product {
    reviews: any;
    categoryId: any;
    // stock: string;
    // category: string;
    id: number;
    name: string;
    price: number;
    images: string[];
    // stock: number;
  }
  
  export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }
  
  export interface CheckoutSession {
    id: string;
  }

  

  