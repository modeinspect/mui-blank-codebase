"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Property {
  id: number;
  image: string;
  images?: string[];
  title: string;
  location: string;
  distance: string;
  date: string;
  price: number;
  rating: number;
  reviews: number;
  host?: {
    name: string;
    avatar: string;
    joinedDate: string;
    isSuperhost: boolean;
  };
  description?: string;
  guests?: number;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
  category?: string;
}

export interface Booking {
  id: string;
  propertyId: number;
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  wishlist: number[];
  toggleWishlist: (propertyId: number) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  searchParams: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  setSearchParams: (params: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wanderbnb_wishlist");
    const savedBookings = localStorage.getItem("wanderbnb_bookings");
    const savedUser = localStorage.getItem("wanderbnb_user");

    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("wanderbnb_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("wanderbnb_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("wanderbnb_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("wanderbnb_user");
    }
  }, [user]);

  const toggleWishlist = (propertyId: number) => {
    setWishlist((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        wishlist,
        toggleWishlist,
        bookings,
        addBooking,
        isLoginModalOpen,
        setIsLoginModalOpen,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
