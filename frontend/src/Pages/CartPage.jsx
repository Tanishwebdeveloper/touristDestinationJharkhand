import React from "react";
import CartFilter from "../Components/OrderPageComponent/CartFilter";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-10">
        <CartFilter />
      </main>
    </div>
  );
}