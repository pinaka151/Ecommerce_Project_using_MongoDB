"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [goCartHighlight, setGoCartHighlight] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        const found = data.find((item) => item._id === id);
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const rawCart = localStorage.getItem("roop-nagar-cart");
    const current = rawCart ? JSON.parse(rawCart) : [];
    setIsInCart(current.some((item) => item._id === product._id));
  }, [product]);

  const persistCart = (cartItems) => {
    localStorage.setItem("roop-nagar-cart", JSON.stringify(cartItems));
  };

  const addToCart = () => {
    if (!product) return;
    const rawCart = localStorage.getItem("roop-nagar-cart");
    const current = rawCart ? JSON.parse(rawCart) : [];
    const existing = current.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }

    persistCart(current);
    setIsInCart(true);
    setGoCartHighlight(true);
    setCartMessage(`${product.title} added to cart.`);
    setTimeout(() => setCartMessage(""), 3000);
    setTimeout(() => setGoCartHighlight(false), 1400);
  };

  const removeFromCart = () => {
    if (!product) return;
    const rawCart = localStorage.getItem("roop-nagar-cart");
    const current = rawCart ? JSON.parse(rawCart) : [];
    const updated = current.filter((item) => item._id !== product._id);

    persistCart(updated);
    setIsInCart(false);
    setCartMessage(`${product.title} removed from cart.`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (!product) return <div className="p-8 text-center text-slate-600">Product not found.</div>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {cartMessage && <div className="mb-4 rounded-xl bg-emerald-100 px-5 py-4 text-sm text-pink-900">{cartMessage}</div>}
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">{product.title}</h1>
            <p className="mt-3 text-slate-600">{product.category}</p>
            <p className="mt-5 text-2xl font-semibold text-indigo-600">{product.price?.toFixed ? `$${product.price.toFixed(2)}` : `$${product.price}`}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Product details</h2>
            <p className="mt-3 text-slate-700 leading-7">{product.description}</p>
          </div>

          <div className="flex flex-col mx-7 gap-4 sm:flex-row">
            <button
              onClick={isInCart ? removeFromCart : addToCart}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition ${isInCart ? "bg-red-600 text-white hover:bg-red-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              {isInCart ? "Remove" : "Add to Cart"}
            </button>
            <Link
              href="/cart"
              className={`inline-flex items-center justify-center rounded-full bg-purple-300 border px-6 py-3 text-sm font-semibold transition ${goCartHighlight ? "border-blue-400 bg-emerald-100 text-emerald-900 shadow-[0_0_0_4px_rgba(34,197,94,0.15)] animate-pulse" : "border-slate-100 text-blue-700 hover:bg-slate-100"}`}
            >
              Go to cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
