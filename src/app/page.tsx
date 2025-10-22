"use client";

import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from '@mui/material';

// Mock data for the dashboard
const revenueData = {
  totalRevenue: 245680,
  monthlyRevenue: 28940,
  averageOrderValue: 180,
  totalCustomers: 1247
};

const customersData = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    status: 'Active',
    totalSpent: 4250,
    lastOrder: '2024-01-15'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    status: 'Active',
    totalSpent: 2180,
    lastOrder: '2024-01-12'
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    status: 'Inactive',
    totalSpent: 890,
    lastOrder: '2023-11-08'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    status: 'Active',
    totalSpent: 3560,
    lastOrder: '2024-01-14'
  },
  {
    id: 5,
    name: 'Emma Brown',
    email: 'emma.brown@email.com',
    status: 'Active',
    totalSpent: 1750,
    lastOrder: '2024-01-10'
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank.miller@email.com',
    status: 'Inactive',
    totalSpent: 340,
    lastOrder: '2023-12-02'
  }
];

// Revenue metric card component
function RevenueCard({ title, value, prefix = '', suffix = '' }: {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Card sx={{ minWidth: 200, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="primary">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Customer status chip component
function StatusChip({ status }: { status: string }) {
  const color = status === 'Active' ? 'success' : 'default';
  return <Chip label={status} color={color} size="small" />;
}

export default function Home() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Internal Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Overview of customer data and revenue metrics
        </Typography>
      </div>

      {/* Revenue Metrics Section */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="h5" gutterBottom>
          Revenue Overview
        </Typography>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <RevenueCard
            title="Total Revenue"
            value={revenueData.totalRevenue}
            prefix="$"
          />
          <RevenueCard
            title="Monthly Revenue"
            value={revenueData.monthlyRevenue}
            prefix="$"
          />
          <RevenueCard
            title="Average Order Value"
            value={revenueData.averageOrderValue}
            prefix="$"
          />
          <RevenueCard
            title="Total Customers"
            value={revenueData.totalCustomers}
          />
        </div>
      </div>

      {/* Customers Table Section */}
      <div>
        <Typography variant="h5" gutterBottom>
          Customer Details
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }} aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Customer Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight="bold">
                    Total Spent
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Last Order
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersData.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2">
                      {customer.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={customer.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${customer.totalSpent.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {customer.lastOrder}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}
