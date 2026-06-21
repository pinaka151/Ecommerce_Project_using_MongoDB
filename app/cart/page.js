"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const rawCart = localStorage.getItem("roop-nagar-cart");
    if (rawCart) {
      setCartItems(JSON.parse(rawCart));
    }
  }, []);

  const updateQuantity = (productId, delta) => {
    const updated = cartItems.map((item) => {
      if (item._id !== productId) return item;
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    });

    localStorage.setItem("roop-nagar-cart", JSON.stringify(updated));
    setCartItems(updated);
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("roop-nagar-cart", JSON.stringify(updated));
    setCartItems(updated);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-red-300 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full border-8 border-red-500 opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-red-500 opacity-10"></div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Cart</h1>
            <p className="text-red-100">Review your selected items before checkout.</p>
          </div>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white bg-opacity-95 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90">
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white bg-opacity-95 rounded-2xl p-10 text-center text-slate-700">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-sm">
                <div className="grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)_auto]">
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png';
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">{item.category}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{item.description?.slice(0, 120)}{item.description && item.description.length > 120 ? '...' : ''}</p>
                  </div>
                  <div className="space-y-3 text-right">
                    <p className="text-lg font-semibold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => updateQuantity(item._id, -1)} className="rounded-full border text-black border-slate-300 px-3 py-1 text-sm hover:bg-slate-100">-</button>
                      <span className="w-10 text-center text-black text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} className="rounded-full border text-black border-slate-300 px-3 py-1 text-sm hover:bg-slate-100">+</button>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-sm font-semibold text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white bg-opacity-95 rounded-2xl p-6 text-right">
              <div className="text-sm text-slate-500">Total</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">${total.toFixed(2)}</div>
              <Link href="/checkpoint" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto">
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
