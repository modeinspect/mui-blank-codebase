"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationDialog from "@/components/DonationDialog";
import { fundraisers, Donation } from "@/data/mockData";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShareIcon from "@mui/icons-material/Share";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Link from "next/link";

export default function FundraiserDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const fundraiser = fundraisers.find((f) => f.id === id);
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [localDonations, setLocalDonations] = useState<Donation[]>([]);
  const [extraRaised, setExtraRaised] = useState(0);

  if (!fundraiser) {
    return (
      <div className="min-h-screen flex flex-col bg-background-default">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Typography variant="h4" className="font-bold mb-2">
              Fundraiser Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-4">
              The fundraiser you&apos;re looking for doesn&apos;t exist.
            </Typography>
            <Link href="/fundraisers" className="no-underline">
              <Button variant="contained">Browse Fundraisers</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalRaised = fundraiser.raisedAmount + extraRaised;
  const progressPercent = Math.min(
    (totalRaised / fundraiser.goalAmount) * 100,
    100
  );
  const allDonations = [...localDonations, ...fundraiser.donations];

  const handleDonate = (donation: {
    donorName: string;
    amount: number;
    message: string;
  }) => {
    const newDonation: Donation = {
      id: Date.now(),
      donorName: donation.donorName,
      amount: donation.amount,
      message: donation.message || undefined,
      date: new Date().toISOString().split("T")[0],
    };
    setLocalDonations((prev) => [newDonation, ...prev]);
    setExtraRaised((prev) => prev + donation.amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-default">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 py-8 w-full flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/fundraisers" className="no-underline">
            <Typography variant="body2" color="primary" className="hover:underline cursor-pointer">
              Fundraisers
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            /
          </Typography>
          <Typography variant="body2" color="textSecondary" noWrap>
            {fundraiser.title}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={fundraiser.imageUrl}
              alt={fundraiser.title}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-[12px] mb-6"
            />

            <div className="flex items-center gap-2 mb-3">
              <Chip label={fundraiser.category} color="primary" size="small" />
              <div className="flex items-center gap-1 text-text-secondary">
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  Created {new Date(fundraiser.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </div>

            <Typography variant="h4" className="font-bold mb-2">
              {fundraiser.title}
            </Typography>

            <div className="flex items-center gap-2 mb-6">
              <Avatar sx={{ width: 32, height: 32 }} className="bg-primary">
                <PersonIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="body2" color="textSecondary">
                Organized by <strong>{fundraiser.organizer}</strong>
              </Typography>
            </div>

            <Divider className="mb-6" />

            <Typography variant="h6" className="font-bold mb-3">
              Story
            </Typography>
            <Typography variant="body1" className="text-text-secondary leading-relaxed mb-8 whitespace-pre-line">
              {fundraiser.story}
            </Typography>

            {/* Donations on mobile shown below story */}
            <div className="lg:hidden mb-8">
              <DonationSidebar
                totalRaised={totalRaised}
                goalAmount={fundraiser.goalAmount}
                progressPercent={progressPercent}
                donationsCount={allDonations.length}
                onDonateClick={() => setDonationDialogOpen(true)}
              />
            </div>

            <Divider className="mb-6" />

            {/* Recent Donations */}
            <Typography variant="h6" className="font-bold mb-3">
              Recent Donations ({allDonations.length})
            </Typography>
            <List>
              {allDonations.map((donation, index) => (
                <div key={donation.id}>
                  <ListItem className="px-0">
                    <ListItemAvatar>
                      <Avatar className="bg-primary-light">
                        <VolunteerActivismIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <div className="flex justify-between items-center">
                          <Typography variant="body2" className="font-semibold">
                            {donation.donorName}
                          </Typography>
                          <Typography variant="body2" className="font-bold text-primary">
                            ${donation.amount.toLocaleString()}
                          </Typography>
                        </div>
                      }
                      secondary={
                        <>
                          {donation.message && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="mt-1"
                            >
                              &ldquo;{donation.message}&rdquo;
                            </Typography>
                          )}
                          <Typography variant="caption" color="textSecondary">
                            {new Date(donation.date).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < allDonations.length - 1 && <Divider variant="inset" />}
                </div>
              ))}
            </List>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-[80px]">
              <DonationSidebar
                totalRaised={totalRaised}
                goalAmount={fundraiser.goalAmount}
                progressPercent={progressPercent}
                donationsCount={allDonations.length}
                onDonateClick={() => setDonationDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <DonationDialog
        open={donationDialogOpen}
        onClose={() => setDonationDialogOpen(false)}
        fundraiserTitle={fundraiser.title}
        onDonate={handleDonate}
      />

      <Footer />
    </div>
  );
}

function DonationSidebar({
  totalRaised,
  goalAmount,
  progressPercent,
  donationsCount,
  onDonateClick,
}: {
  totalRaised: number;
  goalAmount: number;
  progressPercent: number;
  donationsCount: number;
  onDonateClick: () => void;
}) {
  return (
    <Paper className="p-6 rounded-[12px]" elevation={3}>
      <Typography variant="h5" className="font-bold text-primary mb-1">
        ${totalRaised.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-3">
        raised of ${goalAmount.toLocaleString()} goal
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progressPercent}
        className="h-[8px] rounded-[4px] mb-2"
      />
      <Typography variant="caption" color="textSecondary" className="mb-4 block">
        {Math.round(progressPercent)}% funded • {donationsCount} donations
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={onDonateClick}
        className="mb-3 py-3"
        startIcon={<VolunteerActivismIcon />}
      >
        Donate Now
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<ShareIcon />}
        className="py-2"
      >
        Share
      </Button>

      <Divider className="my-4" />

      <div className="flex items-center gap-3">
        <Avatar className="bg-[rgba(25,118,210,0.1)]" sx={{ width: 40, height: 40 }}>
          <PersonIcon className="text-primary" />
        </Avatar>
        <div>
          <Typography variant="caption" color="textSecondary">
            Organizer
          </Typography>
          <Typography variant="body2" className="font-semibold">
            Verified Organizer
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
