"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { Fundraiser } from "@/data/mockData";

interface FundraiserCardProps {
  fundraiser: Fundraiser;
}

export default function FundraiserCard({ fundraiser }: FundraiserCardProps) {
  const progressPercent = Math.min(
    (fundraiser.raisedAmount / fundraiser.goalAmount) * 100,
    100
  );

  const donorCount = fundraiser.donations?.length ?? 0;

  return (
    <Link href={`/fundraiser/${fundraiser.id}`} className="no-underline block h-full">
      <Card className="h-full flex flex-col rounded-[12px] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-[2px]">
        {/* Image with category badge */}
        <div className="relative">
          <CardMedia
            component="img"
            image={fundraiser.imageUrl}
            alt={fundraiser.title}
            className="h-[180px] object-cover"
          />
          <div className="absolute top-3 left-3">
            <Chip
              label={fundraiser.category}
              size="small"
              className="bg-white/90 backdrop-blur-sm text-[12px] font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col p-4 gap-0">
          {/* Title */}
          <Typography
            variant="subtitle1"
            className="font-bold leading-snug line-clamp-2 text-text-primary mb-1"
          >
            {fundraiser.title}
          </Typography>

          {/* Organizer */}
          <Typography variant="caption" className="text-text-secondary mb-2">
            by {fundraiser.organizer}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            className="text-text-secondary line-clamp-2 mb-4 leading-relaxed text-[13px]"
          >
            {fundraiser.description}
          </Typography>

          {/* Progress section — pushed to bottom */}
          <div className="mt-auto">
            {/* Amount raised + percentage */}
            <div className="flex justify-between items-baseline mb-[6px]">
              <Typography variant="body2" className="font-bold text-primary text-[15px]">
                ${fundraiser.raisedAmount.toLocaleString()}
              </Typography>
              <Typography variant="caption" className="text-text-secondary">
                {Math.round(progressPercent)}% funded
              </Typography>
            </div>

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              className="h-[8px] rounded-[4px] mb-2"
              sx={{
                backgroundColor: "rgba(0,0,0,0.06)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                },
              }}
            />

            {/* Goal + donors */}
            <div className="flex justify-between items-center mb-3">
              <Typography variant="caption" className="text-text-secondary">
                of ${fundraiser.goalAmount.toLocaleString()} goal
              </Typography>
              {donorCount > 0 && (
                <Typography variant="caption" className="text-text-secondary">
                  {donorCount} donor{donorCount !== 1 ? "s" : ""}
                </Typography>
              )}
            </div>

            {/* Donate button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              className="rounded-[8px] py-[8px] text-[14px] font-semibold normal-case shadow-none hover:shadow-md"
            >
              Donate Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
