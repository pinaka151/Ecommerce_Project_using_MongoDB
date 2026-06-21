import { Geist, Geist_Mono } from "next/font/google";

import Nav from "./components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "Roop Nagar Bazaar",
  description: "Community marketplace for Roop Nagar",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col  text-slate-950">
        <nav className="shadow-md sticky top-0 z-50 py-6">
          <div className=" max-w-7xl mx-auto px-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-blue-400 shadow-2xl shadow-slate-950/20 ring-1 ring-white/5">
              Roop Nagar Bazaar
              <Nav />
              
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
