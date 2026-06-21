"use client"
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [querry, setQuerry] = useState("");
  const [loading, setLoading] = useState(true);
  
 

  useEffect(() => {
      fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

   const handleSearch = async() => {
    const res = await fetch("/api/AI-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: querry }),
    });
    const data = await res.json();
    console.log(data);
    setProducts(data.products || []);
    setKeywords(data.keywords || []);
  }

  if (loading) return <div className="p-8 text-center">Loading products...</div>;

  return (
    <main className="max-w-7xl bg-[#6b8b6b] rounded-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>
<div className="my-2">
         <input onChange={(e) => setQuerry(e.target.value)} value={querry} type="Search" placeholder="Search products..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none block w-full focus:ring-2 focus:ring-indigo-500" />

       <button className="bg-purple-600 text-white  px-10 py-2 rounded-md mx-1 my-5 hover:bg-purple-500" onClick={handleSearch}>Search</button>

</div>
      
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}

        {Array.isArray(products) && products.map((p) => (
          <Link href={`/product/${p._id}`} key={p._id}>
            <div
              className="group relative bg-white rounded-lg shadow transition-transform transform hover:shadow-lg hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="h-48 bg-gray-100 overflow-hidden cursor-pointer">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />

                <div className="absolute inset-0 flex items-end justify-between p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black bg-opacity-60 text-white text-sm font-semibold px-2 py-1 rounded">
                    {p.price?.toFixed ? `$${p.price.toFixed(2)}` : `$${p.price}`}
                  </span>
                  <button className="pointer-events-auto bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-500">View</button>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold  mb-1 text-blue-300">{p.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{p.category}</p>
                <p className="text-sm text-gray-700 mb-3">{p.description?.slice(0, 100)}{p.description && p.description.length > 100 ? '...' : ''}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-600">{p.price?.toFixed ? `$${p.price.toFixed(2)}` : `$${p.price}`}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
