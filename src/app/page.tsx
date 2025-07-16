"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, DragEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import LinkIcon from "@mui/icons-material/Link";
import SendIcon from "@mui/icons-material/Send";

// CountBadge component
const CountBadge = ({
  count,
  bgColor = "bg-green-50",
  textColor = "text-green-800",
}: {
  count: number;
  bgColor?: string;
  textColor?: string;
}) => (
  <span
    className={`inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}
    style={{
      backgroundColor:
        bgColor === "bg-green-50" ? "rgba(77, 116, 2, 0.08)" : undefined,
      color: textColor === "text-green-800" ? "#4D7402" : undefined,
    }}
  >
    {count}
  </span>
);

// Brand Logo component
const BrandLogo = () => (
  <div className="h-18 px-4 py-3 mb-2 bg-[rgb(55,86,1)]">
    <div className="flex items-center space-x-3">
      <DescriptionIcon
        sx={{ fontSize: 24, color: "white", width: 24, height: 24 }}
      />
      <div className="text-white">
        <div className="text-base font-bold leading-tight">
          Rohlik SOP Manager
        </div>
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
  onClick,
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
        "&:hover": {
          backgroundColor: "#F3F4F6",
        },
        "&.Mui-selected": {
          backgroundColor: "rgba(77, 116, 2, 0.08)",
          borderLeft: "2px solid #4D7402",
          "&:hover": {
            backgroundColor: "rgba(77, 116, 2, 0.08)",
          },
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {typeof icon === "string" ? (
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
          {typeof badge === "number" ? (
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
        letterSpacing: "0.1em",
        color: "#6B7280",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const [links, setLinks] = useState<{ id: string; title: string; url: string }[]>([]);
  const [linkInput, setLinkInput] = useState({ title: '', url: '' });
  const [showLinkForm, setShowLinkForm] = useState(false);

  // Process group to approver mapping
  const processGroupApprovers: { [key: string]: string } = {
    "Quality Management": "Sarah Johnson",
    "Operations Management": "Michael Chen",
    "Financial Management": "Emily Rodriguez",
    "Technology Management": "David Kim",
    "Marketing Management": "Jennifer Taylor",
    "Sales Management": "Robert Wilson",
    "Legal Management": "Amanda Foster",
    "Compliance Management": "Thomas Anderson",
    "Human Resources": "Lisa Thompson",
    "Project Management": "Mark Davis",
  };

  // Revision History state
  const [revisions, setRevisions] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Form state for tracking changes
  const [formData, setFormData] = useState({
    sopName: "",
    department: "",
    documentNumber: "DOC-001",
    revisionNumber: "1.0",
    dateOfIssue: "2025-07-03",
    approvedBy: "",
    authorOwner: "",
    processGroup: "",
    applicability: "",
    purpose: "",
    scope: "",
    termsAndConditions: "",
    responsibilities: "",
    description: "",
    records: "",
  });

  // Function to calculate next revision number
  const getNextRevisionNumber = () => {
    if (revisions.length === 0) {
      return "1.0";
    }
    
    // Get the latest revision number
    const latestRevision = revisions[revisions.length - 1];
    const currentRevision = latestRevision.revision;
    
    // Parse current revision (e.g., "1.2" -> major: 1, minor: 2)
    const [major, minor] = currentRevision.split('.').map(Number);
    
    // Increment minor version (1.0 -> 1.1, 1.1 -> 1.2, etc.)
    const newMinor = minor + 1;
    
    return `${major}.${newMinor}`;
  };

  // Function to update revision number automatically
  const updateRevisionNumber = () => {
    const newRevisionNumber = getNextRevisionNumber();
    setFormData(prev => ({
      ...prev,
      revisionNumber: newRevisionNumber
    }));
    return newRevisionNumber;
  };

  // Steps state management
  const [steps, setSteps] = useState<
    { id: number; name: string; description: string; level3SOPLink: string }[]
  >([]);
  const [draggedStep, setDraggedStep] = useState<number | null>(null);

  // Metrics table state management
  const [metricsRows, setMetricsRows] = useState<
    { id: string; type: string; metricName: string; location: string }[]
  >([
    { id: "1", type: "", metricName: "", location: "" },
  ]);

  // Track form changes and create automatic revisions
  const createAutomaticRevision = (
    fieldChanged: string,
    newValue: string,
    oldValue: string
  ) => {
    const now = new Date();
    // Generate new revision number automatically
    const newRevisionNumber = getNextRevisionNumber();
    
    const newRevision = {
      id: Date.now().toString(),
      revision: newRevisionNumber,
      date: now.toLocaleDateString("en-GB").replace(/\//g, "."),
      description: `Updated ${fieldChanged
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()}: "${oldValue}" → "${newValue}"`,
      author: "Current User", // In real app, this would be the logged-in user
    };

    setRevisions((prev) => [...prev, newRevision]);
    
    // Update the form's revision number
    setFormData(prev => ({
      ...prev,
      revisionNumber: newRevisionNumber
    }));
  };

  // Initialize with first revision
  useEffect(() => {
    const initialRevision = {
      id: "initial",
      revision: "1.0",
      date: new Date().toLocaleDateString("en-GB").replace(/\//g, "."),
      description: "Initial document creation",
      author: "Current User",
    };
    setRevisions([initialRevision]);
  }, []);

  // Handle form field changes with automatic revision tracking
  const handleFormFieldChange = (fieldName: string, newValue: string) => {
    const oldValue = formData[fieldName as keyof typeof formData];

    // Only create revision if value actually changed and it's not empty
    if (oldValue !== newValue && newValue.trim() !== "") {
      createAutomaticRevision(fieldName, newValue, oldValue);
    }

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [fieldName]: newValue,
      };
      
      // Special handling for process group field - auto-fill approver
      if (fieldName === "processGroup" && newValue && processGroupApprovers[newValue]) {
        updatedData.approvedBy = processGroupApprovers[newValue];
      }
      
      return updatedData;
    });
  };

  // Link handling functions
  const handleAddLink = () => {
    if (linkInput.title.trim() && linkInput.url.trim()) {
      const newLink = {
        id: Date.now().toString(),
        title: linkInput.title,
        url: linkInput.url,
      };
      setLinks((prev) => [...prev, newLink]);
      setLinkInput({ title: '', url: '' });
      setShowLinkForm(false);
      
      // Track revision for adding link
      createAutomaticRevision(
        "Related Documents",
        `Added link: "${linkInput.title}"`,
        `Previous link count: ${links.length}`
      );
    }
  };

  const handleRemoveLink = (linkId: string) => {
    const linkToRemove = links.find(link => link.id === linkId);
    if (linkToRemove) {
      createAutomaticRevision(
        "Related Documents",
        `Removed link: "${linkToRemove.title}"`,
        `Previous link count: ${links.length}`
      );
    }
    setLinks((prev) => prev.filter(link => link.id !== linkId));
  };

  const handleCancelLinkForm = () => {
    setLinkInput({ title: '', url: '' });
    setShowLinkForm(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Steps management functions
  const handleAddStep = () => {
    const newStep = {
      id: Date.now(),
      name: "",
      description: "",
      level3SOPLink: "",
    };
    setSteps((prev) => [...prev, newStep]);

    // Track revision for adding step
    createAutomaticRevision(
      "Steps",
      `Added new step`,
      `Previous step count: ${steps.length}`
    );
  };

  const handleDeleteStep = (stepId: number) => {
    const stepToDelete = steps.find((s) => s.id === stepId);
    if (stepToDelete) {
      createAutomaticRevision(
        "Steps",
        `Deleted step: "${stepToDelete.name}"`,
        `Previous step count: ${steps.length}`
      );
    }
    setSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const handleStepChange = (stepId: number, field: string, value: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      const oldValue = step[field as keyof typeof step];
      // Only create revision if value actually changed and it's not empty
      if (oldValue !== value && value.trim() !== "") {
        createAutomaticRevision(`Step ${field}`, value, String(oldValue));
      }
    }

    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    );
  };

  const handleStepDragStart = (stepId: number) => {
    setDraggedStep(stepId);
  };

  const handleStepDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleStepDrop = (e: React.DragEvent, targetStepId: number) => {
    e.preventDefault();

    if (draggedStep === null || draggedStep === targetStepId) return;

    const draggedIndex = steps.findIndex((step) => step.id === draggedStep);
    const targetIndex = steps.findIndex((step) => step.id === targetStepId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSteps = [...steps];
    const [removed] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, removed);

    setSteps(newSteps);
    setDraggedStep(null);
  };

  const handleStepDragEnd = () => {
    setDraggedStep(null);
  };

  // Metrics table functions
  const handleAddMetricsRow = () => {
    const newRow = {
      id: Date.now().toString(),
      type: "Input",
      metricName: "",
      location: "",
    };
    setMetricsRows((prev) => [...prev, newRow]);
    
    // Track revision for adding row
    createAutomaticRevision(
      "Records of Metrics",
      `Added new metrics row`,
      `Previous row count: ${metricsRows.length}`
    );
  };

  const handleRemoveMetricsRow = (rowId: string) => {
    const rowToRemove = metricsRows.find(row => row.id === rowId);
    if (rowToRemove) {
      createAutomaticRevision(
        "Records of Metrics",
        `Removed metrics row: "${rowToRemove.metricName || 'Unnamed metric'}"`,
        `Previous row count: ${metricsRows.length}`
      );
    }
    setMetricsRows((prev) => prev.filter(row => row.id !== rowId));
  };

  const handleMetricsRowChange = (rowId: string, field: string, value: string) => {
    const oldRow = metricsRows.find(row => row.id === rowId);
    if (oldRow && oldRow[field as keyof typeof oldRow] !== value) {
      createAutomaticRevision(
        "Records of Metrics",
        `Updated ${field} in metrics row: "${oldRow[field as keyof typeof oldRow]}" → "${value}"`,
        `Row ID: ${rowId}`
      );
    }
    
    setMetricsRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  // Check if required fields are filled
  const isFormValid = () => {
    return formData.sopName.trim() !== "" && formData.department.trim() !== "";
  };

  // Handle send for review
  const handleSendForReview = () => {
    if (isFormValid()) {
      setSnackbar({
        open: true,
        message: "SOP sent for review successfully!",
        severity: "success",
      });
    }
  };

  // Handle save
  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "SOP saved successfully!",
      severity: "success",
    });
  };

  return (
    <div className="flex h-screen">
      {/* Fixed Left Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex-shrink-0">
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Brand Block */}
          <BrandLogo />

          {/* Main Navigation */}
          <List disablePadding>
            <NavItem
              icon={<HomeIcon />}
              label="Dashboard"
              onClick={() => handleNavigation("/dashboard")}
            />
            <NavItem
              icon={<AddIcon />}
              label="Create SOP"
              onClick={() => handleNavigation("/create-sop")}
            />
            <NavItem
              icon={<ArticleIcon />}
              label="Create Organizational SOP"
              isActive={true}
              onClick={() => handleNavigation("/create-organizational-sop")}
            />
          </List>

          {/* Organization Section */}
          <NavSectionLabel label="Organization" />
          <List disablePadding>
            <NavItem
              icon={<EditIcon />}
              label="Drafts"
              badge={3}
              onClick={() => handleNavigation("/drafts")}
            />
            <NavItem
              icon={<ScheduleIcon />}
              label="Processing"
              badge={2}
              onClick={() => handleNavigation("/processing")}
            />
            <NavItem
              icon={<CancelIcon />}
              label="Rejected"
              badge={{
                count: 1,
                bgColor: "bg-red-200",
                textColor: "text-red-600",
              }}
              onClick={() => handleNavigation("/rejected")}
            />
            <NavItem
              icon={<PublicIcon />}
              label="Organization"
              onClick={() => handleNavigation("/organization")}
            />
          </List>

          {/* Bottom Navigation */}
          <div className="mt-auto">
            <List disablePadding>
              <NavItem
                icon={<FolderIcon />}
                label="Catalog"
                onClick={() => handleNavigation("/catalog")}
              />
              <NavItem
                icon={<SettingsIcon />}
                label="Settings"
                onClick={() => handleNavigation("/settings")}
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
            maxWidth: "1040px",
            paddingTop: "32px",
            paddingX: "24px",
            minHeight: "100%",
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
                  width: "auto",
                  height: "40px",
                  minWidth: "40px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  border: "1px solid #D1D5DB",
                  color: "#374151",
                  "&:hover": {
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #D1D5DB",
                  },
                }}
              >
                Preview
              </Button>

              {/* Save Button - Primary */}
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  height: "40px",
                  paddingX: "24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  border: "1px solid #D1D5DB",
                  color: "#374151",
                  "&:hover": {
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #D1D5DB",
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
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                {/* Section Title */}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    color: "#111827",
                  }}
                >
                  Basic Information
                </Typography>

                {/* Form Grid */}
                <Grid container spacing={3}>
                  {/* Row 1 Col 1 - SOP Name */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="sop-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        SOP Name *
                      </label>
                      <TextField
                        id="sop-name"
                        placeholder="Enter SOP name"
                        value={formData.sopName}
                        onChange={(e) =>
                          handleFormFieldChange("sopName", e.target.value)
                        }
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                    </div>
                  </Grid>

                  {/* Row 1 Col 2 - Department */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="department-select"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Department *
                      </label>
                      <FormControl fullWidth required>
                        <Select
                          id="department-select"
                          value={formData.department}
                          onChange={(e) =>
                            handleFormFieldChange(
                              "department",
                              e.target.value as string
                            )
                          }
                          displayEmpty
                          variant="outlined"
                          sx={{
                            borderRadius: "8px",
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
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Document Control
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="document-number"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Document Number
                      </label>
                      <TextField
                        id="document-number"
                        name="document-number"
                        value={formData.documentNumber}
                        onChange={(e) =>
                          handleFormFieldChange(
                            "documentNumber",
                            e.target.value
                          )
                        }
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            borderRadius: "6px",
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1157FF",
                              boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "0",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="revision-number"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Revision Number
                      </label>
                      <div
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium"
                        style={{
                          height: "40px",
                          borderRadius: "6px",
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          color: "#374151",
                        }}
                      >
                        {formData.revisionNumber}
                      </div>
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="date-of-issue"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Date of Issue
                      </label>
                      <TextField
                        id="date-of-issue"
                        name="date-of-issue"
                        type="date"
                        value={formData.dateOfIssue}
                        onChange={(e) =>
                          handleFormFieldChange("dateOfIssue", e.target.value)
                        }
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            borderRadius: "6px",
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1157FF",
                              boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "0",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="author-owner"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Author/Owner
                      </label>
                      <div
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium"
                        style={{
                          height: "40px",
                          borderRadius: "6px",
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          color: "#374151",
                        }}
                      >
                        John Doe
                      </div>
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="department-function"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Process Group
                      </label>
                      <TextField
                        id="department-function"
                        name="department-function"
                        placeholder="Enter department function"
                        value={formData.processGroup}
                        onChange={(e) =>
                          handleFormFieldChange("processGroup", e.target.value)
                        }
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            borderRadius: "6px",
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1157FF",
                              boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "0",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                      <label
                        htmlFor="approved-by"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Approved By
                      </label>
                      <div
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium"
                        style={{
                          height: "40px",
                          borderRadius: "6px",
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          color: "#374151",
                        }}
                      >
                        {formData.approvedBy || "Select process group first"}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Card>

              {/* Card 3 - Purpose */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
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
                    value={formData.purpose}
                    onChange={(e) =>
                      handleFormFieldChange("purpose", e.target.value)
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 4 - Scope */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Scope
                </Typography>

                {/* Applicability Dropdown */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="applicability-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Applicability
                  </label>
                  <FormControl fullWidth>
                    <Select
                      id="applicability-select"
                      name="applicability"
                      value={formData.applicability}
                      onChange={(e) =>
                        handleFormFieldChange(
                          "applicability",
                          e.target.value as string
                        )
                      }
                      displayEmpty
                      sx={{
                        height: "40px",
                        "& .MuiOutlinedInput-root": {
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          borderRadius: "6px",
                          "& fieldset": {
                            borderColor: "#D1D5DB",
                          },
                          "&:hover fieldset": {
                            borderColor: "#D1D5DB",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1157FF",
                            boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ fontStyle: "italic" }}>
                        Select applicability
                      </MenuItem>
                      <MenuItem value="group">Group level</MenuItem>
                      <MenuItem
                        disabled
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Country level
                      </MenuItem>
                      <MenuItem value="country-cz" sx={{ paddingLeft: "32px" }}>
                        CZ
                      </MenuItem>
                      <MenuItem value="country-de" sx={{ paddingLeft: "32px" }}>
                        DE
                      </MenuItem>
                      <MenuItem value="country-at" sx={{ paddingLeft: "32px" }}>
                        AT
                      </MenuItem>
                      <MenuItem value="country-hu" sx={{ paddingLeft: "32px" }}>
                        HU
                      </MenuItem>
                      <MenuItem value="country-ro" sx={{ paddingLeft: "32px" }}>
                        RO
                      </MenuItem>
                      <MenuItem
                        disabled
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        FC level
                      </MenuItem>
                      <MenuItem
                        value="fc-praha-liboc"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Praha - Liboc
                      </MenuItem>
                      <MenuItem
                        value="fc-praha-hp"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Praha - HP
                      </MenuItem>
                      <MenuItem
                        value="fc-chrastany"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Chrášťany
                      </MenuItem>
                      <MenuItem value="fc-brno" sx={{ paddingLeft: "32px" }}>
                        Brno
                      </MenuItem>
                      <MenuItem value="fc-ostrava" sx={{ paddingLeft: "32px" }}>
                        Ostrava
                      </MenuItem>
                      <MenuItem
                        value="fc-budapest"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Budapest
                      </MenuItem>
                      <MenuItem value="fc-wien" sx={{ paddingLeft: "32px" }}>
                        Wien
                      </MenuItem>
                      <MenuItem value="fc-munich" sx={{ paddingLeft: "32px" }}>
                        Munich
                      </MenuItem>
                      <MenuItem
                        value="fc-frankfurt"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Frankfurt
                      </MenuItem>
                      <MenuItem value="fc-berlin" sx={{ paddingLeft: "32px" }}>
                        Berlin
                      </MenuItem>
                      <MenuItem
                        value="fc-bucharest"
                        sx={{ paddingLeft: "32px" }}
                      >
                        Bucharest
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <TextField
                    id="scope-textarea"
                    name="scope"
                    placeholder="Define the scope and applicability…"
                    value={formData.scope}
                    onChange={(e) =>
                      handleFormFieldChange("scope", e.target.value)
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 5 - Terms and Conditions */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Terms and Definitions
                </Typography>
                <div>
                  <TextField
                    id="terms-textarea"
                    name="terms"
                    placeholder="List abbreviations, acronyms or technical terms..."
                    value={formData.termsAndConditions}
                    onChange={(e) =>
                      handleFormFieldChange(
                        "termsAndConditions",
                        e.target.value
                      )
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 6 - Responsibilities */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
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
                    value={formData.responsibilities}
                    onChange={(e) =>
                      handleFormFieldChange("responsibilities", e.target.value)
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>
              </Card>

              {/* Card 7 - Description */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
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
                    value={formData.description}
                    onChange={(e) =>
                      handleFormFieldChange("description", e.target.value)
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>

                {/* Steps Section */}
                <div className="mt-6">
                  {/* Steps Header */}
                  <div className="flex justify-between items-center mb-4">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      Steps
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleAddStep}
                      sx={{
                        height: "32px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        textTransform: "none",
                        border: "1px solid #D1D5DB",
                        color: "#374151",
                        "&:hover": {
                          backgroundColor: "#F9FAFB",
                          border: "1px solid #D1D5DB",
                        },
                      }}
                    >
                      Add Step
                    </Button>
                  </div>

                  {/* Steps List */}
                  <Stack spacing={2}>
                    {steps.map((step, index) => (
                      <Card
                        key={step.id}
                        variant="outlined"
                        draggable
                        onDragStart={() => handleStepDragStart(step.id)}
                        onDragOver={handleStepDragOver}
                        onDrop={(e) => handleStepDrop(e, step.id)}
                        onDragEnd={handleStepDragEnd}
                        sx={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          padding: "16px",
                          position: "relative",
                          cursor: draggedStep === step.id ? "grabbing" : "grab",
                          opacity: draggedStep === step.id ? 0.5 : 1,
                          transition: "opacity 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#F9FAFB",
                            borderColor: "#D1D5DB",
                          },
                        }}
                      >
                        <div className="space-y-3">
                          {/* Step Header with Step Number and Actions */}
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#374151",
                              }}
                            >
                              Step {index + 1}
                            </Typography>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1">
                              {/* Drag Handle */}
                              <IconButton
                                size="small"
                                sx={{
                                  color: "#6B7280",
                                  cursor: "grab",
                                  "&:hover": {
                                    color: "#374151",
                                    backgroundColor: "#F3F4F6",
                                  },
                                  "&:active": {
                                    cursor: "grabbing",
                                  },
                                }}
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>

                              {/* Delete Button */}
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteStep(step.id)}
                                sx={{
                                  color: "#6B7280",
                                  "&:hover": {
                                    color: "#DC2626",
                                    backgroundColor: "#FEF2F2",
                                  },
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </div>

                          {/* Step Name Field */}
                          <div>
                            <TextField
                              value={step.name}
                              onChange={(e) =>
                                handleStepChange(
                                  step.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Enter step name..."
                              variant="outlined"
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  height: "40px",
                                  paddingLeft: "12px",
                                  paddingRight: "12px",
                                  borderRadius: "6px",
                                  "& fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#1157FF",
                                    boxShadow:
                                      "0 0 0 3px rgba(17, 87, 255, 0.1)",
                                  },
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "0",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                },
                              }}
                            />
                          </div>

                          {/* Level 3 SOP Link Button */}
                          <div className="flex justify-start">
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<LinkIcon />}
                              sx={{
                                height: "32px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "none",
                                border: "1px solid #D1D5DB",
                                color: "#374151",
                                "&:hover": {
                                  backgroundColor: "#F9FAFB",
                                  border: "1px solid #D1D5DB",
                                },
                              }}
                            >
                              Link to Level 3 SOP
                            </Button>
                          </div>

                          {/* Description Field with Formatting */}
                          <div>
                            {/* Formatting Toolbar */}
                            <div className="flex items-center gap-1 mb-2 p-2 bg-gray-50 rounded-t-md border border-b-0 border-gray-200">
                              <IconButton
                                size="small"
                                sx={{
                                  color: "#6B7280",
                                  "&:hover": {
                                    color: "#374151",
                                    backgroundColor: "#E5E7EB",
                                  },
                                  width: "28px",
                                  height: "28px",
                                }}
                              >
                                <FormatBoldIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  color: "#6B7280",
                                  "&:hover": {
                                    color: "#374151",
                                    backgroundColor: "#E5E7EB",
                                  },
                                  width: "28px",
                                  height: "28px",
                                }}
                              >
                                <FormatItalicIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  color: "#6B7280",
                                  "&:hover": {
                                    color: "#374151",
                                    backgroundColor: "#E5E7EB",
                                  },
                                  width: "28px",
                                  height: "28px",
                                }}
                              >
                                <LinkIcon fontSize="small" />
                              </IconButton>
                            </div>

                            {/* Description Textarea */}
                            <TextField
                              value={step.description}
                              onChange={(e) =>
                                handleStepChange(
                                  step.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Add description"
                              multiline
                              minRows={3}
                              variant="outlined"
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  paddingLeft: "12px",
                                  paddingRight: "12px",
                                  borderRadius: "0 0 6px 6px",
                                  "& fieldset": {
                                    borderColor: "#D1D5DB",
                                    borderTop: "none",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#D1D5DB",
                                    borderTop: "none",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#1157FF",
                                    borderTop: "1px solid #1157FF",
                                    boxShadow:
                                      "0 0 0 3px rgba(17, 87, 255, 0.1)",
                                  },
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "12px 0",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Stack>
                </div>
              </Card>

              {/* Card 9 - Related Documents/References */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Related Documents/References
                </Typography>

                {/* Add Link Section */}
                <div style={{ marginBottom: "24px" }}>
                  <Button
                    variant="outlined"
                    startIcon={<LinkIcon />}
                    onClick={() => setShowLinkForm(true)}
                    sx={{
                      height: "40px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      textTransform: "none",
                      border: "1px solid #D1D5DB",
                      color: "#374151",
                      "&:hover": {
                        backgroundColor: "#F9FAFB",
                        border: "1px solid #D1D5DB",
                      },
                    }}
                  >
                    Add Link to SOP or Document
                  </Button>
                </div>

                {/* Link Form */}
                {showLinkForm && (
                  <div style={{ marginBottom: "24px", padding: "16px", border: "1px solid #E5E7EB", borderRadius: "8px" }}>
                    <Stack spacing={2}>
                      <TextField
                        label="Link Title"
                        placeholder="Enter link title (e.g., Related SOP, Reference Document)"
                        value={linkInput.title}
                        onChange={(e) => setLinkInput({ ...linkInput, title: e.target.value })}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            borderRadius: "6px",
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1157FF",
                              boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "0",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                      <TextField
                        label="URL"
                        placeholder="Enter URL (e.g., https://example.com/sop)"
                        value={linkInput.url}
                        onChange={(e) => setLinkInput({ ...linkInput, url: e.target.value })}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            borderRadius: "6px",
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1157FF",
                              boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "0",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <Button
                          variant="outlined"
                          onClick={handleCancelLinkForm}
                          sx={{
                            height: "32px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: "none",
                            border: "1px solid #D1D5DB",
                            color: "#374151",
                            "&:hover": {
                              backgroundColor: "#F9FAFB",
                              border: "1px solid #D1D5DB",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleAddLink}
                          disabled={!linkInput.title.trim() || !linkInput.url.trim()}
                          sx={{
                            height: "32px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: "none",
                            backgroundColor: isFormValid()
                              ? "rgba(77, 116, 2, 0.3)"
                              : "#9CA3AF",
                            color: isFormValid() ? "white" : "#6B7280",
                            "&:hover": {
                              backgroundColor: isFormValid() ? "#3B5702" : "#9CA3AF",
                            },
                            "&:disabled": {
                              backgroundColor: "#9CA3AF",
                              color: "#6B7280",
                            },
                          }}
                        >
                          Add Link
                        </Button>
                      </div>
                    </Stack>
                  </div>
                )}

                {/* Links List */}
                {links.length > 0 && (
                  <div>
                    <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 500, color: "#374151" }}>
                      Added Links:
                    </Typography>
                    <Stack spacing={1}>
                      {links.map((link) => (
                        <Chip
                          key={link.id}
                          label={
                            <div>
                              <strong>{link.title}</strong> - {link.url}
                            </div>
                          }
                          onDelete={() => handleRemoveLink(link.id)}
                          deleteIcon={<CloseIcon />}
                          variant="outlined"
                          sx={{
                            justifyContent: "space-between",
                            height: "auto",
                            padding: "8px 12px",
                            "& .MuiChip-label": {
                              fontSize: "14px",
                              color: "#374151",
                              whiteSpace: "normal",
                              textAlign: "left",
                            },
                            "& .MuiChip-deleteIcon": {
                              color: "#6B7280",
                              "&:hover": {
                                color: "#374151",
                              },
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </div>
                )}

                {/* Empty State */}
                {links.length === 0 && !showLinkForm && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "120px",
                      backgroundColor: "#F9FAFB",
                      border: "1px dashed #D1D5DB",
                      borderRadius: "8px",
                    }}
                  >
                    <Stack spacing={2} alignItems="center">
                      <LinkIcon
                        sx={{
                          width: 32,
                          height: 32,
                          color: "#9CA3AF",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          color: "#6B7280",
                          textAlign: "center",
                        }}
                      >
                        No links added yet. Click "Add Link" to reference related SOPs or documents.
                      </Typography>
                    </Stack>
                  </div>
                )}
              </Card>

              {/* Card 8 - Records */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6">
                    Records of Metrics
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddMetricsRow}
                    sx={{
                      height: "32px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      textTransform: "none",
                      border: "1px solid #D1D5DB",
                      color: "#374151",
                      "&:hover": {
                        backgroundColor: "#F9FAFB",
                        border: "1px solid #D1D5DB",
                      },
                    }}
                  >
                    Add Row
                  </Button>
                </div>

                {/* Table Container with horizontal scroll */}
                <div className="overflow-x-auto">
                  <Table
                    sx={{
                      minWidth: "650px",
                      "& .MuiTableHead-root": {
                        backgroundColor: "#F9FAFB",
                      },
                      "& .MuiTableHead-root .MuiTableCell-head": {
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#374151",
                        borderBottom: "1px solid #E5E7EB",
                        padding: "12px 16px",
                      },
                      "& .MuiTableBody-root .MuiTableRow-root": {
                        "&:nth-of-type(even)": {
                          backgroundColor: "#F9FAFB",
                        },
                        "&:hover": {
                          backgroundColor: "#F3F4F6",
                        },
                      },
                      "& .MuiTableBody-root .MuiTableCell-body": {
                        fontSize: "14px",
                        color: "#374151",
                        borderBottom: "1px solid #E5E7EB",
                        padding: "12px 16px",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Metric name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell width="60px"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {metricsRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell sx={{ width: "150px" }}>
                            <FormControl fullWidth>
                              <Select
                                value={row.type}
                                onChange={(e) =>
                                  handleMetricsRowChange(row.id, "type", e.target.value)
                                }
                                displayEmpty
                                size="small"
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    "& fieldset": {
                                      borderColor: "#D1D5DB",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#D1D5DB",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#1157FF",
                                      boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="Input">Input</MenuItem>
                                <MenuItem value="Output">Output</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={row.metricName}
                              onChange={(e) =>
                                handleMetricsRowChange(row.id, "metricName", e.target.value)
                              }
                              placeholder="Metric name…"
                              size="small"
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "6px",
                                  "& fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#1157FF",
                                    boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                                  },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={row.location}
                              onChange={(e) =>
                                handleMetricsRowChange(row.id, "location", e.target.value)
                              }
                              placeholder="e.g. dashboard URL"
                              size="small"
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "6px",
                                  "& fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#D1D5DB",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#1157FF",
                                    boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                                  },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleRemoveMetricsRow(row.id)}
                              size="small"
                              sx={{
                                color: "#DC2626",
                                "&:hover": {
                                  backgroundColor: "#FEF2F2",
                                },
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Card 10 - Revision History */}
              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                {/* Heading Row */}
                <div className="flex justify-between items-center mb-6">
                  {/* Left - Section Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Revision History
                  </Typography>
                </div>

                {/* Body - Conditional Display */}
                {revisions.length === 0 ? (
                  // EmptyState
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "220px",
                    }}
                  >
                    <Stack spacing={3} alignItems="center">
                      <DescriptionIcon
                        sx={{
                          width: 56,
                          height: 56,
                          color: "#9CA3AF",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          color: "#4B5563",
                          textAlign: "center",
                          maxWidth: "400px",
                        }}
                      >
                        Revisions are automatically created when you make
                        changes to the form.
                      </Typography>
                    </Stack>
                  </div>
                ) : (
                  // RevisionTable
                  <Table
                    sx={{
                      "& .MuiTableHead-root": {
                        backgroundColor: "#F9FAFB",
                      },
                      "& .MuiTableHead-root .MuiTableCell-head": {
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#374151",
                        borderBottom: "1px solid #E5E7EB",
                      },
                      "& .MuiTableBody-root .MuiTableRow-root": {
                        "&:nth-of-type(even)": {
                          backgroundColor: "#F9FAFB",
                        },
                        "&:hover": {
                          backgroundColor: "#F3F4F6",
                        },
                      },
                      "& .MuiTableBody-root .MuiTableCell-body": {
                        fontSize: "14px",
                        color: "#374151",
                        borderBottom: "1px solid #E5E7EB",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Rev. #</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Author</TableCell>
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
                                  fontSize: "12px",
                                  backgroundColor: "#1157FF",
                                }}
                              >
                                {getAuthorInitials(revision.author)}
                              </Avatar>
                              <span>{revision.author}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Card>

              <Card
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "32px",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Terms and Definitions
                </Typography>
                <div>
                  <TextField
                    id="terms-textarea"
                    name="terms"
                    placeholder="List abbreviations, acronyms or technical terms..."
                    value={formData.termsAndConditions}
                    onChange={(e) =>
                      handleFormFieldChange(
                        "termsAndConditions",
                        e.target.value
                      )
                    }
                    multiline
                    minRows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderRadius: "6px",
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1157FF",
                          boxShadow: "0 0 0 3px rgba(17, 87, 255, 0.1)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 0",
                      },
                    }}
                  />
                </div>
              </Card>
            </Stack>
          </form>

          {/* Bottom Action Buttons */}
          <div className="mt-8 pb-8">
            <div className="flex justify-end gap-3">
              {/* Save Button - Secondary */}
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  height: "48px",
                  paddingX: "24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  border: "1px solid #D1D5DB",
                  color: "#374151",
                  "&:hover": {
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #D1D5DB",
                  },
                }}
              >
                Save
              </Button>

              {/* Send for Review Button - Primary */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleSendForReview}
                disabled={!isFormValid()}
                sx={{
                  height: "48px",
                  paddingX: "24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  backgroundColor: isFormValid()
                    ? "rgba(77, 116, 2, 0.3)"
                    : "#9CA3AF",
                  color: isFormValid() ? "white" : "#6B7280",
                  "&:hover": {
                    backgroundColor: isFormValid() ? "#3B5702" : "#9CA3AF",
                  },
                  "&:disabled": {
                    backgroundColor: "#9CA3AF",
                    color: "#6B7280",
                  },
                }}
              >
                Send for Review
              </Button>
            </div>
          </div>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </main>
    </div>
  );
}