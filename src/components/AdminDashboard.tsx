import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  Building, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  Settings,
  Shield,
  CreditCard,
  MessageCircle,
  Eye,
  Edit,
  Download,
  Upload,
  Search
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const dashboardStats = {
    totalUsers: 25430,
    pendingKyc: 156,
    activeListings: 89,
    pendingApprovals: 23,
    totalTransactions: 15680,
    monthlyRevenue: 2450000
  };

  const pendingKycUsers = [
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@email.com',
      phone: '+91 9876543210',
      submittedDate: '2024-07-20',
      documents: ['Aadhar', 'PAN', 'Selfie'],
      status: 'pending'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@email.com',
      phone: '+91 8765432109',
      submittedDate: '2024-07-19',
      documents: ['Aadhar', 'Passport', 'Selfie'],
      status: 'pending'
    }
  ];

  const pendingProperties = [
    {
      id: '1',
      name: 'Sobha Dream Gardens',
      seller: 'Sobha Developers',
      location: 'Thanisandra, Bangalore',
      price: '₹75 Lakh',
      submittedDate: '2024-07-18',
      status: 'pending_review',
      type: 'Residential',
      isTokenized: true
    },
    {
      id: '2',
      name: 'Tech Park Plaza',
      seller: 'Corporate Builders',
      location: 'Electronic City, Bangalore',
      price: '₹3.2 Cr',
      submittedDate: '2024-07-17',
      status: 'pending_legal',
      type: 'Commercial',
      isTokenized: true
    }
  ];

  const supportTickets = [
    {
      id: 'TK001',
      user: 'john@email.com',
      subject: 'Payment verification issue',
      priority: 'High',
      status: 'Open',
      created: '2024-07-20',
      category: 'Payment'
    },
    {
      id: 'TK002',
      user: 'sarah@email.com',
      subject: 'KYC document rejection query',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-07-19',
      category: 'KYC'
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      user: 'rahul@email.com',
      property: 'Prestige Lakeside Heights',
      type: 'Purchase',
      amount: 50000,
      status: 'Completed',
      date: '2024-07-20'
    },
    {
      id: '2',
      user: 'priya@email.com',
      property: 'Brigade Gateway',
      type: 'Deposit',
      amount: 25000,
      status: 'Pending',
      date: '2024-07-19'
    }
  ];

  const handleKycAction = (userId: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    toast.success(`KYC ${actionText} successfully`);
  };

  const handlePropertyAction = (propertyId: string, action: 'approve' | 'reject' | 'request_changes') => {
    const actionText = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'changes requested for';
    toast.success(`Property ${actionText} successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform operations, approvals, and compliance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending KYC</p>
                  <p className="text-2xl text-gray-900">{dashboardStats.pendingKyc}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl text-gray-900">{dashboardStats.activeListings}</p>
                </div>
                <Building className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl text-gray-900">{dashboardStats.pendingApprovals}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Transactions</p>
                  <p className="text-2xl text-gray-900">{dashboardStats.totalTransactions.toLocaleString()}</p>
                </div>
                <CreditCard className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl text-gray-900">₹{(dashboardStats.monthlyRevenue / 100000).toFixed(1)}L</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kyc">KYC Review</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-900">KYC Reviews</p>
                        <p className="text-sm text-orange-700">{dashboardStats.pendingKyc} users waiting</p>
                      </div>
                      <Button size="sm" onClick={() => setSelectedTab('kyc')}>
                        Review
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">Property Approvals</p>
                        <p className="text-sm text-blue-700">{dashboardStats.pendingApprovals} properties pending</p>
                      </div>
                      <Button size="sm" onClick={() => setSelectedTab('properties')}>
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{transaction.type}</p>
                          <p className="text-xs text-gray-600">{transaction.user}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">₹{transaction.amount.toLocaleString()}</p>
                          <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* KYC Review Tab */}
          <TabsContent value="kyc" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  KYC Verification Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingKycUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-600">{user.phone}</p>
                          <p className="text-xs text-gray-500">Submitted: {user.submittedDate}</p>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Documents Submitted:</p>
                        <div className="flex gap-2">
                          {user.documents.map((doc) => (
                            <Badge key={doc} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.info('Document viewer would open here')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Documents
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleKycAction(user.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleKycAction(user.id, 'reject')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Property Approval Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{property.name}</h3>
                          <p className="text-sm text-gray-600">By: {property.seller}</p>
                          <p className="text-sm text-gray-600">{property.location}</p>
                          <p className="text-xs text-gray-500">Submitted: {property.submittedDate}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {property.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <p className="text-lg font-semibold text-gray-900">{property.price}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium">{property.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tokenized:</span>
                          <span className="ml-2 font-medium">{property.isTokenized ? 'Yes' : 'No'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {property.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.info('Property details would open here')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handlePropertyAction(property.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handlePropertyAction(property.id, 'request_changes')}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Request Changes
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => handlePropertyAction(property.id, 'reject')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Transaction Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Search transactions..." />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.type}</h4>
                          <p className="text-sm text-gray-600">User: {transaction.user}</p>
                          <p className="text-sm text-gray-600">Property: {transaction.property}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                          <Badge 
                            variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                            className="mb-2"
                          >
                            {transaction.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Support Ticket Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                          <p className="text-sm text-gray-600">User: {ticket.user}</p>
                          <p className="text-xs text-gray-500">Created: {ticket.created}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'default' : 'secondary'}
                            className="mb-1"
                          >
                            {ticket.priority}
                          </Badge>
                          <p className="text-sm text-gray-600">{ticket.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          {ticket.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            Respond
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Platform Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Minimum Deposit Amount (₹)</Label>
                    <Input defaultValue="5000" />
                  </div>
                  <div>
                    <Label>Maximum Units per User (%)</Label>
                    <Input defaultValue="10" />
                  </div>
                  <div>
                    <Label>Platform Commission (%)</Label>
                    <Input defaultValue="2.5" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button className="w-full" variant="outline">
                    Generate Reports
                  </Button>
                  <Button className="w-full" variant="outline">
                    Backup Database
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;