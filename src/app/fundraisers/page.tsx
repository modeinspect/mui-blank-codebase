"use client";

import { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FundraiserCard from "@/components/FundraiserCard";
import { fundraisers, categories } from "@/data/mockData";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FundraisersContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return fundraisers.filter((f) => {
      const matchesSearch =
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.organizer.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background-default">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 py-8 w-full flex-1">
        <Typography variant="h4" className="font-bold mb-2">
          Explore Fundraisers
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-6">
          Find a cause that speaks to you and make a difference today
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search fundraisers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Chip
            label="All"
            variant={selectedCategory === "All" ? "filled" : "outlined"}
            color={selectedCategory === "All" ? "primary" : "default"}
            onClick={() => setSelectedCategory("All")}
            clickable
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={() => setSelectedCategory(cat)}
              clickable
            />
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No fundraisers found matching your criteria.
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Try adjusting your search or category filter.
            </Typography>
          </div>
        ) : (
          <>
            <Typography variant="body2" color="textSecondary" className="mb-4">
              Showing {filtered.length} fundraiser{filtered.length !== 1 ? "s" : ""}
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((f) => (
                <FundraiserCard key={f.id} fundraiser={f} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function FundraisersPage() {
  return (
    <Suspense>
      <FundraisersContent />
    </Suspense>
  );
}
