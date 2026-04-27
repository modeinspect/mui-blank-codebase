"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CardActionArea from "@mui/material/CardActionArea";
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

  return (
    <Link href={`/fundraiser/${fundraiser.id}`} className="no-underline block">
      <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-8">
        <CardActionArea className="flex-1 flex flex-col items-stretch">
          <CardMedia
            component="img"
            image={fundraiser.imageUrl}
            alt={fundraiser.title}
            className="h-[200px] object-cover"
          />
          <CardContent className="flex-1 flex flex-col">
            <Typography variant="h6" className="font-semibold mb-1 line-clamp-2 text-text-primary">
              {fundraiser.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-2">
              by {fundraiser.organizer}
            </Typography>
            <Typography variant="body2" className="text-text-secondary mb-3 line-clamp-2">
              {fundraiser.description}
            </Typography>
            <div className="mt-auto">
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                className="h-[6px] rounded-[3px] mb-2"
              />
              <div className="flex justify-between items-center">
                <Typography variant="body2" className="font-bold text-primary">
                  ${fundraiser.raisedAmount.toLocaleString()} raised
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  of ${fundraiser.goalAmount.toLocaleString()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
