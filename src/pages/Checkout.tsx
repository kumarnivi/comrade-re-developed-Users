import { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { getCartItems, createCheckoutSession } from "../api";
import { CartItem } from "../types";

const Checkout: React.FC = () => {
  const stripe = useStripe();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartItems(1)
      .then((res) => setCart(res.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleCheckout = async () => {
    const { data } = await createCheckoutSession(cart);
    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((item) => (
        <p key={item.id}>
          {item.product.name} - ${item.product.price}
        </p>
      ))}
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Checkout;
