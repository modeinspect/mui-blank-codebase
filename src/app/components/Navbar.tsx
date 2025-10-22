"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useApp } from "../context/AppContext";

// SVG Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

interface NavbarProps {
  showSearch?: boolean;
}

export default function Navbar({ showSearch = true }: NavbarProps) {
  const router = useRouter();
  const { user, setUser, setIsLoginModalOpen, wishlist, bookings } = useApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchLocation, setSearchLocation] = useState("");

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleUserMenuClose();
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    handleUserMenuClose();
  };

  const handleSearch = () => {
    if (searchLocation.trim()) {
      router.push(`/?search=${encodeURIComponent(searchLocation)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[2520px] mx-auto px-6 sm:px-10 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
            <h1 className="text-2xl font-semibold text-[#FF385C] tracking-tight">
              wanderbnb
            </h1>
          </div>

          {/* Search Bar - Center */}
          {showSearch && (
            <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
              <div className="w-full">
                <div className="flex items-center gap-3 px-6 py-3 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full text-sm font-medium text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
                    />
                  </div>
                  <div className="h-6 w-px bg-gray-200" />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Any week"
                      className="w-full text-sm font-medium text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
                    />
                  </div>
                  <div className="h-6 w-px bg-gray-200" />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Add guests"
                      className="w-full text-sm font-medium text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="p-2.5 bg-[#FF385C] rounded-full hover:bg-[#E31C5F] transition-colors"
                  >
                    <SearchIcon />
                    <span className="text-white sr-only">Search</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="text"
              className="hidden lg:block text-sm font-medium text-gray-800 normal-case px-4 py-2 rounded-full hover:bg-gray-50"
            >
              Wanderbnb your home
            </Button>
            <IconButton size="small" className="text-gray-700 hover:bg-gray-50">
              <GlobeIcon />
            </IconButton>
            <div
              className="flex items-center gap-3 px-3 py-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow cursor-pointer"
              onClick={handleUserMenuOpen}
            >
              <MenuIcon />
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: user ? "#FF385C" : "#6B7280" }}
                src={user?.avatar}
                className="text-white text-sm"
              >
                {user ? user.name.charAt(0).toUpperCase() : "M"}
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          },
        }}
      >
        {user ? (
          [
            <MenuItem key="trips" onClick={() => { router.push("/trips"); handleUserMenuClose(); }}>
              <span className="text-sm font-medium">Trips</span>
              {bookings.length > 0 && (
                <span className="ml-auto bg-[#FF385C] text-white text-xs rounded-full px-2 py-0.5">
                  {bookings.length}
                </span>
              )}
            </MenuItem>,
            <MenuItem key="wishlist" onClick={() => { router.push("/wishlist"); handleUserMenuClose(); }}>
              <span className="text-sm font-medium">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="ml-auto bg-[#FF385C] text-white text-xs rounded-full px-2 py-0.5">
                  {wishlist.length}
                </span>
              )}
            </MenuItem>,
            <MenuItem key="account" onClick={() => { router.push("/account"); handleUserMenuClose(); }}>
              <span className="text-sm font-medium">Account</span>
            </MenuItem>,
            <div key="divider" className="border-t border-gray-100 my-1" />,
            <MenuItem key="logout" onClick={handleLogout}>
              <span className="text-sm font-medium">Log out</span>
            </MenuItem>,
          ]
        ) : (
          [
            <MenuItem key="login" onClick={handleLogin}>
              <span className="text-sm font-semibold">Log in</span>
            </MenuItem>,
            <MenuItem key="signup" onClick={handleLogin}>
              <span className="text-sm font-medium">Sign up</span>
            </MenuItem>,
          ]
        )}
      </Menu>
    </nav>
  );
}
