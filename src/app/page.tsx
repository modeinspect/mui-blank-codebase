"use client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FundraiserCard from "@/components/FundraiserCard";
import { fundraisers, categories } from "@/data/mockData";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import WarningIcon from "@mui/icons-material/Warning";
import PetsIcon from "@mui/icons-material/Pets";
import ForestIcon from "@mui/icons-material/Forest";
import PeopleIcon from "@mui/icons-material/People";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BrushIcon from "@mui/icons-material/Brush";

const categoryIcons: Record<string, React.ReactNode> = {
  Medical: <LocalHospitalIcon />,
  Education: <SchoolIcon />,
  Emergency: <WarningIcon />,
  Animals: <PetsIcon />,
  Environment: <ForestIcon />,
  Community: <PeopleIcon />,
  Sports: <SportsSoccerIcon />,
  Creative: <BrushIcon />,
};

const howItWorks = [
  {
    icon: <CampaignIcon className="text-primary" sx={{ fontSize: 48 }} />,
    title: "Start a Fundraiser",
    description: "Create your campaign in minutes. Share your story and set a goal.",
  },
  {
    icon: <GroupsIcon className="text-primary" sx={{ fontSize: 48 }} />,
    title: "Share with Friends",
    description: "Spread the word through social media and reach more supporters.",
  },
  {
    icon: <VolunteerActivismIcon className="text-primary" sx={{ fontSize: 48 }} />,
    title: "Receive Donations",
    description: "People contribute to your cause with secure, easy payments.",
  },
  {
    icon: <TrendingUpIcon className="text-primary" sx={{ fontSize: 48 }} />,
    title: "Make an Impact",
    description: "Use the funds to bring your vision to life and make a difference.",
  },
];

export default function Home() {
  const featured = fundraisers.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background-default">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1565c0] to-[#0d47a1] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-24 text-center">
          <Typography variant="h2" className="font-bold mb-4 text-white">
            Fund the Change<br />You Want to See
          </Typography>
          <Typography variant="h6" className="mb-8 text-[rgba(255,255,255,0.85)] max-w-[600px] mx-auto font-normal">
            Join millions of people making a difference. Start a fundraiser or donate to a cause you care about.
          </Typography>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/create" className="no-underline">
              <Button variant="contained" size="large" color="secondary" className="px-8 py-3 text-[16px]">
                Start a Fundraiser
              </Button>
            </Link>
            <Link href="/fundraisers" className="no-underline">
              <Button
                variant="outlined"
                size="large"
                className="px-8 py-3 text-[16px] border-white text-white hover:bg-[rgba(255,255,255,0.1)]"
              >
                Explore Fundraisers
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            {[
              { label: "Fundraisers Created", value: "2,400+" },
              { label: "Total Raised", value: "$12M+" },
              { label: "Donors Worldwide", value: "85K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <Typography variant="h4" className="font-bold text-white">
                  {stat.value}
                </Typography>
                <Typography variant="body2" className="text-[rgba(255,255,255,0.7)]">
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fundraisers */}
      <section className="max-w-[1200px] mx-auto px-4 py-16 w-full">
        <div className="text-center mb-10">
          <Typography variant="h4" className="font-bold mb-2">
            Featured Fundraisers
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Discover campaigns that are making an impact right now
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((f) => (
            <FundraiserCard key={f.id} fundraiser={f} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/fundraisers" className="no-underline">
            <Button variant="outlined" size="large">
              View All Fundraisers
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <Typography variant="h4" className="font-bold mb-2">
              Browse by Category
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Find causes that matter most to you
            </Typography>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat} href={`/fundraisers?category=${cat}`} className="no-underline">
                <Card className="text-center py-6 px-4 hover:shadow-6 transition-shadow cursor-pointer">
                  <CardContent>
                    <div className="text-primary mb-2 flex justify-center">
                      {categoryIcons[cat]}
                    </div>
                    <Typography variant="subtitle1" className="font-semibold">
                      {cat}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {fundraisers.filter((f) => f.category === cat).length} campaigns
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1200px] mx-auto px-4 py-16 w-full">
        <div className="text-center mb-10">
          <Typography variant="h4" className="font-bold mb-2">
            How It Works
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Getting started is simple — here&apos;s how you can make a difference
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-[80px] h-[80px] rounded-full bg-[rgba(25,118,210,0.08)] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <Chip label={`Step ${i + 1}`} size="small" color="primary" variant="outlined" className="mb-2" />
              <Typography variant="h6" className="font-semibold mb-1">
                {step.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <Typography variant="h4" className="font-bold mb-3 text-white">
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" className="mb-6 text-[rgba(255,255,255,0.85)]">
            Whether you need help or want to help others, FundHope connects you with people who care.
          </Typography>
          <Link href="/create" className="no-underline">
            <Button variant="contained" size="large" color="secondary" className="px-8 py-3">
              Start Your Fundraiser Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
