import React, { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Building2,
  User,
  FileText,
  Users,
  Edit2,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Star,
  AlertCircle,
  Plus,
  Trash2,
  LucideIcon,
} from "lucide-react";

// Type definitions
type ProfileType = "individual" | "company";
type KycStatus = "pending" | "under_review" | "approved" | "rejected";
type Gender = "male" | "female" | "other";
type CompanyType = "pvt_ltd" | "llp" | "partnership" | "proprietorship";
type TabType = "personal" | "kyc" | "bank" | "nominee";

interface EditMode {
  email: boolean;
  phone: boolean;
}

interface Nominee {
  fullName: string;
  age: string;
  gender: Gender | "";
  dateOfBirth: string;
  relationship: string;
  isMinor: boolean;
  guardianName: string;
  guardianAge: string;
  guardianGender: Gender | "";
  guardianRelationship: string;
  termsAccepted: boolean;
}

interface FormData {
  // Individual Details
  fullName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  dateOfBirth: string;
  gender: Gender | "";
  state: string;
  city: string;
  profession: string;
  incomeRange: string;
  propertyPreferences: string[];
  contactTimings: string;
  profilePhoto: File | null;

  // Company Details
  companyName: string;
  companyType: CompanyType | "";
  yearsInBusiness: string;
  contactPersonName: string;
  companyAddress: string;
  companyPAN: string;
  gstNumber: string;
  reraId: string;

  // KYC Details
  kycStatus: KycStatus;
  aadhaarNumber: string;
  panNumber: string;

  // Bank Details
  accountNumber: string;
  ifscCode: string;
  bankName: string;

  // Nominee Details
  nominees: Nominee[];
}

interface TabData {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

interface Cities {
  [key: string]: string[];
}

const UserProfile: React.FC = () => {
  const [profileType, setProfileType] = useState<ProfileType>("individual");
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [completionPercentage, setCompletionPercentage] = useState<number>(65);
  const [formData, setFormData] = useState<FormData>({
    // Individual Details
    fullName: "",
    email: "user@example.com",
    emailVerified: true,
    phone: "+91 98765 43210",
    phoneVerified: true,
    dateOfBirth: "",
    gender: "",
    state: "",
    city: "",
    profession: "",
    incomeRange: "",
    propertyPreferences: [],
    contactTimings: "",
    profilePhoto: null,

    // Company Details
    companyName: "",
    companyType: "",
    yearsInBusiness: "",
    contactPersonName: "",
    companyAddress: "",
    companyPAN: "",
    gstNumber: "",
    reraId: "",

    // KYC Details
    kycStatus: "pending",
    aadhaarNumber: "****-****-1234",
    panNumber: "ABCDE****F",

    // Bank Details
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    // Nominee Details
    nominees: [
      {
        fullName: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        relationship: "",
        isMinor: false,
        guardianName: "",
        guardianAge: "",
        guardianGender: "",
        guardianRelationship: "",
        termsAccepted: false,
      },
    ],
  });

  const [editMode, setEditMode] = useState<EditMode>({
    email: false,
    phone: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData, value: any): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePropertyPreferenceChange = (
    preference: string,
    checked: boolean
  ): void => {
    setFormData((prev) => ({
      ...prev,
      propertyPreferences: checked
        ? [...prev.propertyPreferences, preference]
        : prev.propertyPreferences.filter((p) => p !== preference),
    }));
  };

  const handleNomineeChange = (
    index: number,
    field: keyof Nominee,
    value: any
  ): void => {
    setFormData((prev) => ({
      ...prev,
      nominees: prev.nominees.map((nominee, i) =>
        i === index
          ? {
              ...nominee,
              [field]: value,
              isMinor: field === "age" ? parseInt(value) < 18 : nominee.isMinor,
            }
          : nominee
      ),
    }));
  };

  const addNominee = (): void => {
    setFormData((prev) => ({
      ...prev,
      nominees: [
        ...prev.nominees,
        {
          fullName: "",
          age: "",
          gender: "",
          dateOfBirth: "",
          relationship: "",
          isMinor: false,
          guardianName: "",
          guardianAge: "",
          guardianGender: "",
          guardianRelationship: "",
          termsAccepted: false,
        },
      ],
    }));
  };

  const removeNominee = (index: number): void => {
    if (formData.nominees.length > 1) {
      setFormData((prev) => ({
        ...prev,
        nominees: prev.nominees.filter((_, i) => i !== index),
      }));
    }
  };

  const getKycStatusIcon = (status: KycStatus): JSX.Element => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "under_review":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getKycStatusColor = (status: KycStatus): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const states: string[] = [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
  ];

  const cities: Cities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  };

  const tabData: TabData[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "kyc", label: "KYC & Documents", icon: Shield },
    { id: "bank", label: "Bank Details", icon: CreditCard },
    { id: "nominee", label: "Nominee", icon: Users },
  ];

