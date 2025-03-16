import { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../api";
import { CartItem } from "../types";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartItems(1)
      .then((res) => setCart(res.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleRemove = (id: number) => {
    removeFromCart(id).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h3>{item.product.name}</h3>
            <p>${item.product.price}</p>
          
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
