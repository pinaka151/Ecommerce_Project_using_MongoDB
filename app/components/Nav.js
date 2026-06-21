"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname() || "/";

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/cart", label: "Cart" },
    { href: "/checkpoint", label: "Checkout" },
  ];

  return (
    <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`transition ${
              active
                ? "text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-4"
                : "text-blue-300 hover:text-blue-500"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
