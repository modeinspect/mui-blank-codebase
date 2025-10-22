"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useApp } from "../context/AppContext";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, setUser } = useApp();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setIsSignup(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - create a user
    const mockUser = {
      id: Date.now().toString(),
      name: isSignup ? name : email.split("@")[0],
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      joinedDate: new Date().getFullYear().toString(),
    };

    setUser(mockUser);
    handleClose();
  };

  return (
    <Dialog
      open={isLoginModalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ p: 0, position: "relative", borderBottom: "1px solid #e5e7eb" }}>
        <div className="px-6 py-4">
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 className="text-center text-base font-semibold">
            {isSignup ? "Sign up" : "Log in"}
          </h2>
        </div>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <div className="px-6 py-6">
          <h3 className="text-xl font-semibold mb-6">
            Welcome to Wanderbnb
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <TextField
                fullWidth
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignup}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#FF385C",
                color: "white",
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#E31C5F",
                },
              }}
            >
              {isSignup ? "Sign up" : "Log in"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <span className="text-sm text-gray-500">or</span>
          </Divider>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🔵</span>
              <span className="text-sm font-semibold">Continue with Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🔴</span>
              <span className="text-sm font-semibold">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🍎</span>
              <span className="text-sm font-semibold">Continue with Apple</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-gray-600 hover:underline"
            >
              {isSignup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
