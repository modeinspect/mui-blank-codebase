"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import { useApp } from "./context/AppContext";
import { properties as allProperties } from "./data/properties";

// Category data
const categories = [
  { id: 1, label: "Amazing views", icon: "🏔️" },
  { id: 2, label: "Lakefront", icon: "🏖️" },
  { id: 3, label: "Beachfront", icon: "🌊" },
  { id: 4, label: "Cabins", icon: "🏕️" },
  { id: 5, label: "Trending", icon: "🔥" },
  { id: 6, label: "Countryside", icon: "🌾" },
  { id: 7, label: "Design", icon: "✨" },
  { id: 8, label: "Tiny homes", icon: "🏠" },
  { id: 9, label: "Tropical", icon: "🌴" },
  { id: 10, label: "Islands", icon: "🏝️" },
];

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wishlist, toggleWishlist } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    const category = searchParams.get("category");

    let filtered = allProperties;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.location.toLowerCase().includes(lowerQuery) ||
          p.title.toLowerCase().includes(lowerQuery) ||
          p.category?.toLowerCase().includes(lowerQuery)
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
      setSelectedCategory(category);
    }

    setFilteredProperties(filtered);
  }, [searchParams]);

  const handleCategoryClick = (category: typeof categories[0]) => {
    if (selectedCategory === category.label) {
      setSelectedCategory(null);
      setFilteredProperties(allProperties);
      router.push("/");
    } else {
      setSelectedCategory(category.label);
      const filtered = allProperties.filter((p) => p.category === category.label);
      setFilteredProperties(filtered);
      router.push(`/?category=${encodeURIComponent(category.label)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LoginModal />

      {/* Categories */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100">
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`flex flex-col items-center gap-2 pb-3 px-2 min-w-fit border-b-2 transition-all ${
                  selectedCategory === category.label
                    ? "border-gray-800 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-80 hover:border-gray-200"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No properties found</h2>
            <p className="text-gray-600 mb-8">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setFilteredProperties(allProperties);
                router.push("/");
              }}
              className="px-6 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {selectedCategory && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedCategory} properties
                </h2>
                <p className="text-gray-600 mt-1">{filteredProperties.length} stays</p>
              </div>
            )}
            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={wishlist.includes(property.id)}
                  onToggleFavorite={() => toggleWishlist(property.id)}
                  onClickCard={() => router.push(`/property/${property.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">AirCover</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Safety information</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Wanderbnb.org</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Support Afghan refugees</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Combating discrimination</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Hosting</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Try hosting</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">AirCover for Hosts</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Explore hosting resources</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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

// Property Card Component
interface PropertyCardProps {
  property: typeof allProperties[0];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClickCard: () => void;
}

function PropertyCard({ property, isFavorite, onToggleFavorite, onClickCard }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClickCard}>
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
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#FF385C" : "none"}
            stroke={isFavorite ? "#FF385C" : "white"}
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
  );
}
