"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import { useApp } from "../context/AppContext";

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function TripsPage() {
  const router = useRouter();
  const { user, bookings, setIsLoginModalOpen } = useApp();

  useEffect(() => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  }, [user, setIsLoginModalOpen]);

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const pastBookings = bookings.filter((b) => b.status === "completed");

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <LoginModal />
        <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20 py-20 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Please log in to view your trips</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LoginModal />

      <main className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Trips</h1>
        <p className="text-gray-600 mb-12">Your travel plans and past adventures</p>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <CalendarIcon />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No trips yet</h2>
            <p className="text-gray-600 mb-8">
              Time to dust off your bags and start planning your next adventure
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
              Start searching
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Upcoming Trips */}
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Upcoming trips ({upcomingBookings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingBookings.map((booking) => (
                    <Card
                      key={booking.id}
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                      onClick={() => router.push(`/property/${booking.propertyId}`)}
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={booking.property.image}
                          alt={booking.property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {booking.property.location}
                          </h3>
                          <p className="text-sm text-gray-600">{booking.property.title}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <CalendarIcon />
                            <span>
                              {new Date(booking.checkIn).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                              {" - "}
                              {new Date(booking.checkOut).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <UsersIcon />
                            <span>{booking.guests} guest{booking.guests > 1 ? "s" : ""}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total price</span>
                            <span className="text-lg font-semibold text-gray-900">
                              ${booking.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Trips */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Where you've been ({pastBookings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastBookings.map((booking) => (
                    <Card
                      key={booking.id}
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                      onClick={() => router.push(`/property/${booking.propertyId}`)}
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={booking.property.image}
                          alt={booking.property.title}
                          className="w-full h-full object-cover grayscale-[30%]"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {booking.property.location}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{booking.property.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.checkIn).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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