  const propertyPreferences: string[] = [
    "Plots",
    "Flats",
    "Villas",
    "Commercial",
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    handleInputChange("profilePhoto", file);
  };

  const handleEditModeToggle = (field: keyof EditMode): void => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Your Profile
              </h1>
              <p className="text-gray-600 max-w-2xl text-lg">
                Help us provide you with the best real estate experience by
                completing your profile information
              </p>
            </div>

            {/* Progress Card */}
            <Card className="lg:w-80 border border-[#2a2963]/20 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Profile Completion
                  </span>
                  <span className="text-sm font-bold text-[#2a2963]">
                    {completionPercentage}%
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  className="h-3 bg-gray-200"
                >
                  <div
                    className="h-full bg-[#2a2963] rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </Progress>
                <p className="text-xs text-gray-500 mt-3">
                  {completionPercentage < 100
                    ? "Complete your profile to unlock all features"
                    : "Profile completed!"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Profile Type Selection */}
        <Card className="mb-12 border border-gray-200 bg-white">
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Choose Profile Type
              </h2>
              <p className="text-gray-600">
                Select how you want to transact on our platform
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 max-w-md mx-auto">
              <Button
                variant={profileType === "individual" ? "default" : "outline"}
                onClick={() => setProfileType("individual")}
                className={`flex-1 h-16 text-base ${
                  profileType === "individual"
                    ? "bg-[#2a2963] hover:bg-[#1e1f4a]"
                    : "border-2 border-gray-200 hover:border-[#2a2963] hover:bg-[#2a2963]/5"
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Individual
              </Button>
              <Button
                variant={profileType === "company" ? "default" : "outline"}
                onClick={() => setProfileType("company")}
                className={`flex-1 h-16 text-base ${
                  profileType === "company"
                    ? "bg-[#2a2963] hover:bg-[#1e1f4a]"
                    : "border-2 border-gray-200 hover:border-[#2a2963] hover:bg-[#2a2963]/5"
                }`}
              >
                <Building2 className="h-5 w-5 mr-3" />
                Company
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Form with Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-10"
        >
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl h-auto p-2 bg-white border border-gray-200 rounded-xl">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col gap-3 p-6 data-[state=active]:bg-[#2a2963] data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-8">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-8 border-b border-gray-100">
                <CardTitle className="flex items-center gap-4 text-xl">
                  <div className="p-3 bg-[#2a2963]/10 rounded-lg">
                    <User className="h-6 w-6 text-[#2a2963]" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                {/* Profile Photo Section */}
                <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-gray-50 rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2a2963]/20 to-[#2a2963]/40 flex items-center justify-center border-4 border-white">
                      <Camera className="h-10 w-10 text-[#2a2963]" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-[#2a2963] rounded-full">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Upload a clear photo of yourself for verification
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        readOnly={!editMode.email && formData.emailVerified}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`h-12 pl-12 pr-14 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg ${
                          !editMode.email && formData.emailVerified
                            ? "bg-gray-50"
                            : ""
                        }`}
                      />
                      {formData.emailVerified && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditModeToggle("email")}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {formData.emailVerified && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        readOnly={!editMode.phone && formData.phoneVerified}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`h-12 pl-12 pr-14 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg ${
                          !editMode.phone && formData.phoneVerified
                            ? "bg-gray-50"
                            : ""
                        }`}
                      />
                      {formData.phoneVerified && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditModeToggle("phone")}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {formData.phoneVerified && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="dob"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-700"
                    >
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: Gender) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="profession"
                      className="text-sm font-medium text-gray-700"
                    >
                      Profession
                    </Label>
                    <Input
                      id="profession"
                      value={formData.profession}
                      onChange={(e) =>
                        handleInputChange("profession", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="e.g., Software Engineer, Doctor"
                    />
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#2a2963]" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Location Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label
                        htmlFor="state"
                        className="text-sm font-medium text-gray-700"
                      >
                        State
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) =>
                          handleInputChange("state", value)
                        }
                      >
                        <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="city"
                        className="text-sm font-medium text-gray-700"
                      >
                        City
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) =>
                          handleInputChange("city", value)
                        }
                      >
                        <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.state &&
                            cities[formData.state]?.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Income and Preferences */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="income"
                      className="text-sm font-medium text-gray-700"
                    >
                      Annual Income Range
                    </Label>
                    <Select
                      value={formData.incomeRange}
                      onValueChange={(value) =>
                        handleInputChange("incomeRange", value)
                      }
                    >
                      <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<5L">Less than ₹5 Lakhs</SelectItem>
                        <SelectItem value="5-10L">₹5 - ₹10 Lakhs</SelectItem>
                        <SelectItem value="10-20L">₹10 - ₹20 Lakhs</SelectItem>
                        <SelectItem value="20L+">₹20+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="contactTimings"
                      className="text-sm font-medium text-gray-700"
                    >
                      Preferred Contact Timings
                    </Label>
                    <Input
                      id="contactTimings"
                      value={formData.contactTimings}
                      onChange={(e) =>
                        handleInputChange("contactTimings", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="e.g., 9 AM - 6 PM"
                    />
                  </div>
                </div>

                {/* Property Preferences */}
                <div className="space-y-6">
                  <Label className="text-sm font-medium text-gray-700">
                    Property Preferences
                  </Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {propertyPreferences.map((preference) => (
                      <div
                        key={preference}
                        className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.propertyPreferences.includes(preference)
                            ? "border-[#2a2963] bg-[#2a2963]/10"
                            : "border-gray-200 hover:border-[#2a2963]/50"
                        }`}
                        onClick={() =>
                          handlePropertyPreferenceChange(
                            preference,
                            !formData.propertyPreferences.includes(preference)
                          )
                        }
                      >
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={preference}
                            checked={formData.propertyPreferences.includes(
                              preference
                            )}
                            className="data-[state=checked]:bg-[#2a2963] data-[state=checked]:border-[#2a2963]"
                          />
                          <Label
                            htmlFor={preference}
                            className="font-medium cursor-pointer"
                          >
                            {preference}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Information - Conditional */}
                {profileType === "company" && (
                  <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-8 flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-[#2a2963]" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label
                          htmlFor="companyName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter company name"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="companyType"
                          className="text-sm font-medium text-gray-700"
                        >
                          Company Type
                        </Label>
                        <Select
                          value={formData.companyType}
                          onValueChange={(value: CompanyType) =>
                            handleInputChange("companyType", value)
                          }
                        >
                          <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pvt_ltd">
                              Private Limited
                            </SelectItem>
                            <SelectItem value="llp">LLP</SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="proprietorship">
                              Proprietorship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="yearsInBusiness"
                          className="text-sm font-medium text-gray-700"
                        >
                          Years in Business
                        </Label>
                        <Input
                          id="yearsInBusiness"
                          type="number"
                          value={formData.yearsInBusiness}
                          onChange={(e) =>
                            handleInputChange("yearsInBusiness", e.target.value)
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter years"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="contactPersonName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Contact Person Name{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPersonName"
                          value={formData.contactPersonName}
                          onChange={(e) =>
                            handleInputChange(
                              "contactPersonName",
                              e.target.value
                            )
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter contact person name"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="companyPAN"
                          className="text-sm font-medium text-gray-700"
                        >
                          Company PAN
                        </Label>
                        <Input
                          id="companyPAN"
                          value={formData.companyPAN}
                          onChange={(e) =>
                            handleInputChange("companyPAN", e.target.value)
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter PAN number"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="gstNumber"
                          className="text-sm font-medium text-gray-700"
                        >
                          GST Number
                        </Label>
                        <Input
                          id="gstNumber"
                          value={formData.gstNumber}
                          onChange={(e) =>
                            handleInputChange("gstNumber", e.target.value)
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter GST number"
                        />
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <Label
                        htmlFor="companyAddress"
                        className="text-sm font-medium text-gray-700"
                      >
                        Company Address
                      </Label>
                      <Textarea
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={(e) =>
                          handleInputChange("companyAddress", e.target.value)
                        }
                        className="min-h-[120px] border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                        placeholder="Enter complete company address"
                      />
                    </div>

                    <div className="mt-8 space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Company Registration Document
                      </Label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2a2963] transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <Button
                          variant="outline"
                          className="border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white"
                        >
                          Upload Document (PDF/JPG/PNG)
                        </Button>
                        <p className="text-xs text-gray-500 mt-3">
                          Max file size: 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* KYC Details Tab */}
          <TabsContent value="kyc" className="space-y-8">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-8 border-b border-gray-100">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#2a2963]/10 rounded-lg">
                      <Shield className="h-6 w-6 text-[#2a2963]" />
                    </div>
                    KYC & Document Verification
                  </div>
                  <div className="flex items-center gap-3">
                    {getKycStatusIcon(formData.kycStatus)}
                    <Badge className={getKycStatusColor(formData.kycStatus)}>
                      {formData.kycStatus.charAt(0).toUpperCase() +
                        formData.kycStatus.slice(1).replace("_", " ")}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                {/* KYC Status Alert */}
                {formData.kycStatus === "rejected" && (
                  <Alert className="border-red-200 bg-red-50 p-6">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <AlertDescription className="text-red-700 ml-3">
                      Your KYC verification was rejected. Please upload valid
                      documents and resubmit for verification.
                    </AlertDescription>
                  </Alert>
                )}

                {formData.kycStatus === "approved" && (
                  <Alert className="border-green-200 bg-green-50 p-6">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <AlertDescription className="text-green-700 ml-3">
                      Your KYC verification is approved. You can now access all
                      platform features.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Identity Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="aadhaar"
                      className="text-sm font-medium text-gray-700"
                    >
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadhaar"
                      value={formData.aadhaarNumber}
                      readOnly
                      className="h-12 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500">
                      Your Aadhaar number is securely masked
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="pan"
                      className="text-sm font-medium text-gray-700"
                    >
                      PAN Number
                    </Label>
                    <Input
                      id="pan"
                      value={formData.panNumber}
                      readOnly
                      className="h-12 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500">
                      Your PAN number is securely masked
                    </p>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="space-y-8">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#2a2963]" />
                    Document Uploads
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { label: "Aadhaar Front", required: true },
                      { label: "Aadhaar Back", required: true },
                      { label: "PAN Card", required: true },
                      { label: "Passport/DL", required: false },
                    ].map((doc, index) => (
                      <div key={index} className="space-y-4">
                        <Label className="text-sm font-medium text-gray-700">
                          {doc.label}{" "}
                          {doc.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2a2963] transition-colors">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          <p className="text-xs text-gray-500 mt-3">
                            JPG, PNG, PDF (Max 5MB)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Process Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                  <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    Verification Process
                  </h4>
                  <div className="space-y-3 text-sm text-blue-700">
                    <p>• Documents are verified within 24-48 hours</p>
                    <p>
                      • You'll receive an email notification once verification
                      is complete
                    </p>
                    <p>• Ensure all documents are clear and readable</p>
                    <p>
                      • All personal information should match across documents
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bank Details Tab */}
          <TabsContent value="bank" className="space-y-8">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-8 border-b border-gray-100">
                <CardTitle className="flex items-center gap-4 text-xl">
                  <div className="p-3 bg-[#2a2963]/10 rounded-lg">
                    <CreditCard className="h-6 w-6 text-[#2a2963]" />
                  </div>
                  Bank Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <Alert className="border-blue-200 bg-blue-50 p-6">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <AlertDescription className="text-blue-700 ml-3">
                    Bank details are required for property transactions and
                    payouts. All information is securely encrypted.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="accountNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="ifsc"
                      className="text-sm font-medium text-gray-700"
                    >
                      IFSC Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ifsc"
                      value={formData.ifscCode}
                      onChange={(e) =>
                        handleInputChange("ifscCode", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="Enter IFSC code"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="bankName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Bank Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) =>
                        handleInputChange("bankName", e.target.value)
                      }
                      className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                      placeholder="Enter bank name"
                    />
                  </div>
                </div>

                {/* Bank Verification Info */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                  <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    Bank Verification Benefits
                  </h4>
                  <div className="space-y-3 text-sm text-green-700">
                    <p>• Faster transaction processing</p>
                    <p>• Secure and direct payouts</p>
                    <p>• Reduced verification time for large transactions</p>
                    <p>• Enhanced account security</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nominee Details Tab */}
          <TabsContent value="nominee" className="space-y-8">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-8 border-b border-gray-100">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#2a2963]/10 rounded-lg">
                      <Users className="h-6 w-6 text-[#2a2963]" />
                    </div>
                    Nominee Information
                  </div>
                  <Button
                    variant="outline"
                    onClick={addNominee}
                    className="border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Nominee
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <Alert className="border-orange-200 bg-orange-50 p-6">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <AlertDescription className="text-orange-700 ml-3">
                    At least one nominee is mandatory. If the nominee is a minor
                    (below 18), guardian details are required.
                  </AlertDescription>
                </Alert>

                {formData.nominees.map((nominee, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-8 space-y-8 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Nominee {index + 1}
                      </h4>
                      {formData.nominees.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeNominee(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label
                          htmlFor={`nominee-name-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`nominee-name-${index}`}
                          value={nominee.fullName}
                          onChange={(e) =>
                            handleNomineeChange(
                              index,
                              "fullName",
                              e.target.value
                            )
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter nominee name"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor={`nominee-age-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Age <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`nominee-age-${index}`}
                          type="number"
                          value={nominee.age}
                          onChange={(e) =>
                            handleNomineeChange(index, "age", e.target.value)
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="Enter age"
                        />
                        {nominee.isMinor && (
                          <p className="text-xs text-orange-600">
                            Minor detected - Guardian details required
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor={`nominee-gender-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={nominee.gender}
                          onValueChange={(value: Gender) =>
                            handleNomineeChange(index, "gender", value)
                          }
                        >
                          <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor={`nominee-dob-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Date of Birth
                        </Label>
                        <Input
                          id={`nominee-dob-${index}`}
                          type="date"
                          value={nominee.dateOfBirth}
                          onChange={(e) =>
                            handleNomineeChange(
                              index,
                              "dateOfBirth",
                              e.target.value
                            )
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                        />
                      </div>

                      <div className="lg:col-span-2 space-y-3">
                        <Label
                          htmlFor={`nominee-relationship-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Relationship <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`nominee-relationship-${index}`}
                          value={nominee.relationship}
                          onChange={(e) =>
                            handleNomineeChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg"
                          placeholder="e.g., Son, Daughter, Spouse, Father, Mother"
                        />
                      </div>
                    </div>

                    {/* ID Proof Upload */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">
                        ID Proof Upload <span className="text-red-500">*</span>
                      </Label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2a2963] transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <Button
                          variant="outline"
                          className="border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload ID Proof
                        </Button>
                        <p className="text-xs text-gray-500 mt-3">
                          JPG, PDF (Max 5MB)
                        </p>
                      </div>
                    </div>

                    {/* Guardian Details for Minor */}
                    {nominee.isMinor && (
                      <div className="border-t border-orange-200 pt-8 space-y-8 bg-orange-50/50 -mx-8 px-8 -mb-8 pb-8 rounded-b-xl">
                        <h5 className="font-semibold text-orange-800 flex items-center gap-3">
                          <AlertCircle className="h-5 w-5" />
                          Guardian Details (Required for Minor)
                        </h5>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label
                              htmlFor={`guardian-name-${index}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Guardian Full Name{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`guardian-name-${index}`}
                              value={nominee.guardianName}
                              onChange={(e) =>
                                handleNomineeChange(
                                  index,
                                  "guardianName",
                                  e.target.value
                                )
                              }
                              className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg bg-white"
                              placeholder="Enter guardian name"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label
                              htmlFor={`guardian-age-${index}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Guardian Age{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`guardian-age-${index}`}
                              type="number"
                              value={nominee.guardianAge}
                              onChange={(e) =>
                                handleNomineeChange(
                                  index,
                                  "guardianAge",
                                  e.target.value
                                )
                              }
                              className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg bg-white"
                              placeholder="Enter guardian age"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label
                              htmlFor={`guardian-gender-${index}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Guardian Gender{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={nominee.guardianGender}
                              onValueChange={(value: Gender) =>
                                handleNomineeChange(
                                  index,
                                  "guardianGender",
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="h-12 border border-gray-300 focus:border-[#2a2963] rounded-lg bg-white">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label
                              htmlFor={`guardian-relationship-${index}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Relationship with Nominee{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`guardian-relationship-${index}`}
                              value={nominee.guardianRelationship}
                              onChange={(e) =>
                                handleNomineeChange(
                                  index,
                                  "guardianRelationship",
                                  e.target.value
                                )
                              }
                              className="h-12 border border-gray-300 focus:border-[#2a2963] focus:ring-[#2a2963]/20 rounded-lg bg-white"
                              placeholder="e.g., Father, Mother, Uncle"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Terms & Conditions */}
                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={`terms-${index}`}
                        checked={nominee.termsAccepted}
                        onCheckedChange={(checked: boolean) =>
                          handleNomineeChange(index, "termsAccepted", checked)
                        }
                        className="data-[state=checked]:bg-[#2a2963] data-[state=checked]:border-[#2a2963] mt-1"
                      />
                      <Label
                        htmlFor={`terms-${index}`}
                        className="text-sm leading-relaxed text-gray-700"
                      >
                        I accept the terms and conditions for nominee
                        registration. I confirm that the information provided is
                        accurate and complete. I understand that this nomination
                        will be legally binding.
                      </Label>
                    </div>
                  </div>
                ))}

                {formData.nominees.length === 0 && (
                  <Alert className="border-red-200 bg-red-50 p-6">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <AlertDescription className="text-red-700 ml-3">
                      At least one nominee is mandatory for every user profile.
                      Please add a nominee to continue.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 pb-20">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Changes are automatically saved</span>
          </div>

          <div className="flex space-x-6">
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 border border-[#2a2963] text-[#2a2963] hover:bg-[#2a2963] hover:text-white transition-all duration-200"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Draft
            </Button>
            <Button
              size="lg"
              className="px-10 py-4 bg-[#2a2963] hover:bg-[#1e1f4a] text-white transition-all duration-200"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
