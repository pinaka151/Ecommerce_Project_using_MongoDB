"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckpointPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("roop-nagar-cart");
    setCartItems(raw ? JSON.parse(raw) : []);
  }, []);

  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  const placeOrder = () => {
    alert("Order placed! This is a demo, so no actual order is created. In a real application, this would submit the order details to the server for processing.");
  };
  return (
    <main className="min-h-screen bg-red-300 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full border-8 border-red-500 opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-red-500 opacity-10"></div>

      <div className="max-w-5xl mx-auto px-6 py-4 relative z-10">
        <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-red-600 mb-4">Checkout</h1>
          <p className="text-slate-700 mb-6">
          </p>

             {/* parent of  shipping info and Order summary  */}
            <div className="w-full flex  mb-6  rounded-2xl gap-6">

              {/* Shipping Information */}
         <div className="w-full flex flex-col mb-6 rounded-2xl bg-red-100 p-5">
          
          
            <h1 className="text-2xl font-semibold text-black mb-2">Shipping Information</h1>
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Full Name</span>
                <input type="text" placeholder="Your name" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Contact Number</span>
                <input type="text" placeholder="Mobile number" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none" />
              </label>
            </div>

            <div className="gap-4">
             
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Delivery / Pickup Location</span>
                <input type="text" placeholder="Roop Nagar address" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none" />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Order Details</span>
              <textarea placeholder="Describe the item, quantity, and any special instructions." rows={4} className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none"></textarea>
            </label>

           

            <div className="flex flex-col gap-4 sm:flex-row">
              
              <Link href="/" className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                Back to home
              </Link>
            </div>
          </form>
          </div>
          {/* end of shipping info */}





          {/* order summary */}
         <div className="w-full flex flex-col mb-6 rounded-2xl bg-red-100 p-5">
            <h1 className="text-2xl font-semibold text-black mb-2">Order Summary</h1>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-sm text-slate-500">Your cart is empty.</div>
              ) : (
                cartItems.map((it) => (
                  <div key={it._id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{it.title}</div>
                      <div className="text-xs text-slate-500">Qty: {it.quantity}</div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">Items <span>{cartItems.reduce((s, it) => s + it.quantity, 0)}</span></div>
              <div className="flex items-center justify-between font-semibold text-lg mt-2">Total <span>${total.toFixed(2)}</span></div>
            </div>

            <button onClick={placeOrder} className="mt-6 w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Place Order</button>
          </div>
          </div>
         
          </div>
          {/* end of order summary */}
        </div>
    
    </main>
  );
}
