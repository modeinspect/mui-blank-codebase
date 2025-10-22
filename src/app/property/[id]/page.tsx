"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Navbar from "../../components/Navbar";
import LoginModal from "../../components/LoginModal";
import { useApp } from "../../context/AppContext";
import { getPropertyById } from "../../data/properties";

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#FF385C" : "none"} stroke={filled ? "#FF385C" : "currentColor"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { wishlist, toggleWishlist, user, setIsLoginModalOpen, addBooking } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const property = getPropertyById(parseInt(resolvedParams.id));

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-20 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Property not found</h1>
          <Button
            onClick={() => router.push("/")}
            sx={{
              bgcolor: "#FF385C",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "#E31C5F" },
            }}
          >
            Back to home
          </Button>
        </div>
        <LoginModal />
      </div>
    );
  }

  const isFavorite = wishlist.includes(property.id);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const days = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days * property.price : 0;
  };

  const handleReserve = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      property,
      checkIn,
      checkOut,
      guests,
      totalPrice: calculateTotal(),
      status: "upcoming" as const,
      bookingDate: new Date().toISOString(),
    };

    addBooking(booking);
    router.push("/trips");
  };

  const totalNights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar showSearch={false} />
      <LoginModal />

      <main className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-6">
        {/* Title and Actions */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <StarIcon />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-gray-600">({property.reviews} reviews)</span>
              </div>
              <span className="text-gray-600">{property.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ShareIcon />
                <span className="text-sm font-medium underline">Share</span>
              </button>
              <button
                onClick={() => toggleWishlist(property.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HeartIcon filled={isFavorite} />
                <span className="text-sm font-medium underline">Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-xl overflow-hidden mb-12">
          <div className="col-span-2 row-span-2 cursor-pointer" onClick={() => setSelectedImage(0)}>
            <img
              src={property.images?.[0] || property.image}
              alt={property.title}
              className="w-full h-full object-cover hover:brightness-95 transition-all"
            />
          </div>
          {property.images?.slice(1, 5).map((img, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => setSelectedImage(idx + 1)}>
              <img
                src={img}
                alt={`${property.title} ${idx + 2}`}
                className="w-full h-full object-cover hover:brightness-95 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Hosted by {property.host?.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>{property.guests} guests</span>
                    <span>·</span>
                    <span>{property.bedrooms} bedrooms</span>
                    <span>·</span>
                    <span>{property.beds} beds</span>
                    <span>·</span>
                    <span>{property.baths} baths</span>
                  </div>
                </div>
                <Avatar
                  src={property.host?.avatar}
                  sx={{ width: 64, height: 64 }}
                />
              </div>
            </div>

            {/* Highlights */}
            {property.host?.isSuperhost && (
              <div className="py-6 border-b border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {property.host.name} is a Superhost
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Superhosts are experienced, highly rated hosts who are committed to providing great stays.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="py-6 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-6">
                <StarIcon />
                <span className="text-xl font-semibold">{property.rating}</span>
                <span className="text-xl text-gray-600">· {property.reviews} reviews</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={`https://i.pravatar.cc/150?img=${idx + 20}`} />
                      <div>
                        <p className="font-semibold text-gray-900">Guest Name</p>
                        <p className="text-sm text-gray-600">March 2024</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Amazing place! The host was very welcoming and the property exceeded our expectations. 
                      Would definitely recommend and stay again.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-semibold text-gray-900">${property.price}</span>
                  <span className="text-gray-600">night</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-600">· {property.reviews} reviews</span>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-px border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-white p-3 border-r border-b border-gray-300">
                    <label className="text-xs font-semibold text-gray-900 block mb-1">CHECK-IN</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm border-none outline-none"
                    />
                  </div>
                  <div className="bg-white p-3 border-b border-gray-300">
                    <label className="text-xs font-semibold text-gray-900 block mb-1">CHECKOUT</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm border-none outline-none"
                    />
                  </div>
                  <div className="bg-white p-3 col-span-2">
                    <label className="text-xs font-semibold text-gray-900 block mb-1">GUESTS</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full text-sm border-none outline-none"
                    >
                      {Array.from({ length: property.guests || 1 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} guest{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  fullWidth
                  onClick={handleReserve}
                  sx={{
                    bgcolor: "#FF385C",
                    color: "white",
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#E31C5F" },
                  }}
                >
                  Reserve
                </Button>
              </div>

              {totalNights > 0 && (
                <>
                  <p className="text-center text-sm text-gray-600 mb-4">You won't be charged yet</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="underline">${property.price} x {totalNights} nights</span>
                      <span>${property.price * totalNights}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="underline">Cleaning fee</span>
                      <span>$50</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="underline">Service fee</span>
                      <span>${Math.round(property.price * totalNights * 0.14)}</span>
                    </div>
                    <Divider />
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal() + 50 + Math.round(property.price * totalNights * 0.14)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-12 py-12 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Where you'll be</h3>
          <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Map of {property.location}</p>
          </div>
        </div>
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
