"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/navigation';

// CountBadge component
const CountBadge = ({ 
  count, 
  bgColor = 'bg-blue-100', 
  textColor = 'text-blue-600' 
}: { 
  count: number; 
  bgColor?: string; 
  textColor?: string; 
}) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
    {count}
  </span>
);

// Brand Logo component
const BrandLogo = () => (
  <div className="h-18 px-4 py-3 mb-2" style={{ backgroundColor: '#1157FF' }}>
    <div className="flex items-center space-x-3">
      <DescriptionIcon sx={{ fontSize: 24, color: 'white', width: 24, height: 24 }} />
      <div className="text-white">
        <div className="text-base font-bold leading-tight">Rohlik SOP</div>
        <div className="text-xs font-bold leading-tight">Manager</div>
      </div>
    </div>
  </div>
);

// Navigation Item component
const NavItem = ({ 
  icon, 
  label, 
  isActive = false, 
  badge,
  onClick 
}: { 
  icon: string | React.ReactNode; 
  label: string; 
  isActive?: boolean; 
  badge?: { count: number; bgColor?: string; textColor?: string } | number;
  onClick?: () => void;
}) => (
  <ListItem disablePadding>
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: '#F3F4F6',
        },
        '&.Mui-selected': {
          backgroundColor: '#E0EDFF',
          borderLeft: '2px solid #2B66FF',
          '&:hover': {
            backgroundColor: '#E0EDFF',
          },
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {typeof icon === 'string' ? (
          <span className="text-lg">{icon}</span>
        ) : (
          icon
        )}
      </ListItemIcon>
      <ListItemText 
        primary={label}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: isActive ? 600 : 400,
        }}
      />
      {badge && (
        <div className="ml-auto">
          {typeof badge === 'number' ? (
            <CountBadge count={badge} />
          ) : (
            <CountBadge 
              count={badge.count} 
              bgColor={badge.bgColor} 
              textColor={badge.textColor} 
            />
          )}
        </div>
      )}
    </ListItemButton>
  </ListItem>
);

// Section Label component
const NavSectionLabel = ({ label }: { label: string }) => (
  <div className="px-4 py-4">
    <Typography
      variant="caption"
      sx={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.1em',
        color: '#6B7280',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </Typography>
  </div>
);

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen">
      {/* Fixed Left Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex-shrink-0">
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Brand Block */}
          <BrandLogo />
          
          {/* Main Navigation */}
          <List disablePadding>
            <NavItem 
              icon={<HomeIcon />} 
              label="Dashboard" 
              onClick={() => handleNavigation('/dashboard')}
            />
            <NavItem 
              icon={<AddIcon />} 
              label="Create SOP" 
              onClick={() => handleNavigation('/create-sop')}
            />
            <NavItem 
              icon={<ArticleIcon />} 
              label="Create Organizational SOP" 
              onClick={() => handleNavigation('/create-organizational-sop')}
            />
          </List>

          {/* Organization Section */}
          <NavSectionLabel label="Organization" />
          <List disablePadding>
            <NavItem 
              icon={<EditIcon />} 
              label="Drafts" 
              isActive={true}
              badge={3}
              onClick={() => handleNavigation('/drafts')}
            />
            <NavItem 
              icon={<ScheduleIcon />} 
              label="Processing" 
              badge={2}
              onClick={() => handleNavigation('/processing')}
            />
            <NavItem 
              icon={<CancelIcon />} 
              label="Rejected" 
              badge={{ count: 1, bgColor: 'bg-red-200', textColor: 'text-red-600' }}
              onClick={() => handleNavigation('/rejected')}
            />
            <NavItem 
              icon={<PublicIcon />} 
              label="Organization" 
              onClick={() => handleNavigation('/organization')}
            />
          </List>

          {/* Bottom Navigation */}
          <div className="mt-auto">
            <List disablePadding>
              <NavItem 
                icon={<FolderIcon />} 
                label="Catalog" 
                onClick={() => handleNavigation('/catalog')}
              />
              <NavItem 
                icon={<SettingsIcon />} 
                label="Settings" 
                onClick={() => handleNavigation('/settings')}
              />
            </List>
          </div>
        </Box>
      </div>

      {/* Main Content Column */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Container 
          maxWidth={false} 
          sx={{ 
            maxWidth: '1040px', 
            paddingTop: '32px', 
            paddingX: '24px',
            minHeight: '100%'
          }}
        >
          {/* Content goes here */}
        </Container>
      </main>
    </div>
  );
}