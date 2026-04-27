"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="sticky" color="default" className="bg-white shadow-2">
      <Toolbar className="max-w-[1200px] w-full mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 no-underline mr-auto">
          <IconButton color="primary" size="small" className="pointer-events-none">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="h6" className="font-bold text-primary no-underline">
            FundHope
          </Typography>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/fundraisers" className="no-underline">
            <Button color="inherit">Explore</Button>
          </Link>
          <Link href="/create" className="no-underline">
            <Button variant="contained" color="primary">
              Start a Fundraiser
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
