import axios from "axios";
import { Product, CartItem, CheckoutSession } from "./types";



const API = axios.create({ baseURL: "http://localhost:5000" });

export const getProducts = () => API.get<Product[]>("/products");
export const addToCart = (data: { userId: number; productId: number; quantity: number }) =>
  API.post("/cart", data);
export const getCartItems = (userId: number) => API.get<CartItem[]>(`/cart/${userId}`);
export const removeFromCart = (id: number) => API.delete(`/cart/${id}`);
export const createCheckoutSession = (cartItems: CartItem[]) =>
  API.post<CheckoutSession>("/payment/create-checkout-session", { cartItems });
export const getCategories = () => API.get<{ id: number; name: string, description:string, image: any }[]>("/categories");