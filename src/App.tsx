import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import PropertySearch from "./components/PropertySearch";
import PropertyDetail from "./components/PropertyDetail";
import UserDashboard from "./components/UserDashboard";
import SellerDashboard from "./components/SellerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./hooks/useAuth";
import "./styles/globals.css";

function App() {
  const { user, userType, login, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Set document meta data for SEO and social sharing
  useEffect(() => {
    const title = "Ribitto - Invest In Real Estate";
    const description =
      "Revolutionary blockchain-powered platform enabling fractional ownership of premium real estate.";
    const imageUrl =
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop";
    const siteUrl = window.location.origin;

    // Set document title
    document.title = title;

    const head = document.getElementsByTagName("head")[0];

    // Helper function to create or update meta tag
    const setMetaTag = (
      property: string,
      content: string,
      isProperty = false
    ) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, property);
        head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag(
      "keywords",
      "real estate, blockchain, fractional ownership, property investment, tokenization, Ribitto"
    );
    setMetaTag("author", "Ribitto");

    // Open Graph meta tags for Facebook, LinkedIn, etc.
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", imageUrl, true);
    setMetaTag("og:url", siteUrl, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:site_name", "Ribitto", true);

    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", imageUrl);

    // Additional meta tags
    setMetaTag("robots", "index, follow");
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Set favicon if not already set
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/x-icon";
      favicon.href = "/favicon.ico";
      head.appendChild(favicon);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background antialiased">
        <Header
          user={user}
          userType={userType}
          onLogin={() => setShowAuthModal(true)}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />

        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<PropertySearch />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <UserDashboard user={user} userType={userType} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/seller"
              element={
                isAuthenticated && userType === "kyc" ? (
                  <SellerDashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && userType === "admin" ? (
                  <AdminDashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} onLogin={login} />
        )}
      </div>
    </Router>
  );
}

export default App;
