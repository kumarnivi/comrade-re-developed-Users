import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_public_key");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
