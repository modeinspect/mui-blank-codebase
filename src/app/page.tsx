"use client";

import React, { useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Error from "@mui/icons-material/Error";
import PlayArrow from "@mui/icons-material/PlayArrow";

// ChipGroup component for consistent chip grouping
interface ChipData {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
}

interface ChipGroupProps {
  chips: ChipData[];
  className?: string;
}

const ChipGroup: React.FC<ChipGroupProps> = ({ chips, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {chips.map((chip, index) => (
        <Chip 
          key={index}
          label={chip.label}
          color={chip.color || 'default'}
          variant={chip.variant || 'filled'}
          size={chip.size || 'small'}
        />
      ))}
    </div>
  );
};

// Mock data for the dashboard
const securityScore = 75;
const criticalIncidents = 3;
const resolvedThisWeek = 12;
const pendingReviews = 7;

// Detailed drill-down data
const securityScoreDetails = {
  components: [
    { category: 'Network Security', score: 85, status: 'Good', issues: 2 },
    { category: 'Access Control', score: 70, status: 'Needs Attention', issues: 5 },
    { category: 'Data Protection', score: 90, status: 'Excellent', issues: 0 },
    { category: 'Vulnerability Management', score: 65, status: 'Poor', issues: 8 },
    { category: 'Incident Response', score: 80, status: 'Good', issues: 1 },
  ],
  trend: '+3 points from last week'
};

const criticalIncidentsDetails = [
  { id: 'INC-001', title: 'Malware Detection on Server-001', severity: 'Critical', timeAgo: '2 hours ago', description: 'Advanced persistent threat detected on production server' },
  { id: 'INC-003', title: 'Data Breach Attempt on User Portal', severity: 'Critical', timeAgo: '1 day ago', description: 'Unauthorized access attempt to user database' },
  { id: 'INC-007', title: 'Ransomware Activity Detected', severity: 'Critical', timeAgo: '3 hours ago', description: 'Suspicious file encryption activity on network drive' },
];

const resolvedIncidentsDetails = [
  { id: 'INC-012', title: 'DDoS Attack Mitigated', resolvedDate: '2024-01-14', analyst: 'John Smith', timeToResolve: '2.5 hours' },
  { id: 'INC-011', title: 'Phishing Email Campaign Blocked', resolvedDate: '2024-01-13', analyst: 'Sarah Connor', timeToResolve: '45 minutes' },
  { id: 'INC-010', title: 'Unauthorized Login Prevented', resolvedDate: '2024-01-13', analyst: 'Mike Johnson', timeToResolve: '1.2 hours' },
  { id: 'INC-009', title: 'Malicious File Quarantined', resolvedDate: '2024-01-12', analyst: 'Emily Davis', timeToResolve: '30 minutes' },
  { id: 'INC-008', title: 'Firewall Rule Updated', resolvedDate: '2024-01-12', analyst: 'Alex Wilson', timeToResolve: '1 hour' },
];

const pendingReviewsDetails = [
  { id: 'REV-001', type: 'Security Policy Update', priority: 'High', assignedTo: 'Security Team', daysWaiting: 3 },
  { id: 'REV-002', type: 'Access Request Approval', priority: 'Medium', assignedTo: 'John Smith', daysWaiting: 1 },
  { id: 'REV-003', type: 'Vulnerability Assessment', priority: 'High', assignedTo: 'Sarah Connor', daysWaiting: 5 },
  { id: 'REV-004', type: 'Incident Post-mortem', priority: 'Low', assignedTo: 'Mike Johnson', daysWaiting: 2 },
  { id: 'REV-005', type: 'Compliance Audit', priority: 'Critical', assignedTo: 'Security Team', daysWaiting: 7 },
  { id: 'REV-006', type: 'User Permission Review', priority: 'Medium', assignedTo: 'Emily Davis', daysWaiting: 1 },
  { id: 'REV-007', type: 'Third-party Risk Assessment', priority: 'High', assignedTo: 'Alex Wilson', daysWaiting: 4 },
];

const recentIncidents = [
  { id: 'INC-001', type: 'Malware', severity: 'Critical', status: 'Active', detected: '2024-01-15 14:30', affected: 'Server-001' },
  { id: 'INC-002', type: 'Unauthorized Access', severity: 'High', status: 'Investigating', detected: '2024-01-15 11:20', affected: 'Database-Main' },
  { id: 'INC-003', type: 'Data Breach', severity: 'Critical', status: 'Contained', detected: '2024-01-14 09:45', affected: 'User-Portal' },
  { id: 'INC-004', type: 'DDoS Attack', severity: 'Medium', status: 'Mitigated', detected: '2024-01-14 16:10', affected: 'Web-Frontend' },
  { id: 'INC-005', type: 'Phishing', severity: 'Low', status: 'Resolved', detected: '2024-01-13 08:30', affected: 'Email-System' },
];

// Detailed incident data for drill down
const incidentDetails = {
  'INC-001': {
    id: 'INC-001',
    title: 'Advanced Malware Detection on Production Server',
    type: 'Malware',
    severity: 'Critical',
    status: 'Active',
    detected: '2024-01-15 14:30',
    affected: 'Server-001',
    description: 'Advanced persistent threat detected on production server Server-001. The malware appears to be a sophisticated rootkit attempting to establish persistence and exfiltrate sensitive data.',
    analyst: 'Sarah Connor',
    priority: 'P0 - Critical',
    estimatedResolution: '2-4 hours',
    affectedSystems: ['Server-001', 'Database-Replica-001', 'Backup-System-01'],
    indicators: [
      'Suspicious network traffic to external IP 192.168.1.100',
      'Unauthorized file modifications in /var/log/system',
      'Elevated CPU usage on affected server',
      'Unusual outbound connections on port 443'
    ],
    timeline: [
      { time: '14:30', event: 'Initial detection by antivirus system', status: 'Detected' },
      { time: '14:35', event: 'Automated isolation of affected server', status: 'Contained' },
      { time: '14:40', event: 'Security analyst notified', status: 'Investigating' },
      { time: '15:15', event: 'Malware analysis initiated', status: 'Active' }
    ],
    remediationSteps: [
      'Isolate affected systems from network',
      'Perform full system scan and malware removal',
      'Restore from clean backup if necessary',
      'Update security policies and monitoring rules',
      'Conduct post-incident review'
    ]
  },
  'INC-002': {
    id: 'INC-002',
    title: 'Unauthorized Database Access Attempt',
    type: 'Unauthorized Access',
    severity: 'High',
    status: 'Investigating',
    detected: '2024-01-15 11:20',
    affected: 'Database-Main',
    description: 'Multiple failed login attempts detected on main database server from external IP addresses. Potential credential stuffing or brute force attack in progress.',
    analyst: 'John Smith',
    priority: 'P1 - High',
    estimatedResolution: '1-2 hours',
    affectedSystems: ['Database-Main', 'Auth-Service-01'],
    indicators: [
      '500+ failed login attempts in 10 minutes',
      'Access attempts from multiple geographic locations',
      'Use of common username/password combinations',
      'Bypassing rate limiting mechanisms'
    ],
    timeline: [
      { time: '11:20', event: 'Anomalous login pattern detected', status: 'Detected' },
      { time: '11:25', event: 'IP addresses added to blocklist', status: 'Mitigating' },
      { time: '11:30', event: 'Database access temporarily restricted', status: 'Investigating' },
      { time: '12:00', event: 'Forensic analysis in progress', status: 'Active' }
    ],
    remediationSteps: [
      'Block malicious IP addresses',
      'Implement additional rate limiting',
      'Force password reset for affected accounts',
      'Review and strengthen authentication policies',
      'Monitor for continued attack patterns'
    ]
  },
  'INC-003': {
    id: 'INC-003',
    title: 'Data Breach Incident - User Portal',
    type: 'Data Breach',
    severity: 'Critical',
    status: 'Contained',
    detected: '2024-01-14 09:45',
    affected: 'User-Portal',
    description: 'Potential data breach detected on user portal. Unauthorized access to customer PII database detected through SQL injection vulnerability.',
    analyst: 'Emily Davis',
    priority: 'P0 - Critical',
    estimatedResolution: '4-6 hours',
    affectedSystems: ['User-Portal', 'Customer-DB', 'API-Gateway'],
    indicators: [
      'SQL injection attempts in web logs',
      'Abnormal database query patterns',
      'Large data export requests',
      'Access to sensitive customer tables'
    ],
    timeline: [
      { time: '09:45', event: 'SQL injection detected in web application', status: 'Detected' },
      { time: '09:50', event: 'Application taken offline immediately', status: 'Contained' },
      { time: '10:00', event: 'Incident response team activated', status: 'Investigating' },
      { time: '10:30', event: 'Data exposure assessment initiated', status: 'Contained' }
    ],
    remediationSteps: [
      'Patch SQL injection vulnerability',
      'Assess scope of data compromise',
      'Notify affected customers per compliance requirements',
      'Implement additional input validation',
      'Conduct security code review'
    ]
  },
  'INC-004': {
    id: 'INC-004',
    title: 'Distributed Denial of Service Attack',
    type: 'DDoS Attack',
    severity: 'Medium',
    status: 'Mitigated',
    detected: '2024-01-14 16:10',
    affected: 'Web-Frontend',
    description: 'DDoS attack targeting web frontend servers. Attack successfully mitigated using cloud-based DDoS protection service.',
    analyst: 'Mike Johnson',
    priority: 'P2 - Medium',
    estimatedResolution: 'Resolved',
    affectedSystems: ['Web-Frontend', 'Load-Balancer', 'CDN'],
    indicators: [
      'Massive spike in incoming traffic',
      'High latency on web services',
      'Multiple source IP addresses',
      'Volumetric attack pattern detected'
    ],
    timeline: [
      { time: '16:10', event: 'Traffic spike detected by monitoring', status: 'Detected' },
      { time: '16:12', event: 'DDoS protection automatically activated', status: 'Mitigating' },
      { time: '16:20', event: 'Traffic normalized, services restored', status: 'Mitigated' },
      { time: '16:45', event: 'Post-incident monitoring active', status: 'Resolved' }
    ],
    remediationSteps: [
      'Monitor traffic patterns for 24 hours',
      'Review DDoS protection configuration',
      'Update incident playbooks',
      'Conduct lessons learned session'
    ]
  },
  'INC-005': {
    id: 'INC-005',
    title: 'Phishing Email Campaign Detected',
    type: 'Phishing',
    severity: 'Low',
    status: 'Resolved',
    detected: '2024-01-13 08:30',
    affected: 'Email-System',
    description: 'Phishing email campaign targeting employees detected and blocked by email security system. No successful compromise identified.',
    analyst: 'Alex Wilson',
    priority: 'P3 - Low',
    estimatedResolution: 'Resolved',
    affectedSystems: ['Email-System', 'Security-Gateway'],
    indicators: [
      'Suspicious email patterns detected',
      'Links to known malicious domains',
      'Social engineering tactics used',
      'Attempted credential harvesting'
    ],
    timeline: [
      { time: '08:30', event: 'Phishing emails detected by security gateway', status: 'Detected' },
      { time: '08:35', event: 'Malicious emails quarantined automatically', status: 'Contained' },
      { time: '09:00', event: 'Employee security awareness sent', status: 'Mitigated' },
      { time: '10:00', event: 'Incident closed, monitoring continues', status: 'Resolved' }
    ],
    remediationSteps: [
      'Continue monitoring for similar campaigns',
      'Update email security rules',
      'Conduct security awareness training',
      'Review and improve email filtering'
    ]
  }
};

const remediationSuggestions = [
  {
    id: 1,
    title: 'Update Security Patches',
    description: 'Critical security patches are available for 15 systems',
    priority: 'Critical',
    estimatedTime: '2 hours',
    impact: 'High'
  },
  {
    id: 2,
    title: 'Review Access Controls',
    description: 'Multiple users have excessive permissions',
    priority: 'High',
    estimatedTime: '4 hours',
    impact: 'Medium'
  },
  {
    id: 3,
    title: 'Enable Multi-Factor Authentication',
    description: 'MFA is disabled for 23 administrative accounts',
    priority: 'High',
    estimatedTime: '1 hour',
    impact: 'High'
  },
  {
    id: 4,
    title: 'Update Firewall Rules',
    description: 'Outdated firewall configurations detected',
    priority: 'Medium',
    estimatedTime: '3 hours',
    impact: 'Medium'
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'error';
    case 'high': return 'warning';
    case 'medium': return 'info';
    case 'low': return 'success';
    default: return 'default';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'error';
    case 'investigating': return 'warning';
    case 'contained': return 'info';
    case 'mitigated': return 'success';
    case 'resolved': return 'success';
    default: return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return 'error';
    case 'high': return 'warning';
    case 'medium': return 'info';
    case 'low': return 'success';
    default: return 'default';
  }
};

export default function Home() {
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<'security-score' | 'critical-incidents' | 'resolved-week' | 'pending-reviews' | null>(null);
  const [incidentDrawerOpen, setIncidentDrawerOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [applyFixOpen, setApplyFixOpen] = useState(false);
  const [selectedFix, setSelectedFix] = useState<any>(null);
  const [fixProgress, setFixProgress] = useState(0);
  const [isApplyingFix, setIsApplyingFix] = useState(false);
  const [fixCompleted, setFixCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Mock data for fix execution steps
  const getFixSteps = (suggestion: any) => {
    switch (suggestion.id) {
      case 1: // Update Security Patches
        return [
          { 
            label: 'Scanning Systems', 
            description: 'Identifying systems requiring patches',
            duration: 30000 // 30 seconds
          },
          { 
            label: 'Downloading Patches', 
            description: 'Retrieving critical security updates',
            duration: 45000 // 45 seconds
          },
          { 
            label: 'Testing Compatibility', 
            description: 'Verifying patch compatibility',
            duration: 20000 // 20 seconds
          },
          { 
            label: 'Applying Updates', 
            description: 'Installing security patches',
            duration: 60000 // 60 seconds
          },
          { 
            label: 'Validating Installation', 
            description: 'Confirming successful patch deployment',
            duration: 15000 // 15 seconds
          }
        ];
      case 2: // Review Access Controls
        return [
          { 
            label: 'Auditing Permissions', 
            description: 'Analyzing current user access levels',
            duration: 25000
          },
          { 
            label: 'Identifying Violations', 
            description: 'Finding excessive permission grants',
            duration: 35000
          },
          { 
            label: 'Creating Reports', 
            description: 'Generating access control recommendations',
            duration: 20000
          },
          { 
            label: 'Implementing Changes', 
            description: 'Applying permission corrections',
            duration: 40000
          }
        ];
      case 3: // Enable Multi-Factor Authentication
        return [
          { 
            label: 'Identifying Accounts', 
            description: 'Finding administrative accounts without MFA',
            duration: 20000
          },
          { 
            label: 'Configuring MFA', 
            description: 'Setting up multi-factor authentication',
            duration: 30000
          },
          { 
            label: 'Testing Authentication', 
            description: 'Verifying MFA functionality',
            duration: 15000
          },
          { 
            label: 'Notifying Users', 
            description: 'Sending setup instructions to affected users',
            duration: 10000
          }
        ];
      case 4: // Update Firewall Rules
        return [
          { 
            label: 'Analyzing Rules', 
            description: 'Reviewing current firewall configuration',
            duration: 30000
          },
          { 
            label: 'Identifying Gaps', 
            description: 'Finding outdated or ineffective rules',
            duration: 25000
          },
          { 
            label: 'Updating Configuration', 
            description: 'Implementing improved firewall rules',
            duration: 45000
          },
          { 
            label: 'Testing Connectivity', 
            description: 'Verifying network accessibility',
            duration: 20000
          }
        ];
      default:
        return [];
    }
  };

  const handleStatClick = (statType: 'security-score' | 'critical-incidents' | 'resolved-week' | 'pending-reviews') => {
    setSelectedStat(statType);
    setDrillDownOpen(true);
  };

  const handleCloseDialog = () => {
    setDrillDownOpen(false);
    setSelectedStat(null);
  };

  const handleIncidentClick = (incidentId: string) => {
    setSelectedIncident(incidentId);
    setIncidentDrawerOpen(true);
  };

  const handleCloseIncidentDrawer = () => {
    setIncidentDrawerOpen(false);
    setSelectedIncident(null);
  };

  const handleApplyFixClick = (suggestion: any) => {
    setSelectedFix(suggestion);
    setApplyFixOpen(true);
    setFixProgress(0);
    setIsApplyingFix(false);
    setFixCompleted(false);
    setActiveStep(0);
  };

  const handleCloseApplyFix = () => {
    setApplyFixOpen(false);
    setSelectedFix(null);
    setFixProgress(0);
    setIsApplyingFix(false);
    setFixCompleted(false);
    setActiveStep(0);
  };

  const executeFixSteps = async () => {
    if (!selectedFix) return;
    
    setIsApplyingFix(true);
    const steps = getFixSteps(selectedFix);
    
    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      
      // Simulate step execution with progress
      const stepDuration = steps[i].duration;
      const progressIncrement = 100 / steps.length;
      
      await new Promise(resolve => {
        let stepProgress = 0;
        const interval = setInterval(() => {
          stepProgress += 2;
          setFixProgress((i * progressIncrement) + (stepProgress * progressIncrement / 100));
          
          if (stepProgress >= 100) {
            clearInterval(interval);
            resolve(undefined);
          }
        }, stepDuration / 50); // Update progress 50 times during step
      });
    }
    
    setFixCompleted(true);
    setIsApplyingFix(false);
    setFixProgress(100);
  };

  const renderIncidentDrawerContent = () => {
    if (!selectedIncident || !incidentDetails[selectedIncident as keyof typeof incidentDetails]) {
      return null;
    }

    const incident = incidentDetails[selectedIncident as keyof typeof incidentDetails];

    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Typography variant="h5" className="font-bold mb-2">
              {incident.title}
            </Typography>
            <ChipGroup 
              chips={[
                { label: incident.id, variant: 'outlined' },
                { 
                  label: incident.severity, 
                  color: getSeverityColor(incident.severity) as any
                },
                { 
                  label: incident.status, 
                  color: getStatusColor(incident.status) as any,
                  variant: 'outlined'
                }
              ]}
              className="mb-3"
            />
          </div>
          <Button onClick={handleCloseIncidentDrawer} size="small" variant="outlined">
            Close
          </Button>
        </div>

        <Divider className="mb-6" />

        {/* Incident Overview */}
        <div className="mb-6">
          <Typography variant="h6" className="font-semibold mb-3">
            Incident Overview
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Typography variant="body2" color="textSecondary">Type</Typography>
              <Typography variant="body1" className="font-medium">{incident.type}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary">Priority</Typography>
              <Typography variant="body1" className="font-medium">{incident.priority}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary">Detected</Typography>
              <Typography variant="body1" className="font-medium">{incident.detected}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary">Analyst</Typography>
              <Typography variant="body1" className="font-medium">{incident.analyst}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary">Affected Systems</Typography>
              <Typography variant="body1" className="font-medium">{incident.affected}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary">Est. Resolution</Typography>
              <Typography variant="body1" className="font-medium">{incident.estimatedResolution}</Typography>
            </div>
          </div>
          <div className="mb-4">
            <Typography variant="body2" color="textSecondary" className="mb-2">Description</Typography>
            <Typography variant="body1">{incident.description}</Typography>
          </div>
        </div>

        <Divider className="mb-6" />

        {/* Affected Systems */}
        <div className="mb-6">
          <Typography variant="h6" className="font-semibold mb-3">
            Affected Systems
          </Typography>
          <ChipGroup 
            chips={incident.affectedSystems.map(system => ({
              label: system,
              variant: 'outlined' as const,
              color: 'error' as const
            }))}
          />
        </div>

        <Divider className="mb-6" />

        {/* Indicators */}
        <div className="mb-6">
          <Typography variant="h6" className="font-semibold mb-3">
            Indicators of Compromise
          </Typography>
          <div className="space-y-2">
            {incident.indicators.map((indicator, index) => (
              <Alert key={index} severity="warning" className="text-sm">
                {indicator}
              </Alert>
            ))}
          </div>
        </div>

        <Divider className="mb-6" />

        {/* Timeline */}
        <div className="mb-6">
          <Typography variant="h6" className="font-semibold mb-3">
            Incident Timeline
          </Typography>
          <div className="space-y-3">
            {incident.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                  {event.time}
                </div>
                <div className="flex-grow">
                  <Typography variant="body2">{event.event}</Typography>
                </div>
                <Chip 
                  label={event.status} 
                  size="small" 
                  color={getStatusColor(event.status) as any}
                  variant="outlined"
                />
              </div>
            ))}
          </div>
        </div>

        <Divider className="mb-6" />

        {/* Remediation Steps */}
        <div className="mb-6">
          <Typography variant="h6" className="font-semibold mb-3">
            Remediation Steps
          </Typography>
          <div className="space-y-2">
            {incident.remediationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center">
                  {index + 1}
                </div>
                <Typography variant="body2">{step}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="contained" color="primary">
            Assign to Me
          </Button>
          <Button variant="outlined">
            Add Comment
          </Button>
          <Button variant="outlined">
            Update Status
          </Button>
          <Button variant="outlined" color="error">
            Escalate
          </Button>
        </div>
      </div>
    );
  };

  const renderDialogContent = () => {
    switch (selectedStat) {
      case 'security-score':
        return (
          <div>
            <Typography variant="body1" className="mb-4">
              Current security score: <strong>{securityScore}/100</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-4">
              {securityScoreDetails.trend}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Security Component</strong></TableCell>
                  <TableCell><strong>Score</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Issues</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {securityScoreDetails.components.map((component, index) => (
                  <TableRow key={index}>
                    <TableCell>{component.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{component.score}</span>
                        <LinearProgress 
                          variant="determinate" 
                          value={component.score} 
                          color={component.score >= 80 ? 'success' : component.score >= 60 ? 'warning' : 'error'}
                          className="h-1 w-16"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={component.status}
                        color={component.score >= 80 ? 'success' : component.score >= 60 ? 'warning' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{component.issues}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case 'critical-incidents':
        return (
          <div>
            <Typography variant="body1" className="mb-4">
              <strong>{criticalIncidents}</strong> critical incidents require immediate attention
            </Typography>
            <div className="space-y-4">
              {criticalIncidentsDetails.map((incident) => (
                <Alert key={incident.id} severity="error" className="rounded-lg">
                  <div>
                    <Typography variant="h6" className="font-semibold mb-1">
                      {incident.title}
                    </Typography>
                    <Typography variant="body2" className="mb-2">
                      {incident.description}
                    </Typography>
                    <ChipGroup 
                      chips={[
                        { label: incident.id, variant: 'outlined' },
                        { label: incident.timeAgo, color: 'error' }
                      ]}
                    />
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        );

      case 'resolved-week':
        return (
          <div>
            <Typography variant="body1" className="mb-4">
              <strong>{resolvedThisWeek}</strong> incidents resolved this week (+4 from last week)
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Incident ID</strong></TableCell>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Resolved Date</strong></TableCell>
                  <TableCell><strong>Analyst</strong></TableCell>
                  <TableCell><strong>Resolution Time</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resolvedIncidentsDetails.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <Typography variant="body2" className="font-medium">
                        {incident.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{incident.title}</TableCell>
                    <TableCell>{incident.resolvedDate}</TableCell>
                    <TableCell>{incident.analyst}</TableCell>
                    <TableCell>
                      <Chip label={incident.timeToResolve} size="small" color="success" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case 'pending-reviews':
        return (
          <div>
            <Typography variant="body1" className="mb-4">
              <strong>{pendingReviews}</strong> items awaiting analyst review
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Review ID</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell><strong>Assigned To</strong></TableCell>
                  <TableCell><strong>Days Waiting</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingReviewsDetails.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <Typography variant="body2" className="font-medium">
                        {review.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{review.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={review.priority}
                        color={getPriorityColor(review.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{review.assignedTo}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${review.daysWaiting} days`}
                        color={review.daysWaiting > 5 ? 'error' : review.daysWaiting > 2 ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (selectedStat) {
      case 'security-score': return 'Security Score Details';
      case 'critical-incidents': return 'Critical Incidents Details';
      case 'resolved-week': return 'Resolved Incidents This Week';
      case 'pending-reviews': return 'Pending Reviews Details';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Typography variant="h3" component="h1" className="font-bold text-gray-800 mb-2">
            AI Security Dashboard
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Real-time security monitoring and threat intelligence
          </Typography>
        </div>

        {/* Security Posture Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleStatClick('security-score')}>
            <CardContent className="text-center">
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Security Score
              </Typography>
              <div className="mb-4">
                <Typography variant="h2" className="font-bold text-blue-600">
                  {securityScore}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  out of 100
                </Typography>
              </div>
              <LinearProgress 
                variant="determinate" 
                value={securityScore} 
                color={securityScore >= 80 ? 'success' : securityScore >= 60 ? 'warning' : 'error'}
                className="h-2 rounded"
              />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleStatClick('critical-incidents')}>
            <CardContent className="text-center">
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Critical Incidents
              </Typography>
              <Badge badgeContent={criticalIncidents} color="error" className="mb-2">
                <Typography variant="h2" className="font-bold text-red-600">
                  {criticalIncidents}
                </Typography>
              </Badge>
              <Typography variant="body2" color="textSecondary">
                Requires immediate attention
              </Typography>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleStatClick('resolved-week')}>
            <CardContent className="text-center">
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Resolved This Week
              </Typography>
              <Typography variant="h2" className="font-bold text-green-600 mb-2">
                {resolvedThisWeek}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                +4 from last week
              </Typography>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleStatClick('pending-reviews')}>
            <CardContent className="text-center">
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Pending Reviews
              </Typography>
              <Typography variant="h2" className="font-bold text-orange-600 mb-2">
                {pendingReviews}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Awaiting analyst review
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Drill-down Dialog */}
        <Dialog open={drillDownOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogTitle>
            <Typography variant="h5" className="font-semibold">
              {getDialogTitle()}
            </Typography>
          </DialogTitle>
          <DialogContent className="py-4">
            {renderDialogContent()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Recent Incidents */}
        <Card className="bg-white shadow-lg mb-8">
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5" component="h2" className="font-semibold">
                Recent Security Incidents
              </Typography>
              <Button variant="outlined" size="small">
                View All Incidents
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Incident ID</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Severity</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Detected</strong></TableCell>
                    <TableCell><strong>Affected Asset</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentIncidents.map((incident) => (
                    <TableRow 
                      key={incident.id} 
                      hover
                    >
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                          onClick={() => handleIncidentClick(incident.id)}
                        >
                          {incident.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={incident.severity} 
                          color={getSeverityColor(incident.severity) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={incident.status} 
                          color={getStatusColor(incident.status) as any}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {incident.detected}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="font-medium">
                          {incident.affected}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Remediation Suggestions */}
        <Card className="bg-white shadow-lg">
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Typography variant="h5" component="h2" className="font-semibold mb-2">
                  AI-Powered Remediation Suggestions
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Automated recommendations based on current threat landscape
                </Typography>
              </div>
              <Button variant="contained" color="primary">
                Apply All Critical
              </Button>
            </div>

            <div className="space-y-4">
              {remediationSuggestions.map((suggestion) => (
                <Alert 
                  key={suggestion.id} 
                  severity={suggestion.priority.toLowerCase() === 'critical' ? 'error' : 
                           suggestion.priority.toLowerCase() === 'high' ? 'warning' : 'info'}
                  className="rounded-lg"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-grow">
                      <Typography variant="h6" className="font-semibold mb-2">
                        {suggestion.title}
                      </Typography>
                      <Typography variant="body2" className="mb-3">
                        {suggestion.description}
                      </Typography>
                      <ChipGroup 
                        chips={[
                          { 
                            label: `Priority: ${suggestion.priority}`,
                            color: getPriorityColor(suggestion.priority) as any
                          },
                          { 
                            label: `ETA: ${suggestion.estimatedTime}`,
                            variant: 'outlined'
                          },
                          { 
                            label: `Impact: ${suggestion.impact}`,
                            color: suggestion.impact === 'High' ? 'error' as const : 'info' as const,
                            variant: 'outlined'
                          }
                        ]}
                        className="mb-2"
                      />
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outlined" size="small">
                        Learn More
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="primary"
                        onClick={() => handleApplyFixClick(suggestion)}
                      >
                        Apply Fix
                      </Button>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Typography variant="body2" color="textSecondary">
            Last updated: {new Date().toLocaleString()} | Next scan in 15 minutes
          </Typography>
        </div>
      </div>

      {/* Incident Detail Drawer */}
      <Drawer
        anchor="right"
        open={incidentDrawerOpen}
        onClose={handleCloseIncidentDrawer}
        className="w-full max-w-2xl"
      >
        <div style={{ width: '600px' }} className="h-full overflow-y-auto">
          {renderIncidentDrawerContent()}
        </div>
      </Drawer>

      {/* Apply Fix Dialog */}
      <Dialog open={applyFixOpen} onClose={handleCloseApplyFix} maxWidth="md" fullWidth>
        <DialogTitle>
          <div className="flex items-center gap-3">
            <PlayArrow color="primary" />
            <div>
              <Typography variant="h5" className="font-semibold">
                Apply Security Fix
              </Typography>
              {selectedFix && (
                <Typography variant="body2" color="textSecondary">
                  {selectedFix.title}
                </Typography>
              )}
            </div>
          </div>
        </DialogTitle>

        <DialogContent className="py-6">
          {selectedFix && !isApplyingFix && !fixCompleted && (
            <div>
              {/* Fix Overview */}
              <Alert severity="info" className="mb-6">
                <Typography variant="h6" className="font-semibold mb-2">
                  Ready to Apply Fix
                </Typography>
                <Typography variant="body2" className="mb-3">
                  {selectedFix.description}
                </Typography>
                <ChipGroup 
                  chips={[
                    { 
                      label: `Priority: ${selectedFix.priority}`,
                      color: getPriorityColor(selectedFix.priority) as any
                    },
                    { 
                      label: `Estimated Time: ${selectedFix.estimatedTime}`,
                      variant: 'outlined'
                    },
                    { 
                      label: `Impact: ${selectedFix.impact}`,
                      color: selectedFix.impact === 'High' ? 'error' as const : 'info' as const,
                      variant: 'outlined'
                    }
                  ]}
                />
              </Alert>

              {/* Execution Steps Preview */}
              <Typography variant="h6" className="font-semibold mb-3">
                Execution Steps
              </Typography>
              <div className="space-y-2 mb-6">
                {getFixSteps(selectedFix).map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <Typography variant="body2" className="font-medium">
                        {step.label}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {step.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning/Confirmation */}
              <Alert severity="warning">
                <Typography variant="body2">
                  This operation will make changes to your security configuration. Please ensure you have 
                  appropriate backups and that this change has been approved according to your change management process.
                </Typography>
              </Alert>
            </div>
          )}

          {/* Progress View */}
          {isApplyingFix && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <CircularProgress size={24} />
                  <Typography variant="h6" className="font-semibold">
                    Applying Security Fix...
                  </Typography>
                </div>
                
                <LinearProgress 
                  variant="determinate" 
                  value={fixProgress} 
                  className="h-2 rounded mb-2"
                />
                <Typography variant="body2" color="textSecondary" className="text-center">
                  {Math.round(fixProgress)}% Complete
                </Typography>
              </div>

              {/* Live Step Progress */}
              <Stepper activeStep={activeStep} orientation="vertical">
                {getFixSteps(selectedFix).map((step, index) => (
                  <Step key={index}>
                    <StepLabel 
                      icon={
                        index < activeStep ? (
                          <CheckCircle color="success" />
                        ) : index === activeStep ? (
                          <CircularProgress size={20} />
                        ) : (
                          index + 1
                        )
                      }
                    >
                      <Typography 
                        variant="body2" 
                        className={index <= activeStep ? 'font-medium' : 'text-gray-500'}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption" color="textSecondary">
                        {step.description}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
          )}

          {/* Completion View */}
          {fixCompleted && (
            <div>
              <Alert severity="success" className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle fontSize="large" />
                  <div>
                    <Typography variant="h6" className="font-semibold">
                      Fix Applied Successfully!
                    </Typography>
                    <Typography variant="body2">
                      The security fix has been applied and all validation checks have passed.
                    </Typography>
                  </div>
                </div>
              </Alert>

              {/* Results Summary */}
              <div className="space-y-4">
                <div>
                  <Typography variant="h6" className="font-semibold mb-2">
                    Applied Changes
                  </Typography>
                  <div className="bg-green-50 p-4 rounded border">
                    {selectedFix.id === 1 && (
                      <div className="space-y-2">
                        <Typography variant="body2">✅ 15 critical security patches installed</Typography>
                        <Typography variant="body2">✅ All systems validated and operational</Typography>
                        <Typography variant="body2">✅ Security configurations updated</Typography>
                        <Typography variant="body2">✅ System monitoring active</Typography>
                      </div>
                    )}
                    {selectedFix.id === 2 && (
                      <div className="space-y-2">
                        <Typography variant="body2">✅ Reviewed 247 user permissions</Typography>
                        <Typography variant="body2">✅ Revoked 23 excessive access grants</Typography>
                        <Typography variant="body2">✅ Generated compliance report</Typography>
                        <Typography variant="body2">✅ Notifications sent to affected users</Typography>
                      </div>
                    )}
                    {selectedFix.id === 3 && (
                      <div className="space-y-2">
                        <Typography variant="body2">✅ MFA enabled for 23 administrative accounts</Typography>
                        <Typography variant="body2">✅ Authentication policies updated</Typography>
                        <Typography variant="body2">✅ Setup instructions sent to users</Typography>
                        <Typography variant="body2">✅ Monitoring enabled for MFA adoption</Typography>
                      </div>
                    )}
                    {selectedFix.id === 4 && (
                      <div className="space-y-2">
                        <Typography variant="body2">✅ Updated 12 outdated firewall rules</Typography>
                        <Typography variant="body2">✅ Connectivity tests passed</Typography>
                        <Typography variant="body2">✅ Rule documentation updated</Typography>
                        <Typography variant="body2">✅ Change log entries created</Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-2">
                    Next Steps
                  </Typography>
                  <div className="bg-blue-50 p-4 rounded border">
                    <Typography variant="body2" className="mb-2">
                      📋 Review the detailed execution log
                    </Typography>
                    <Typography variant="body2" className="mb-2">
                      📊 Monitor system performance for 24 hours
                    </Typography>
                    <Typography variant="body2">
                      📝 Update security documentation and runbooks
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>

        <DialogActions className="px-6 py-4">
          {!isApplyingFix && !fixCompleted && (
            <>
              <Button onClick={handleCloseApplyFix} variant="outlined">
                Cancel
              </Button>
              <Button 
                onClick={executeFixSteps} 
                variant="contained" 
                color="primary"
                startIcon={<PlayArrow />}
              >
                Execute Fix
              </Button>
            </>
          )}
          
          {isApplyingFix && (
            <Button disabled variant="outlined">
              Fix in Progress...
            </Button>
          )}

          {fixCompleted && (
            <>
              <Button variant="outlined">
                View Details
              </Button>
              <Button variant="outlined">
                Download Report
              </Button>
              <Button onClick={handleCloseApplyFix} variant="contained" color="success">
                Complete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}