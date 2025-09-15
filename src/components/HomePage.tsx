import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  ArrowRight, Shield, TrendingUp, Users, Building, Zap, CheckCircle, Star, MapPin, DollarSign,
  FileText, Globe, Lock, Award, BarChart3, PieChart, Calendar, Clock, Wallet, 
  Home, Building2, Factory, TreePine, Plane, ChevronRight, Quote, Target, Lightbulb, BookOpen
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const HomePage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every transaction is secured by blockchain technology, ensuring transparency and immutable records.",
      color: "text-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Fractional Ownership",
      description: "Invest in premium properties with as little as $100 through tokenized real estate.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Join thousands of investors building wealth through decentralized real estate ownership.",
      color: "text-purple-600"
    },
    {
      icon: Building,
      title: "Premium Properties",
      description: "Access institutional-grade real estate previously available only to large investors.",
      color: "text-amber-600"
    }
  ];

  const stats = [
    { label: "Total Value Locked", value: "$47.2M", icon: DollarSign },
    { label: "Properties Listed", value: "1,247", icon: Building },
    { label: "Active Investors", value: "15,840", icon: Users },
    { label: "Average ROI", value: "12.4%", icon: TrendingUp }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Create Account & Complete KYC",
      description: "Sign up and verify your identity to access investment opportunities. Our KYC process ensures platform security and regulatory compliance.",
      icon: FileText,
      time: "5 minutes"
    },
    {
      step: "02", 
      title: "Browse & Analyze Properties",
      description: "Explore our curated selection of premium properties with detailed analytics, financial projections, and market insights.",
      icon: BarChart3,
      time: "Browse anytime"
    },
    {
      step: "03",
      title: "Purchase Property Tokens",
      description: "Buy fractional shares starting from $100. Each token represents ownership in high-value real estate assets.",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: "04",
      title: "Earn Passive Income",
      description: "Receive monthly rental distributions and benefit from property appreciation as the real estate market grows.",
      icon: TrendingUp,
      time: "Monthly returns"
    }
  ];

  const investmentBenefits = [
    {
      icon: Target,
      title: "Lower Entry Barriers",
      description: "Start investing in real estate with as little as $100, making premium properties accessible to everyone."
    },
    {
      icon: Globe,
      title: "Geographic Diversification", 
      description: "Spread investments across multiple markets and property types to reduce risk and maximize returns."
    },
    {
      icon: Lightbulb,
      title: "Professional Management",
      description: "Properties are managed by experienced real estate professionals, removing the hassle of direct ownership."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance with detailed analytics, market data, and transparent reporting on all investments."
    }
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      price: "$850,000",
      tokenPrice: "$100",
      roi: "8.5%",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Active",
      funded: 75
    },
    {
      id: 2,
      title: "Luxury Beach Villa",
      location: "Miami, FL", 
      price: "$1,200,000",
      tokenPrice: "$150",
      roi: "11.2%",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      status: "Hot",
      funded: 92
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Austin, TX",
      price: "$2,100,000", 
      tokenPrice: "$250",
      roi: "9.8%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "New",
      funded: 23
    }
  ];

  const propertyTypes = [
    { icon: Home, title: "Residential", description: "Single & multi-family homes", count: "456 properties" },
    { icon: Building2, title: "Commercial", description: "Office buildings & retail", count: "234 properties" },
    { icon: Factory, title: "Industrial", description: "Warehouses & logistics", count: "123 properties" },
    { icon: TreePine, title: "Land", description: "Development opportunities", count: "89 properties" },
    { icon: Plane, title: "Hospitality", description: "Hotels & vacation rentals", count: "67 properties" },
    { icon: Building, title: "Mixed-Use", description: "Diversified developments", count: "278 properties" }
  ];

  const marketData = [
    { market: "New York", properties: 342, avgROI: "8.2%", growth: "+12.5%" },
    { market: "California", properties: 289, avgROI: "9.1%", growth: "+15.3%" },
    { market: "Texas", properties: 234, avgROI: "10.4%", growth: "+18.7%" },
    { market: "Florida", properties: 187, avgROI: "11.2%", growth: "+14.2%" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "Ribitto made real estate investing accessible to me. I've diversified across 12 properties with just $5,000.",
      rating: 5,
      returns: "14.2% returns"
    },
    {
      name: "Michael Rodriguez", 
      role: "Financial Advisor",
      content: "The transparency and blockchain security give me confidence. My clients love the passive income stream.",
      rating: 5,
      returns: "11.8% returns"
    },
    {
      name: "Emily Watson",
      role: "Marketing Director", 
      content: "Finally, a platform that democratizes real estate. The analytics dashboard is incredibly detailed.",
      rating: 5,
      returns: "13.6% returns"
    }
  ];

  const faqs = [
    {
      question: "How does fractional real estate ownership work?",
      answer: "Fractional ownership allows you to own a percentage of a property by purchasing tokens that represent shares. Each token gives you proportional rights to rental income and property appreciation."
    },
    {
      question: "What's the minimum investment amount?",
      answer: "You can start investing with as little as $100. This makes premium real estate accessible to investors of all sizes."
    },
    {
      question: "How do I receive returns on my investment?",
      answer: "Returns come from two sources: monthly rental income distributions and property appreciation when you sell your tokens. All distributions are automated through smart contracts."
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, all transactions are secured by blockchain technology, and properties are held in legally compliant structures. We also conduct thorough due diligence on all properties."
    },
    {
      question: "Can I sell my tokens anytime?",
      answer: "Tokens can be traded on our secondary market, providing liquidity. However, real estate is typically a long-term investment for optimal returns."
    },
    {
      question: "What fees does Ribitto charge?",
      answer: "We charge a 2% annual management fee and a 1% transaction fee on token purchases. All fees are transparently displayed before any transaction."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2963]/20 to-[#BD1625]/10"></div>
        <div className="section-container relative">
          <div className="py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors duration-300">
                <Zap className="w-3 h-3 mr-1" />
                Blockchain-Powered Real Estate
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Invest in Real Estate
                <span className="block text-[#BD1625]">
                  Like Never Before
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Revolutionary blockchain platform enabling fractional ownership of premium real estate. 
                Start building your property portfolio with as little as $100.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/search">
                  <Button size="lg" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    Explore Properties
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Simple Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              How Ribitto Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start your real estate investment journey in four simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <div 
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-blue-300 bg-blue-50 shadow-lg' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeStep === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.time}
                      </Badge>
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${
                      activeStep === index ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Benefits Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200">
              Investment Advantages
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Fractional Real Estate?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the benefits of democratized real estate investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {investmentBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">
              Why Choose Ribitto
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              The Future of Real Estate Investment
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced technology meets traditional real estate to create unprecedented investment opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'border-slate-300 bg-white shadow-lg'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop"
                  alt="Modern real estate investment platform"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#2A2963] to-[#BD1625] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
                <div className="text-center">
                  <div>24/7</div>
                  <div className="text-sm opacity-90">Trading</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Investment Opportunities
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover premium real estate opportunities with verified returns and blockchain transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="card-modern card-hover group overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      property.status === 'Hot' ? 'bg-red-500 text-white' :
                      property.status === 'New' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#2A2963] transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-slate-600">Total Value</div>
                      <div className="font-semibold text-slate-900">{property.price}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Token Price</div>
                      <div className="font-semibold text-slate-900">{property.tokenPrice}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Funding Progress</span>
                      <span className="font-medium">{property.funded}%</span>
                    </div>
                    <Progress value={property.funded} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{property.roi} ROI</span>
                    </div>
                    <Link to={`/property/${property.id}`}>
                      <Button size="sm" className="btn-primary">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/search">
              <Button variant="outline" size="lg" className="px-8">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
              Investment Categories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Diversify Across Property Types
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Spread your investments across various real estate sectors for optimal portfolio balance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="card-modern card-hover text-center group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {type.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Performance Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
              Market Insights
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Global Market Performance
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Track performance across our top performing markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((market, index) => (
              <Card key={index} className="card-modern">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">{market.market}</h3>
                    <Badge className={`${
                      parseFloat(market.growth.replace('%', '').replace('+', '')) > 15 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {market.growth}
                    </Badge>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Properties</span>
                      <span className="font-medium">{market.properties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg ROI</span>
                      <span className="font-medium text-green-600">{market.avgROI}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">
              Success Stories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Our Investors Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real results from real investors building wealth through Ribitto
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-modern">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-700 text-xs">
                      {testimonial.returns}
                    </Badge>
                  </div>
                  <Quote className="w-8 h-8 text-slate-300 mb-4" />
                  <p className="text-slate-600 mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-50 text-red-700 border-red-200">
              Security & Compliance
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Your Investment is Protected
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Industry-leading security measures and regulatory compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Blockchain Security</h3>
              <p className="text-slate-600">All transactions are secured by immutable blockchain technology</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Regulatory Compliance</h3>
              <p className="text-slate-600">Fully compliant with SEC regulations and real estate laws</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Asset Protection</h3>
              <p className="text-slate-600">Properties held in legally compliant ownership structures</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">
              Common Questions
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about fractional real estate investing
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 rounded-lg px-6 bg-white">
                  <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Button variant="outline" className="px-6">
              <BookOpen className="w-4 h-4 mr-2" />
              View Help Center
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of investors who are already building wealth through tokenized real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-white/20 !text-white hover:bg-white/10 hover:!text-white bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;