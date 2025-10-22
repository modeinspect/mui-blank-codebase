"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import { useApp } from "../context/AppContext";

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export default function AccountPage() {
  const router = useRouter();
  const { user, setIsLoginModalOpen, wishlist, bookings } = useApp();

  useEffect(() => {
    if (!user) {
      setIsLoginModalOpen(true);
      router.push("/");
    }
  }, [user, setIsLoginModalOpen, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <LoginModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LoginModal />

      <main className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-12">Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                p: 4,
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar
                  src={user.avatar}
                  sx={{ width: 120, height: 120 }}
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#D1D5DB",
                      bgcolor: "#F9FAFB",
                    },
                  }}
                >
                  Edit profile
                </Button>
              </div>

              <Divider sx={{ my: 4 }} />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member since</p>
                  <p className="font-semibold text-gray-900">{user.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Trips</p>
                  <p className="font-semibold text-gray-900">{bookings.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Wishlisted</p>
                  <p className="font-semibold text-gray-900">{wishlist.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                p: 4,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-full">
                  <UserIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Personal information</h3>
                  <p className="text-gray-600 text-sm">
                    Provide personal details and how we can reach you
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Legal name</p>
                    <p className="text-sm text-gray-600">{user.name}</p>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#374151",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Email address</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#374151",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Phone number</p>
                    <p className="text-sm text-gray-600">Not provided</p>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#374151",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                p: 4,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-full">
                  <ShieldIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Login & security</h3>
                  <p className="text-gray-600 text-sm">
                    Update your password and secure your account
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#374151",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    Update
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Two-factor authentication</p>
                    <p className="text-sm text-gray-600">Not enabled</p>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#374151",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    Enable
                  </Button>
                </div>
              </div>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                p: 4,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-full">
                  <CreditCardIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Payments & payouts</h3>
                  <p className="text-gray-600 text-sm">
                    Review payments, payouts, coupons, and gift cards
                  </p>
                </div>
              </div>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "#D1D5DB",
                    bgcolor: "#F9FAFB",
                  },
                }}
              >
                Manage payment methods
              </Button>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                p: 4,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-full">
                  <BellIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
                  <p className="text-gray-600 text-sm">
                    Choose notification preferences and how you want to be contacted
                  </p>
                </div>
              </div>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "#D1D5DB",
                    bgcolor: "#F9FAFB",
                  },
                }}
              >
                Manage notifications
              </Button>
            </Card>
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
