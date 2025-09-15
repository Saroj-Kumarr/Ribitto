import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  User,
  Upload,
  Heart,
  Eye,
  Wallet,
  FileText,
  Clock,
  MessageCircle,
  TrendingUp,
  Coins,
  Download,
  Bell,
  CreditCard,
  History,
  Settings,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface UserDashboardProps {
  user: any;
  userType: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, userType }) => {
  const [kycDocuments, setKycDocuments] = useState({
    idProof: null,
    addressProof: null,
    selfie: null,
  });

  // Mock data
  const savedProperties = [
    {
      id: "1",
      name: "Prestige Lakeside Heights",
      location: "Whitefield, Bangalore",
      price: "₹85 Lakh",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      status: "Live",
    },
    {
      id: "2",
      name: "Brigade Gateway",
      location: "Rajajinagar, Bangalore",
      price: "₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
      status: "Pre-Launch",
    },
  ];

  const watchList = [
    {
      id: "1",
      name: "Prestige Lakeside Heights",
      unitsSelected: 50,
      depositPaid: 25000,
      status: "Pending Allocation",
      bidEndDate: "2024-08-31",
    },
  ];

  const holdings = [
    {
      id: "1",
      name: "Sobha Dream Acres",
      unitsOwned: 75,
      totalUnits: 1300,
      investmentValue: 37500,
      currentValue: 41250,
      yield: "7.8%",
      monthlyIncome: 245,
    },
    {
      id: "2",
      name: "Embassy Tech Village",
      unitsOwned: 120,
      totalUnits: 3600,
      investmentValue: 60000,
      currentValue: 68400,
      yield: "11.5%",
      monthlyIncome: 575,
    },
  ];

  const transactions = [
    {
      id: "1",
      type: "Deposit",
      amount: 25000,
      property: "Prestige Lakeside Heights",
      date: "2024-07-15",
      status: "Completed",
    },
    {
      id: "2",
      type: "Rental Credit",
      amount: 820,
      property: "Multiple Properties",
      date: "2024-07-01",
      status: "Completed",
    },
    {
      id: "3",
      type: "Balance Payment",
      amount: 35000,
      property: "Sobha Dream Acres",
      date: "2024-06-20",
      status: "Completed",
    },
  ];

  const supportTickets = [
    {
      id: "TK001",
      subject: "Payment Issue",
      status: "Open",
      created: "2024-07-20",
      priority: "High",
    },
    {
      id: "TK002",
      subject: "KYC Document Query",
      status: "Resolved",
      created: "2024-07-18",
      priority: "Medium",
    },
  ];

  const handleKycUpload = (documentType: string, file: File | null) => {
    setKycDocuments((prev) => ({ ...prev, [documentType]: file }));
    if (file) {
      toast.success(`${documentType} uploaded successfully`);
    }
  };

  const totalInvestment = holdings.reduce(
    (sum, holding) => sum + holding.investmentValue,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, holding) => sum + holding.currentValue,
    0
  );
  const totalMonthlyIncome = holdings.reduce(
    (sum, holding) => sum + holding.monthlyIncome,
    0
  );
  const totalGains = totalCurrentValue - totalInvestment;
  const totalGainsPercentage =
    totalInvestment > 0 ? (totalGains / totalInvestment) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <div className="flex items-center space-x-4">
            <Badge
              variant={user?.kycStatus === "approved" ? "default" : "secondary"}
              className="capitalize"
            >
              {user?.kycStatus === "approved"
                ? "KYC Verified"
                : `KYC ${user?.kycStatus || "Not Started"}`}
            </Badge>
            <span className="text-gray-600">
              {userType === "kyc"
                ? "Full Access"
                : "Limited Access - Complete KYC to unlock all features"}
            </span>
          </div>
        </div>

        {/* Quick Stats for KYC Users */}
        {userType === "kyc" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Investment</p>
                    <p className="text-2xl text-gray-900">
                      ₹{totalInvestment.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="text-2xl text-gray-900">
                      ₹{totalCurrentValue.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${
                        totalGains >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {totalGains >= 0 ? "+" : ""}₹{totalGains.toLocaleString()}{" "}
                      ({totalGainsPercentage.toFixed(1)}%)
                    </p>
                  </div>
                  <Coins className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Income</p>
                    <p className="text-2xl text-gray-900">
                      ₹{totalMonthlyIncome}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Wallet Balance</p>
                    <p className="text-2xl text-gray-900">
                      ₹{user?.walletBalance?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <Wallet className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs
          defaultValue={userType === "kyc" ? "dashboard" : "profile"}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            {userType === "kyc" && (
              <>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="watchlist">Watch List</TabsTrigger>
                <TabsTrigger value="holdings">Holdings</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </>
            )}
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={user?.name || ""} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={user?.email || ""} readOnly />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={user?.phone || ""} readOnly />
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    KYC Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.kycStatus === "approved" ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-green-900 mb-2">
                        KYC Verified
                      </h3>
                      <p className="text-green-700">
                        Your documents have been verified successfully.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Verification Status</span>
                        <Badge variant="secondary" className="capitalize">
                          {user?.kycStatus || "Not Started"}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label>ID Proof (Aadhar/PAN)</Label>
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) =>
                              handleKycUpload(
                                "idProof",
                                e.target.files?.[0] || null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Address Proof</Label>
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) =>
                              handleKycUpload(
                                "addressProof",
                                e.target.files?.[0] || null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Selfie</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleKycUpload(
                                "selfie",
                                e.target.files?.[0] || null
                              )
                            }
                          />
                        </div>
                      </div>

                      <Button className="w-full">
                        Submit for Verification
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Verification typically takes 24-48 hours
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Saved Properties Tab */}
          <TabsContent value="saved" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Saved Properties ({savedProperties.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative">
                        <ImageWithFallback
                          src={property.image}
                          alt={property.name}
                          className="w-full h-32 object-cover"
                        />
                        <Badge
                          className="absolute top-2 right-2"
                          variant="outline"
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {property.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {property.location}
                        </p>
                        <p className="font-semibold text-gray-900 mb-3">
                          {property.price}
                        </p>
                        <div className="flex gap-2">
                          <Button asChild size="sm" className="flex-1">
                            <Link to={`/property/${property.id}`}>View</Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KYC User Exclusive Tabs */}
          {userType === "kyc" && (
            <>
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Invested</span>
                          <span className="font-semibold">
                            ₹{totalInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current Value</span>
                          <span className="font-semibold">
                            ₹{totalCurrentValue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Gains</span>
                          <span
                            className={`font-semibold ${
                              totalGains >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {totalGains >= 0 ? "+" : ""}₹
                            {totalGains.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={Math.abs(totalGainsPercentage)}
                          className="h-2"
                        />
                        <p className="text-sm text-gray-600 text-center">
                          {totalGainsPercentage.toFixed(1)}%{" "}
                          {totalGains >= 0 ? "gain" : "loss"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between py-2 border-b last:border-b-0"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {transaction.type}
                              </p>
                              <p className="text-xs text-gray-600">
                                {transaction.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">
                                ₹{transaction.amount.toLocaleString()}
                              </p>
                              <Badge variant="outline" className="text-xs">
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

              {/* Watch List Tab */}
              <TabsContent value="watchlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Properties You're Bidding On
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {watchList.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Units Selected: {item.unitsSelected}
                              </p>
                            </div>
                            <Badge variant="secondary">{item.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Deposit Paid:
                              </span>
                              <span className="ml-2 font-medium">
                                ₹{item.depositPaid.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Bid Ends:</span>
                              <span className="ml-2 font-medium">
                                {item.bidEndDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              Modify Bid
                            </Button>
                            <Button variant="destructive" size="sm">
                              Cancel Bid
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Holdings Tab */}
              <TabsContent value="holdings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="w-5 h-5 mr-2" />
                      Your Property Holdings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {holdings.map((holding) => (
                        <div key={holding.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {holding.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {holding.unitsOwned} units (
                                {(
                                  (holding.unitsOwned / holding.totalUnits) *
                                  100
                                ).toFixed(2)}
                                % ownership)
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {holding.yield} yield
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-600">Invested:</span>
                              <p className="font-medium">
                                ₹{holding.investmentValue.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Current Value:
                              </span>
                              <p className="font-medium">
                                ₹{holding.currentValue.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Monthly Income:
                              </span>
                              <p className="font-medium text-green-600">
                                ₹{holding.monthlyIncome}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Gains:</span>
                              <p className="font-medium text-green-600">
                                +₹
                                {(
                                  holding.currentValue - holding.investmentValue
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Download Contract
                            </Button>
                            <Button variant="outline" size="sm">
                              Resell Units
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Wallet className="w-5 h-5 mr-2" />
                        Wallet Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <p className="text-3xl text-gray-900 mb-2">
                          ₹{user?.walletBalance?.toLocaleString() || "0"}
                        </p>
                        <p className="text-gray-600 mb-6">Available Balance</p>
                        <div className="grid grid-cols-2 gap-3">
                          <Button>Add Money</Button>
                          <Button variant="outline">Withdraw</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between py-2 border-b last:border-b-0"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {transaction.type}
                              </p>
                              <p className="text-xs text-gray-600">
                                {transaction.property}
                              </p>
                              <p className="text-xs text-gray-500">
                                {transaction.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">
                                ₹{transaction.amount.toLocaleString()}
                              </p>
                              <Badge variant="outline" className="text-xs">
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

              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="w-5 h-5 mr-2" />
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{transaction.type}</p>
                            <p className="text-sm text-gray-600">
                              {transaction.property}
                            </p>
                            <p className="text-xs text-gray-500">
                              {transaction.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{transaction.amount.toLocaleString()}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          {/* Support Tab */}
          <TabsContent value="support" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Support Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-gray-600">
                            ID: {ticket.id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {ticket.created}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              ticket.status === "Open"
                                ? "destructive"
                                : "default"
                            }
                            className="mb-1"
                          >
                            {ticket.status}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            {ticket.priority}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Create New Ticket</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Our support team is available
                    </p>
                    <p className="font-medium">Monday - Friday, 9 AM - 6 PM</p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Email Support
                    </Button>
                    <Button variant="outline" className="w-full">
                      Live Chat
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
