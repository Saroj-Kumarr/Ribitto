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
  Building, 
  Upload, 
  Eye, 
  TrendingUp, 
  FileText, 
  BarChart3,
  Settings,
  Plus,
  Edit,
  MapPin,
  Calendar,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface SellerDashboardProps {
  user: any;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ user }) => {
  const [showNewListing, setShowNewListing] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: 'residential',
    location: '',
    price: '',
    description: '',
    area: '',
    bedrooms: '',
    amenities: '',
    isTokenized: false,
    totalTokens: '',
    tokenPrice: '',
    payoutFrequency: 'quarterly'
  });

  // Mock data
  const companyProfile = {
    name: 'Premium Properties Ltd.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100',
    contact: '+91 9876543210',
    email: 'contact@premiumproperties.com',
    reraId: 'RERA123456789',
    verificationStatus: 'approved'
  };

  const listings = [
    {
      id: '1',
      name: 'Prestige Lakeside Heights',
      location: 'Whitefield, Bangalore',
      price: '₹85 Lakh',
      type: 'Residential',
      status: 'Live',
      views: 1250,
      inquiries: 45,
      tokensLeft: 350,
      totalTokens: 1000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'
    },
    {
      id: '2',
      name: 'Corporate Plaza',
      location: 'Electronic City, Bangalore',
      price: '₹2.5 Cr',
      type: 'Commercial',
      status: 'Pending Approval',
      views: 0,
      inquiries: 0,
      tokensLeft: 5000,
      totalTokens: 5000,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    }
  ];

  const analytics = {
    totalListings: 5,
    activeListings: 3,
    totalViews: 12500,
    totalRevenue: 125000,
    averageYield: 8.5
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Property listing submitted for approval');
    setShowNewListing(false);
    setNewProperty({
      name: '',
      type: 'residential',
      location: '',
      price: '',
      description: '',
      area: '',
      bedrooms: '',
      amenities: '',
      isTokenized: false,
      totalTokens: '',
      tokenPrice: '',
      payoutFrequency: 'quarterly'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your property listings and track performance</p>
          </div>
          <Button onClick={() => setShowNewListing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Listing
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Listings</p>
                  <p className="text-2xl text-gray-900">{analytics.totalListings}</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl text-gray-900">{analytics.activeListings}</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl text-gray-900">₹{analytics.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Yield</p>
                  <p className="text-2xl text-gray-900">{analytics.averageYield}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback
                          src={listing.image}
                          alt={listing.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900">{listing.name}</h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {listing.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={listing.status === 'Live' ? 'default' : 'secondary'}
                              >
                                {listing.status}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Price:</span>
                              <span className="ml-2 font-medium">{listing.price}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Views:</span>
                              <span className="ml-2 font-medium">{listing.views}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Inquiries:</span>
                              <span className="ml-2 font-medium">{listing.inquiries}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Tokens Left:</span>
                              <span className="ml-2 font-medium">{listing.tokensLeft}/{listing.totalTokens}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Company Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={companyProfile.logo}
                    alt="Company Logo"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{companyProfile.name}</h3>
                    <Badge 
                      variant={companyProfile.verificationStatus === 'approved' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {companyProfile.verificationStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input value={companyProfile.name} readOnly />
                  </div>
                  <div>
                    <Label>Contact Number</Label>
                    <Input value={companyProfile.contact} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={companyProfile.email} readOnly />
                  </div>
                  <div>
                    <Label>RERA ID</Label>
                    <Input value={companyProfile.reraId} readOnly />
                  </div>
                </div>

                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Property Views</span>
                      <span className="font-semibold">{analytics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Yield</span>
                      <span className="font-semibold">{analytics.averageYield}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-semibold text-green-600">₹{analytics.totalRevenue.toLocaleString()}</span>
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
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-sm">New inquiry received</p>
                        <p className="text-xs text-gray-600">Prestige Lakeside Heights</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-sm">Property view milestone</p>
                        <p className="text-xs text-gray-600">1000 views reached</p>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Business Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">RERA Certificate</h4>
                      <p className="text-sm text-gray-600">Valid until: Dec 2025</p>
                    </div>
                    <Badge variant="default">Verified</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Business License</h4>
                      <p className="text-sm text-gray-600">Issued: Jan 2024</p>
                    </div>
                    <Badge variant="default">Verified</Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* New Listing Modal */}
        {showNewListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Property Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateListing} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Property Name</Label>
                      <Input
                        value={newProperty.name}
                        onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                        placeholder="Enter property name"
                        required
                      />
                    </div>
                    <div>
                      <Label>Property Type</Label>
                      <Select value={newProperty.type} onValueChange={(value) => setNewProperty({...newProperty, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                      placeholder="Enter location"
                      required
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={newProperty.description}
                      onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                      placeholder="Describe your property"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Price (₹)</Label>
                      <Input
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                        placeholder="Enter price"
                        required
                      />
                    </div>
                    <div>
                      <Label>Area (sq ft)</Label>
                      <Input
                        value={newProperty.area}
                        onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                        placeholder="Enter area"
                      />
                    </div>
                    <div>
                      <Label>Bedrooms</Label>
                      <Input
                        value={newProperty.bedrooms}
                        onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                        placeholder="e.g., 2 BHK"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="tokenized"
                        checked={newProperty.isTokenized}
                        onChange={(e) => setNewProperty({...newProperty, isTokenized: e.target.checked})}
                      />
                      <Label htmlFor="tokenized">Enable Tokenization</Label>
                    </div>

                    {newProperty.isTokenized && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Total Tokens</Label>
                          <Input
                            value={newProperty.totalTokens}
                            onChange={(e) => setNewProperty({...newProperty, totalTokens: e.target.value})}
                            placeholder="Enter total tokens"
                          />
                        </div>
                        <div>
                          <Label>Price per Token (₹)</Label>
                          <Input
                            value={newProperty.tokenPrice}
                            onChange={(e) => setNewProperty({...newProperty, tokenPrice: e.target.value})}
                            placeholder="Enter token price"
                          />
                        </div>
                        <div>
                          <Label>Payout Frequency</Label>
                          <Select value={newProperty.payoutFrequency} onValueChange={(value) => setNewProperty({...newProperty, payoutFrequency: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowNewListing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit for Approval
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;