import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Filter, SlidersHorizontal, Coins, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const PropertySearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [propertyType, setPropertyType] = useState('all');
  const [purchaseType, setPurchaseType] = useState('all');
  const [tokenAvailable, setTokenAvailable] = useState('all');
  const [developer, setDeveloper] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock property data
  const properties = [
    {
      id: '1',
      name: 'Prestige Lakeside Heights',
      location: 'Whitefield, Bangalore',
      price: 85,
      priceFormatted: '₹85 Lakh',
      tokens: 1000,
      tokenPrice: '₹850',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      type: 'residential',
      purchaseTypes: ['buy', 'invest'],
      status: 'Live',
      yield: '8.5%',
      developer: 'Prestige Group',
      tags: ['Hot', 'High Yield'],
      area: '1200 sq ft',
      bedrooms: '2 BHK'
    },
    {
      id: '2',
      name: 'Brigade Gateway',
      location: 'Rajajinagar, Bangalore',
      price: 120,
      priceFormatted: '₹1.2 Cr',
      tokens: 2400,
      tokenPrice: '₹500',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      type: 'commercial',
      purchaseTypes: ['invest'],
      status: 'Pre-Launch',
      yield: '12%',
      developer: 'Brigade Group',
      tags: ['Trending', 'Premium'],
      area: '800 sq ft',
      bedrooms: 'Office Space'
    },
    {
      id: '3',
      name: 'Sobha Dream Acres',
      location: 'Thanisandra, Bangalore',
      price: 65,
      priceFormatted: '₹65 Lakh',
      tokens: 1300,
      tokenPrice: '₹500',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      type: 'residential',
      purchaseTypes: ['buy', 'invest'],
      status: 'Live',
      yield: '7.8%',
      developer: 'Sobha Developers',
      tags: ['Family Friendly'],
      area: '1050 sq ft',
      bedrooms: '3 BHK'
    },
    {
      id: '4',
      name: 'Godrej Aqua',
      location: 'Hosur Road, Bangalore',
      price: 95,
      priceFormatted: '₹95 Lakh',
      tokens: 1900,
      tokenPrice: '₹500',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      type: 'residential',
      purchaseTypes: ['buy', 'invest'],
      status: 'Live',
      yield: '9.2%',
      developer: 'Godrej Properties',
      tags: ['Luxury'],
      area: '1400 sq ft',
      bedrooms: '3 BHK'
    },
    {
      id: '5',
      name: 'Embassy Tech Village',
      location: 'Outer Ring Road, Bangalore',
      price: 180,
      priceFormatted: '₹1.8 Cr',
      tokens: 3600,
      tokenPrice: '₹500',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      type: 'commercial',
      purchaseTypes: ['invest'],
      status: 'Live',
      yield: '11.5%',
      developer: 'Embassy Group',
      tags: ['Tech Hub', 'High Yield'],
      area: '1200 sq ft',
      bedrooms: 'Office Space'
    }
  ];

  const developers = ['All Developers', 'Prestige Group', 'Brigade Group', 'Sobha Developers', 'Godrej Properties', 'Embassy Group'];

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search query filter
      if (searchQuery && !property.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !property.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }

      // Property type filter
      if (propertyType !== 'all' && property.type !== propertyType) {
        return false;
      }

      // Purchase type filter
      if (purchaseType !== 'all' && !property.purchaseTypes.includes(purchaseType)) {
        return false;
      }

      // Token availability filter
      if (tokenAvailable === 'yes' && !property.tokens) {
        return false;
      }
      if (tokenAvailable === 'no' && property.tokens) {
        return false;
      }

      // Developer filter
      if (developer !== 'all' && property.developer !== developer) {
        return false;
      }

      return true;
    });
  }, [searchQuery, priceRange, propertyType, purchaseType, tokenAvailable, developer]);

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 200]);
    setPropertyType('all');
    setPurchaseType('all');
    setTokenAvailable('all');
    setDeveloper('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by location, property name, or developer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Price Range */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹ Lakhs): {priceRange[0]} - {priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Purchase Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Type</label>
                  <Select value={purchaseType} onValueChange={setPurchaseType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="invest">Invest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Token Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Token Available</label>
                  <Select value={tokenAvailable} onValueChange={setTokenAvailable}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Developer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Developer</label>
                  <Select value={developer} onValueChange={setDeveloper}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {developers.map((dev) => (
                        <SelectItem key={dev} value={dev === 'All Developers' ? 'all' : dev}>
                          {dev}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button variant="ghost" onClick={clearFilters} className="text-gray-600">
                  Clear All Filters
                </Button>
                <p className="text-sm text-gray-600">
                  {filteredProperties.length} properties found
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant={tag === 'Hot' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white">
                    {property.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">{property.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>
                    <p className="text-xs text-gray-500">{property.area} • {property.bedrooms}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {property.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-t border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="font-semibold text-gray-900">{property.priceFormatted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Yield</p>
                    <p className="font-semibold text-green-600">{property.yield}</p>
                  </div>
                </div>

                {property.tokens && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 flex items-center">
                        <Coins className="w-3 h-3 mr-1" />
                        Total Tokens
                      </p>
                      <p className="text-sm font-medium text-gray-900">{property.tokens.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Price per Token</p>
                      <p className="text-sm font-medium text-gray-900">{property.tokenPrice}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  {property.purchaseTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs capitalize">
                      {type}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link to={`/property/${property.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearch;