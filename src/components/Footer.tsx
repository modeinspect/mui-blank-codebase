"use client";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FavoriteIcon className="text-primary" />
              <Typography variant="h6" className="font-bold text-white">
                FundHope
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-400">
              Empowering people to help people. Every donation makes a difference.
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className="font-bold text-white mb-3">
              Quick Links
            </Typography>
            <div className="flex flex-col gap-2">
              <Link href="/fundraisers" className="text-gray-400 no-underline hover:text-white transition-colors">
                <Typography variant="body2">Explore Fundraisers</Typography>
              </Link>
              <Link href="/create" className="text-gray-400 no-underline hover:text-white transition-colors">
                <Typography variant="body2">Start a Fundraiser</Typography>
              </Link>
            </div>
          </div>
          <div>
            <Typography variant="subtitle1" className="font-bold text-white mb-3">
              Categories
            </Typography>
            <div className="flex flex-col gap-2">
              {["Medical", "Education", "Emergency", "Animals"].map((cat) => (
                <Link
                  key={cat}
                  href={`/fundraisers?category=${cat}`}
                  className="text-gray-400 no-underline hover:text-white transition-colors"
                >
                  <Typography variant="body2">{cat}</Typography>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Divider className="my-8 border-gray-700" />
        <Typography variant="body2" className="text-gray-500 text-center">
          © 2024 FundHope. This is a demo application — no real transactions occur.
        </Typography>
      </div>
    </footer>
  );
}
