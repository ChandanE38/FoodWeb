import React, { useState ,createContext} from "react";
import { SkillList } from './component';

// Mock data for items available on the homepage
const items = SkillList;

const CartAppFooter = () => {

  const [cart, setCart] = useState([]);
  // Add item to cart or increase quantity if it already exists
  const addToCart = (item) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
  };


  // Decrease the quantity of an item or remove it from the cart if quantity is 1
  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      } else {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    });
  };


  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
  }; 

  return (
    <div style={{ padding: "20px" }}>

      <h1>Homepage</h1>
      <div>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <span>{item.name} - {item.price}Rs</span>
            <button onClick={() => addToCart(item)} style={{ marginLeft: "10px" }}>
              Add to Cart
            </button>
          </div>
        ))}

      </div>

      <h2>Cart</h2>

      {cart.length > 0 ? (
        <div>
          {cart.map((cartItem) => (
            <div key={cartItem.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <img src={cartItem.image} alt={cartItem.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
              <span>
                {cartItem.name} - {cartItem.price}Rs x {cartItem.quantity}
              </span>
              <button
                onClick={() => decreaseQuantity(cartItem.id)}
                style={{ marginLeft: "10px" }}
              >
                -
              </button>
              <button
                onClick={() => addToCart(cartItem)}
                style={{ marginLeft: "5px" }}
              >
                +
              </button>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <h3>Total Amount: {calculateTotal()}Rs</h3>
            <button style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>Pay</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};


export default CartAppFooter;