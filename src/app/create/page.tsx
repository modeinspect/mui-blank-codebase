"use client";

import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputAdornment from "@mui/material/InputAdornment";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/mockData";
import Link from "next/link";

interface FormData {
  title: string;
  category: string;
  goalAmount: string;
  description: string;
  imageUrl: string;
}

interface FormErrors {
  title?: string;
  category?: string;
  goalAmount?: string;
  description?: string;
}

export default function CreateFundraiserPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    goalAmount: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.goalAmount || Number(formData.goalAmount) <= 0)
      newErrors.goalAmount = "Please enter a valid goal amount";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      goalAmount: "",
      description: "",
      imageUrl: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background-default">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <Paper className="p-8 max-w-[500px] w-full text-center rounded-[12px]" elevation={3}>
            <div className="text-[64px] mb-4">🎉</div>
            <Typography variant="h4" className="font-bold mb-2">
              Fundraiser Created!
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-2">
              Your fundraiser &ldquo;{formData.title}&rdquo; has been successfully created.
            </Typography>
            <Alert severity="success" className="mb-6 text-left">
              Your campaign is now live and ready to receive donations. Share it with friends and family to get started!
            </Alert>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/fundraisers" className="no-underline">
                <Button variant="contained">View Fundraisers</Button>
              </Link>
              <Button variant="outlined" onClick={handleReset}>
                Create Another
              </Button>
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-default">
      <Navbar />

      <div className="max-w-[700px] mx-auto px-4 py-8 w-full flex-1">
        <Typography variant="h4" className="font-bold mb-2">
          Start a Fundraiser
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-8">
          Tell your story and set a goal — it only takes a few minutes to get started.
        </Typography>

        <Paper className="p-6 md:p-8 rounded-[12px]" elevation={2}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="Fundraiser Title"
              fullWidth
              value={formData.title}
              onChange={handleChange("title")}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="e.g., Help John with Medical Bills"
            />

            <TextField
              label="Category"
              select
              fullWidth
              value={formData.category}
              onChange={handleChange("category")}
              error={!!errors.category}
              helperText={errors.category}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Goal Amount"
              fullWidth
              type="number"
              value={formData.goalAmount}
              onChange={handleChange("goalAmount")}
              error={!!errors.goalAmount}
              helperText={errors.goalAmount}
              placeholder="5000"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
            />

            <TextField
              label="Description / Story"
              fullWidth
              multiline
              rows="6"
              value={formData.description}
              onChange={handleChange("description")}
              error={!!errors.description}
              helperText={errors.description || "Tell people why you're raising money and how the funds will be used."}
              placeholder="Share your story here..."
            />

            <TextField
              label="Image URL (optional)"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange("imageUrl")}
              placeholder="https://example.com/image.jpg"
              helperText="Paste a URL to an image that represents your fundraiser"
            />

            {formData.imageUrl && (
              <div className="rounded-[8px] overflow-hidden border border-gray-200">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-[200px] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className="py-3"
              >
                Create Fundraiser
              </Button>
            </div>
          </form>
        </Paper>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Fundraiser created successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}
