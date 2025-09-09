"use client";

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const dashboardStats = [
  { title: 'Total Users', value: '2,432', change: '+12%', icon: <PersonIcon />, color: '#1976d2' },
  { title: 'Revenue', value: '$43,210', change: '+8%', icon: <AttachMoneyIcon />, color: '#2e7d32' },
  { title: 'Orders', value: '1,256', change: '+23%', icon: <ShoppingCartIcon />, color: '#ed6c02' },
  { title: 'Products', value: '532', change: '+5%', icon: <InventoryIcon />, color: '#9c27b0' },
];

const recentOrders = [
  { id: '#12345', customer: 'John Doe', amount: '$250.00', status: 'Completed', date: '2024-01-15' },
  { id: '#12346', customer: 'Jane Smith', amount: '$180.50', status: 'Processing', date: '2024-01-15' },
  { id: '#12347', customer: 'Bob Johnson', amount: '$92.00', status: 'Pending', date: '2024-01-14' },
  { id: '#12348', customer: 'Alice Brown', amount: '$315.25', status: 'Completed', date: '2024-01-14' },
  { id: '#12349', customer: 'Charlie Wilson', amount: '$127.75', status: 'Processing', date: '2024-01-13' },
];

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, active: true },
  { text: 'Users', icon: <PeopleIcon />, active: false },
  { text: 'Orders', icon: <ShoppingCartIcon />, active: false },
  { text: 'Analytics', icon: <BarChartIcon />, active: false },
  { text: 'Settings', icon: <SettingsIcon />, active: false },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const drawer = (
    <div>
      <div className="p-4">
        <Typography variant="h6" noWrap component="div" className="font-bold">
          Admin Panel
        </Typography>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={item.active} className={item.active ? 'bg-blue-50' : ''}>
              <ListItemIcon className={item.active ? 'text-blue-600' : ''}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                className={item.active ? 'text-blue-600' : ''}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div className="flex items-center space-x-2">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        
        {/* Dashboard Stats Cards */}
        <div className="mb-6">
          <Grid container spacing={3}>
            {dashboardStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="h-full">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" component="div" className="font-bold">
                          {stat.value}
                        </Typography>
                        <div className="flex items-center mt-2">
                          <TrendingUpIcon className="text-green-500 mr-1" fontSize="small" />
                          <Typography variant="body2" className="text-green-500 font-medium">
                            {stat.change}
                          </Typography>
                        </div>
                      </div>
                      <div 
                        className="p-3 rounded-full"
                        style={{ backgroundColor: stat.color + '20', color: stat.color }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" className="mb-4 font-semibold">
              Recent Orders
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold">Order ID</TableCell>
                    <TableCell className="font-semibold">Customer</TableCell>
                    <TableCell className="font-semibold">Amount</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell className="font-semibold">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell className="font-black">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="font-medium">{order.amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          size="small"
                          color={getStatusColor(order.status) as any}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}