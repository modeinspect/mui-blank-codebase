"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import { useApp } from "../context/AppContext";
import { properties as allProperties } from "../data/properties";

const HeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function WishlistPage() {
  const router = useRouter();
  const { user, wishlist, toggleWishlist, setIsLoginModalOpen } = useApp();

  useEffect(() => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  }, [user, setIsLoginModalOpen]);

  const wishlistProperties = allProperties.filter((p) => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <LoginModal />
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-20 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Please log in to view your wishlist</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LoginModal />

      <main className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Wishlist</h1>
        <p className="text-gray-600 mb-12">Your favorite places to stay</p>

        {wishlistProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6 text-gray-400 flex justify-center">
              <HeartIcon />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              As you search, click the heart icon to save your favorite places to stay
            </p>
            <Button
              onClick={() => router.push("/")}
              sx={{
                bgcolor: "#FF385C",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#E31C5F" },
              }}
            >
              Start exploring
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {wishlistProperties.map((property) => (
              <div key={property.id} className="group cursor-pointer" onClick={() => router.push(`/property/${property.id}`)}>
                {/* Image Container */}
                <div className="relative aspect-square mb-3 overflow-hidden rounded-xl">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(property.id);
                    }}
                    className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FF385C"
                      stroke="#FF385C"
                      strokeWidth="2"
                      className="drop-shadow-lg"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Property Info */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
                      {property.location}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <StarIcon />
                      <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{property.distance}</p>
                  <p className="text-sm text-gray-600">{property.date}</p>
                  <p className="text-[15px] mt-1">
                    <span className="font-semibold text-gray-900">${property.price}</span>
                    <span className="text-gray-600 font-normal"> night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2024 Wanderbnb, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:underline">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:underline">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
