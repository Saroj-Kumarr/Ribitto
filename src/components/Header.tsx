import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  User,
  Settings,
  LogOut,
  Home,
  Search,
  BarChart3,
  Menu,
} from "lucide-react";
import { UserType } from "../hooks/useAuth";
import ribittoLogo from "figma:asset/ec1e75f1b926da771035c7dced21711c27a89f1b.png";

interface HeaderProps {
  user: any;
  userType: UserType;
  onLogin: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user,
  userType,
  onLogin,
  onLogout,
  isAuthenticated,
}) => {
  const location = useLocation();

  const getNavItems = () => {
    const items = [
      { path: "/", label: "Home", icon: Home },
      { path: "/search", label: "Properties", icon: Search },
    ];

    if (isAuthenticated) {
      items.push({ path: "/dashboard", label: "Dashboard", icon: BarChart3 });

      if (userType === "kyc") {
        items.push({ path: "/seller", label: "Sell Property", icon: Settings });
      }

      if (userType === "admin") {
        items.push({ path: "/admin", label: "Admin Panel", icon: Settings });
      }
    }

    return items;
  };

  const getUserTypeDisplay = () => {
    switch (userType) {
      case "kyc":
        return user?.kycStatus === "pending" ? "KYC Pending" : "KYC Verified";
      case "admin":
        return "Administrator";
      case "registered":
        return "Registered User";
      default:
        return "Guest";
    }
  };

  const getUserStatusColor = () => {
    switch (userType) {
      case "kyc":
        return user?.kycStatus === "pending"
          ? "text-amber-600"
          : "text-emerald-600";
      case "admin":
        return "text-purple-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={ribittoLogo}
              alt="Ribitto"
              className="h-8 w-auto transition-all duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {getNavItems().map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link flex items-center space-x-2 ${
                  location.pathname === path
                    ? "nav-link-active"
                    : "nav-link-inactive"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/profile">
                <div className="flex items-center space-x-4">
                  {/* User Info */}
                  <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-lg">
                    <div className="w-9 h-9 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-slate-900 leading-tight">
                        {user?.name || "User"}
                      </p>
                      <p
                        className={`text-xs font-medium leading-tight ${getUserStatusColor()}`}
                      >
                        {getUserTypeDisplay()}
                      </p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLogin}
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Sign In
                </Button>
                <Button onClick={onLogin} className="btn-primary shadow-sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-slate-600 hover:text-slate-900 p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Hidden by default, would need state management for toggle */}
      <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="section-container py-4">
          <nav className="flex flex-col space-y-2">
            {getNavItems().map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link flex items-center space-x-3 ${
                  location.pathname === path
                    ? "nav-link-active"
                    : "nav-link-inactive"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
