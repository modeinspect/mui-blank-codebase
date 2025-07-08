"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef, DragEvent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// CountBadge component
const CountBadge = ({ 
  count, 
  bgColor = 'bg-green-50', 
  textColor = 'text-green-800' 
}: { 
  count: number; 
  bgColor?: string; 
  textColor?: string; 
}) => (
  <span 
    className={`inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}
    style={{
      backgroundColor: bgColor === 'bg-green-50' ? 'rgba(77, 116, 2, 0.08)' : undefined,
      color: textColor === 'text-green-800' ? '#4D7402' : undefined,
    }}
  >
    {count}
  </span>
);

// Brand Logo component
const BrandLogo = () => (
  <div className="h-18 px-4 py-3 mb-2 bg-[rgb(55,86,1)]">
    <div className="flex items-center space-x-3">
      <DescriptionIcon sx={{ fontSize: 24, color: 'white', width: 24, height: 24 }} />
      <div className="text-white">
        <div className="text-base font-bold leading-tight">Rohlik SOP Manager</div>
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
          backgroundColor: 'rgba(77, 116, 2, 0.08)',
          borderLeft: '2px solid #4D7402',
          '&:hover': {
            backgroundColor: 'rgba(77, 116, 2, 0.08)',
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

export default function HomePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Revision History state
  const [revisions, setRevisions] = useState<any[]>([]);
  const [isAddRevisionOpen, setIsAddRevisionOpen] = useState(false);
  const [editingRevision, setEditingRevision] = useState<any>(null);
  const [revisionForm, setRevisionForm] = useState({
    revision: '',
    date: '',
    description: '',
    author: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleAddRevision = () => {
    setEditingRevision(null);
    setRevisionForm({
      revision: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      author: ''
    });
    setIsAddRevisionOpen(true);
  };

  const handleEditRevision = (revision: any) => {
    setEditingRevision(revision);
    setRevisionForm({
      revision: revision.revision,
      date: revision.date,
      description: revision.description,
      author: revision.author
    });
    setIsAddRevisionOpen(true);
  };

  const handleDeleteRevision = (id: string) => {
    setRevisions(prev => prev.filter(rev => rev.id !== id));
    setSnackbar({
      open: true,
      message: 'Revision deleted successfully',
      severity: 'success'
    });
  };

  const handleSaveRevision = async () => {
    // Validation
    if (!revisionForm.revision || !revisionForm.date || !revisionForm.description || !revisionForm.author) {
      setSnackbar({
        open: true,
        message: 'All fields are required',
        severity: 'error'
      });
      return;
    }

    // Check for unique revision number
    const existingRevision = revisions.find(rev => 
      rev.revision === revisionForm.revision && (!editingRevision || rev.id !== editingRevision.id)
    );
    
    if (existingRevision) {
      setSnackbar({
        open: true,
        message: 'Revision number must be unique',
        severity: 'error'
      });
      return;
    }

    try {
      // Simulate API call
      // await fetch('/api/revisions', { method: 'POST', body: JSON.stringify(revisionForm) });
      
      const newRevision = {
        id: editingRevision ? editingRevision.id : Date.now().toString(),
        ...revisionForm,
        // Format date to dd.mm.yyyy
        date: new Date(revisionForm.date).toLocaleDateString('en-GB').replace(/\//g, '.')
      };

      if (editingRevision) {
        setRevisions(prev => prev.map(rev => rev.id === editingRevision.id ? newRevision : rev));
        setSnackbar({
          open: true,
          message: 'Revision updated successfully',
          severity: 'success'
        });
      } else {
        setRevisions(prev => [...prev, newRevision]);
        setSnackbar({
          open: true,
          message: 'Revision added successfully',
          severity: 'success'
        });
      }

      setIsAddRevisionOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving revision',
        severity: 'error'
      });
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setRevisionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const authors = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown'
  ];

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
              isActive={true}
              onClick={() => handleNavigation('/create-organizational-sop')}
            />
          </List>

          {/* Organization Section */}
          <NavSectionLabel label="Organization" />
          <List disablePadding>
            <NavItem 
              icon={<EditIcon />} 
              label="Drafts" 
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
          {/* Content Header - Sticky Zone 0 */}
          <div className="flex justify-between items-start mb-6">
            {/* Left - Page Title */}
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Organizational SOP
            </h1>
            
            {/* Right - Action Buttons */}
            <div className="flex gap-2">
              {/* Preview Button - Secondary */}
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                sx={{
                  width: 'auto',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'none',
                  border: '1px solid #D1D5DB',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D1D5DB',
                  },
                }}
              >
                Preview
              </Button>
              
              {/* Save Button - Primary */}
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
                form="sop-form"
                sx={{
                  width: '96px',
                  height: '40px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'none',
                  backgroundColor: '#4D7402',
                  '&:hover': {
                    backgroundColor: '#3B5702',
                  },
                }}
              >
                Save
              </Button>
            </div>
          </div>
          
          {/* Form Wrapper - SectionStack */}
          <form id="sop-form">
            <Stack spacing={4}>
              {/* Card 1 - Basic Information */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                {/* Section Title */}
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '24px',
                    color: '#111827'
                  }}
                >
                  Basic Information
                </Typography>
                
                {/* Form Grid */}
                <Grid container spacing={3}>
                  {/* Row 1 Col 1 - SOP Name */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="sop-name" className="block text-sm font-medium text-gray-700 mb-2">
                        SOP Name *
                      </label>
                      <TextField
                        id="sop-name"
                        placeholder="Enter SOP name"
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  
                  {/* Row 1 Col 2 - Department */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="department-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Department *
                      </label>
                      <FormControl fullWidth required>
                        <Select
                          id="department-select"
                          displayEmpty
                          variant="outlined"
                          sx={{
                            borderRadius: '8px',
                          }}
                        >
                          <MenuItem value="">
                            <em>Select department</em>
                          </MenuItem>
                          <MenuItem value="operations">Operations</MenuItem>
                          <MenuItem value="hr">Human Resources</MenuItem>
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="it">Information Technology</MenuItem>
                          <MenuItem value="marketing">Marketing</MenuItem>
                          <MenuItem value="sales">Sales</MenuItem>
                          <MenuItem value="legal">Legal</MenuItem>
                          <MenuItem value="compliance">Compliance</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </Card>
              
              {/* Card 2 - Document Control */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Document Control
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="document-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Document Number
                      </label>
                      <TextField
                        id="document-number"
                        name="document-number"
                        defaultValue="DOC-001"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="revision-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Revision Number
                      </label>
                      <TextField
                        id="revision-number"
                        name="revision-number"
                        defaultValue="1.0"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="date-of-issue" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Issue
                      </label>
                      <TextField
                        id="date-of-issue"
                        name="date-of-issue"
                        type="date"
                        defaultValue="2025-07-03"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="approved-by" className="block text-sm font-medium text-gray-700 mb-2">
                        Approved By
                      </label>
                      <TextField
                        id="approved-by"
                        name="approved-by"
                        placeholder="Enter approver name"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="author-owner" className="block text-sm font-medium text-gray-700 mb-2">
                        Author/Owner
                      </label>
                      <TextField
                        id="author-owner"
                        name="author-owner"
                        placeholder="Enter author name"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label htmlFor="department-function" className="block text-sm font-medium text-gray-700 mb-2">
                        Department/Function
                      </label>
                      <TextField
                        id="department-function"
                        name="department-function"
                        placeholder="Enter department function"
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '40px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            borderRadius: '6px',
                            '& fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1157FF',
                              boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Card>
              
              {/* Card 3 - Purpose */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Purpose
                </Typography>
                <div>
                  <TextField
                    id="purpose-textarea"
                    name="purpose"
                    placeholder="Describe the purpose of this SOP…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>
              
              {/* Card 4 - Scope */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Scope
                </Typography>
                <div>
                  <TextField
                    id="scope-textarea"
                    name="scope"
                    placeholder="Define the scope and applicability…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 5 - Terms and Conditions */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Terms and Conditions
                </Typography>
                <div>
                  <TextField
                    id="terms-textarea"
                    name="terms"
                    placeholder="List terms and conditions…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 6 - Responsibilities */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Responsibilities
                </Typography>
                <div>
                  <TextField
                    id="responsibilities-textarea"
                    name="responsibilities"
                    placeholder="Define roles and responsibilities…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 7 - Description */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Description
                </Typography>
                <div>
                  <TextField
                    id="description-textarea"
                    name="description"
                    placeholder="Provide detailed description…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 8 - Records */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Records
                </Typography>
                <div>
                  <TextField
                    id="records-textarea"
                    name="records"
                    placeholder="Specify record keeping requirements…"
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 9 - Related Documents/References */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Related Documents/References
                </Typography>
                
                {/* Hidden file input */}
                <input
                  type="file"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />
                
                {/* Drag and Drop Zone */}
                <div
                  onClick={handleDropZoneClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${isDragOver ? '#1157FF' : '#D1D5DB'}`,
                    borderRadius: '6px',
                    height: '220px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: isDragOver ? 'rgba(17, 87, 255, 0.05)' : 'transparent',
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <AttachFileIcon 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        color: '#9CA3AF' 
                      }} 
                    />
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '16px', 
                        color: '#4B5563',
                        textAlign: 'center'
                      }}
                    >
                      Click to attach related documents or drag and drop
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '14px', 
                        color: '#6B7280',
                        textAlign: 'center'
                      }}
                    >
                      PDF, DOC, DOCX, images up to 10 MB
                    </Typography>
                  </Stack>
                </div>
                
                {/* File List */}
                {files.length > 0 && (
                  <Stack spacing={1} sx={{ marginTop: 2 }}>
                    {files.map((file, index) => (
                      <Chip
                        key={index}
                        label={`${file.name} (${formatFileSize(file.size)})`}
                        onDelete={() => handleFileRemove(index)}
                        deleteIcon={<CloseIcon />}
                        variant="outlined"
                        sx={{
                          justifyContent: 'space-between',
                          '& .MuiChip-label': {
                            fontSize: '14px',
                            color: '#374151',
                          },
                          '& .MuiChip-deleteIcon': {
                            color: '#6B7280',
                            '&:hover': {
                              color: '#374151',
                            },
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Card>

              {/* Card 10 - Revision History */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '32px',
                }}
              >
                {/* Heading Row */}
                <div className="flex justify-between items-center mb-6">
                  {/* Left - Section Title */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#111827'
                    }}
                  >
                    Revision History
                  </Typography>
                  
                  {/* Right - Add Revision Button */}
                  <Button
                    id="btnAddRevision"
                    variant="outlined"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={handleAddRevision}
                    sx={{
                      width: 'auto',
                      height: '40px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      border: '1px solid #D1D5DB',
                      color: '#374151',
                      '&:hover': {
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #D1D5DB',
                      },
                    }}
                  >
                    Add Revision
                  </Button>
                </div>

                {/* Body - Conditional Display */}
                {revisions.length === 0 ? (
                  // EmptyState
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '220px',
                    }}
                  >
                    <Stack spacing={3} alignItems="center">
                      <DescriptionIcon 
                        sx={{ 
                          width: 56, 
                          height: 56, 
                          color: '#9CA3AF' 
                        }} 
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: '16px', 
                          color: '#4B5563',
                          textAlign: 'center',
                          maxWidth: '400px'
                        }}
                      >
                        No revision history yet. Click 'Add Revision' to get started.
                      </Typography>
                    </Stack>
                  </div>
                ) : (
                  // RevisionTable
                  <Table
                    sx={{
                      '& .MuiTableHead-root': {
                        backgroundColor: '#F9FAFB',
                      },
                      '& .MuiTableHead-root .MuiTableCell-head': {
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#374151',
                        borderBottom: '1px solid #E5E7EB',
                      },
                      '& .MuiTableBody-root .MuiTableRow-root': {
                        '&:nth-of-type(even)': {
                          backgroundColor: '#F9FAFB',
                        },
                        '&:hover': {
                          backgroundColor: '#F3F4F6',
                        },
                      },
                      '& .MuiTableBody-root .MuiTableCell-body': {
                        fontSize: '14px',
                        color: '#374151',
                        borderBottom: '1px solid #E5E7EB',
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Rev. #</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {revisions.map((revision: any) => (
                        <TableRow key={revision.id}>
                          <TableCell>{revision.revision}</TableCell>
                          <TableCell>{revision.date}</TableCell>
                          <TableCell>{revision.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar 
                                sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  fontSize: '12px',
                                  backgroundColor: '#1157FF'
                                }}
                              >
                                {getAuthorInitials(revision.author)}
                              </Avatar>
                              <span>{revision.author}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <IconButton
                                size="small"
                                onClick={() => handleEditRevision(revision)}
                                sx={{
                                  color: '#6B7280',
                                  '&:hover': {
                                    color: '#374151',
                                    backgroundColor: '#F3F4F6',
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteRevision(revision.id)}
                                sx={{
                                  color: '#6B7280',
                                  '&:hover': {
                                    color: '#DC2626',
                                    backgroundColor: '#FEF2F2',
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </Stack>
          </form>
          
          {/* Add Revision Modal */}
          <Dialog 
            open={isAddRevisionOpen} 
            onClose={() => setIsAddRevisionOpen(false)}
            maxWidth="md"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                maxWidth: '448px', // max-w-md
                borderRadius: '8px',
              },
            }}
          >
            <DialogTitle sx={{ fontSize: '18px', fontWeight: 600 }}>
              {editingRevision ? 'Edit Revision' : 'Add Revision'}
            </DialogTitle>
            
            <DialogContent sx={{ paddingTop: '16px !important' }}>
              <Stack spacing={3}>
                {/* Revision Number */}
                <div>
                  <label htmlFor="revision-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Revision # *
                  </label>
                  <TextField
                    id="revision-input"
                    value={revisionForm.revision}
                    onChange={(e) => handleFormChange('revision', e.target.value)}
                    placeholder="e.g. 1.0"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '40px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '0',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  />
                </div>

                {/* Date Picker */}
                <div>
                  <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <TextField
                    id="date-input"
                    type="date"
                    value={revisionForm.date}
                    onChange={(e) => handleFormChange('date', e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '40px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '0',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <label htmlFor="description-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <TextField
                    id="description-input"
                    value={revisionForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Describe the changes made"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '12px 0',
                      },
                    }}
                  />
                </div>

                {/* Author Select */}
                <div>
                  <label htmlFor="author-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <FormControl fullWidth>
                    <Select
                      id="author-select"
                      value={revisionForm.author}
                      onChange={(e) => handleFormChange('author', e.target.value as string)}
                      displayEmpty
                      variant="outlined"
                      sx={{
                        height: '40px',
                        borderRadius: '6px',
                        '& .MuiSelect-select': {
                          paddingTop: '8px',
                          paddingBottom: '8px',
                        },
                        '& fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1157FF',
                          boxShadow: '0 0 0 3px rgba(17, 87, 255, 0.1)',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select author</em>
                      </MenuItem>
                      {authors.map((author) => (
                        <MenuItem key={author} value={author}>
                          {author}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ padding: '16px 24px' }}>
              <Button
                onClick={() => setIsAddRevisionOpen(false)}
                variant="outlined"
                sx={{
                  borderColor: '#D1D5DB',
                  color: '#374151',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                    borderColor: '#D1D5DB',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveRevision}
                variant="contained"
                sx={{
                  backgroundColor: '#1157FF',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0B47D1',
                  },
                }}
              >
                {editingRevision ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleSnackbarClose} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </main>
    </div>
  );
}
