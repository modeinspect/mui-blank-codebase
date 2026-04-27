"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";

interface DonationDialogProps {
  open: boolean;
  onClose: () => void;
  fundraiserTitle: string;
  onDonate: (donation: { donorName: string; amount: number; message: string }) => void;
}

export default function DonationDialog({
  open,
  onClose,
  fundraiserTitle,
  onDonate,
}: DonationDialogProps) {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ donorName?: string; amount?: string }>({});
  const [success, setSuccess] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];

  const validate = () => {
    const newErrors: { donorName?: string; amount?: string } = {};
    if (!donorName.trim()) newErrors.donorName = "Please enter your name";
    if (!amount || Number(amount) <= 0) newErrors.amount = "Please enter a valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onDonate({
      donorName: donorName.trim(),
      amount: Number(amount),
      message: message.trim(),
    });
    setSuccess(true);
  };

  const handleClose = () => {
    setDonorName("");
    setAmount("");
    setMessage("");
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {success ? (
        <>
          <DialogContent className="text-center py-8">
            <div className="text-[64px] mb-4">🎉</div>
            <Typography variant="h5" className="font-bold mb-2">
              Thank You!
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-2">
              Your donation of <strong>${Number(amount).toLocaleString()}</strong> has been received.
            </Typography>
            <Alert severity="success" className="mt-4">
              Your generous contribution makes a real difference!
            </Alert>
          </DialogContent>
          <DialogActions className="px-6 pb-4">
            <Button onClick={handleClose} variant="contained" fullWidth>
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle className="pb-1">
            <Typography variant="h6" className="font-bold">
              Make a Donation
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Supporting: {fundraiserTitle}
            </Typography>
          </DialogTitle>
          <DialogContent className="pt-4">
            <div className="flex flex-col gap-4 mt-2">
              <TextField
                label="Your Name"
                fullWidth
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                error={!!errors.donorName}
                helperText={errors.donorName}
              />
              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Select an amount
                </Typography>
                <div className="flex flex-wrap gap-2 mb-3">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === String(preset) ? "contained" : "outlined"}
                      size="small"
                      onClick={() => setAmount(String(preset))}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
                <TextField
                  label="Custom Amount"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    },
                  }}
                />
              </div>
              <TextField
                label="Message (optional)"
                fullWidth
                multiline
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave an encouraging message..."
              />
            </div>
          </DialogContent>
          <DialogActions className="px-6 pb-4">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Donate{amount ? ` $${Number(amount).toLocaleString()}` : ""}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
