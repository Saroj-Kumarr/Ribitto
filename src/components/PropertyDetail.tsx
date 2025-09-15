import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Calculator, 
  Heart, 
  Share2, 
  Coins,
  Building,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Trees,
  Clock,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const [investmentAmount, setInvestmentAmount] = useState('50000');
  const [savedToFavorites, setSavedToFavorites] = useState(false);

  // Mock property data (in real app, this would come from API)
  const property = {
    id: '1',
    name: 'Prestige Lakeside Heights',
    location: 'Whitefield, Bangalore',
    price: 8500000, // ₹85 Lakh
    priceFormatted: '₹85 Lakh',
    tokens: 1000,
    tokenPrice: 850,
    tokensSold: 650,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    type: 'Residential',
    status: 'Live',
    yield: 8.5,
    developer: 'Prestige Group',
    tags: ['Hot', 'High Yield'],
    area: '1200 sq ft',
    bedrooms: '2 BHK',
    description: 'Prestige Lakeside Heights offers premium 2 and 3 BHK apartments with stunning lake views. Located in the heart of Whitefield, this project combines luxury living with excellent connectivity to major IT hubs.',
    amenities: [
      { name: 'Swimming Pool', icon: '🏊' },
      { name: 'Gym', icon: '💪' },
      { name: 'Security', icon: '🛡️' },
      { name: 'Parking', icon: '🚗' },
      { name: 'Garden', icon: '🌳' },
      { name: 'Wi-Fi', icon: '📶' }
    ],
    specifications: {
      'Total Area': '1200 sq ft',
      'Carpet Area': '950 sq ft',
      'Bedrooms': '2',
      'Bathrooms': '2',
      'Balconies': '2',
      'Floor': '5th Floor',
      'Facing': 'East',
      'Age': 'Under Construction'
    },
    bidDetails: {
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      minDeposit: 5000,
      maxUnitsPerUser: 100
    },
    contact: {
      manager: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh@realestate.com'
    }
  };

  const calculateReturns = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const tokensCanBuy = Math.floor(amount / property.tokenPrice);
    const investmentPercentage = (tokensCanBuy / property.tokens) * 100;
    const annualReturn = (amount * property.yield) / 100;
    const monthlyReturn = annualReturn / 12;
    
    return {
      tokensCanBuy,
      investmentPercentage: investmentPercentage.toFixed(2),
      annualReturn: annualReturn.toFixed(0),
      monthlyReturn: monthlyReturn.toFixed(0),
      fiveYearValue: (amount + (annualReturn * 5)).toFixed(0)
    };
  };

  const returns = calculateReturns();
  const tokensSoldPercentage = (property.tokensSold / property.tokens) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li><span className="text-gray-400 mx-2">/</span></li>
            <li><Link to="/search" className="text-gray-500 hover:text-gray-700">Properties</Link></li>
            <li><span className="text-gray-400 mx-2">/</span></li>
            <li className="text-gray-900">{property.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {property.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant={tag === 'Hot' ? 'destructive' : 'secondary'}
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline">{property.status}</Badge>
                  </div>
                  <h1 className="text-3xl mb-2 text-gray-900">{property.name}</h1>
                  <p className="text-gray-600 flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  <p className="text-sm text-gray-500">{property.area} • {property.bedrooms}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSavedToFavorites(!savedToFavorites)}
                    className={savedToFavorites ? 'text-red-600' : ''}
                  >
                    <Heart className={`w-4 h-4 ${savedToFavorites ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-semibold text-gray-900">{property.priceFormatted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Yield</p>
                  <p className="text-xl font-semibold text-green-600">{property.yield}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Token Price</p>
                  <p className="text-xl font-semibold text-gray-900">₹{property.tokenPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Developer</p>
                  <p className="text-xl font-semibold text-gray-900">{property.developer}</p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl mb-4 text-gray-900">Property Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.images.map((image, index) => (
                  <ImageWithFallback
                    key={index}
                    src={image}
                    alt={`${property.name} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Details Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div>
                    <h3 className="text-lg mb-3 text-gray-900">About This Property</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>
                    
                    <h3 className="text-lg mb-3 text-gray-900">Investment Highlights</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        High appreciation potential in Whitefield
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-blue-500" />
                        Premium build quality by renowned developer
                      </li>
                      <li className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        Strategic location near IT corridors
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity.name} className="flex items-center p-3 border rounded-lg">
                        <span className="text-2xl mr-3">{amenity.icon}</span>
                        <span className="text-gray-900">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="specs" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(property.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 border-b">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-900">Bidding Period</p>
                        <p className="text-sm text-green-700">
                          {new Date(property.bidDetails.startDate).toLocaleDateString()} - {new Date(property.bidDetails.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-900">Expected Possession</p>
                        <p className="text-sm text-blue-700">December 2025</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Investment Calculator */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Investment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <Input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tokens you can buy:</span>
                      <span className="font-medium">{returns.tokensCanBuy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ownership percentage:</span>
                      <span className="font-medium">{returns.investmentPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly rental income:</span>
                      <span className="font-medium text-green-600">₹{returns.monthlyReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual returns:</span>
                      <span className="font-medium text-green-600">₹{returns.annualReturn}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm text-gray-600">5-year value:</span>
                      <span className="font-semibold text-green-600">₹{returns.fiveYearValue}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Coins className="w-4 h-4 mr-2" />
                    Express Interest
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Minimum deposit: ₹{property.bidDetails.minDeposit.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Token Sales Progress */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Token Sales Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tokens Sold</span>
                      <span>{property.tokensSold} / {property.tokens}</span>
                    </div>
                    <Progress value={tokensSoldPercentage} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {tokensSoldPercentage.toFixed(1)}% sold
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{property.tokens - property.tokensSold}</p>
                      <p className="text-xs text-gray-500">Tokens Available</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">₹{property.tokenPrice}</p>
                      <p className="text-xs text-gray-500">Price per Token</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-900">{property.contact.manager}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-900">{property.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-900">{property.contact.email}</span>
                  </div>
                  <div className="pt-3">
                    <Button variant="outline" className="w-full">
                      Schedule Site Visit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;