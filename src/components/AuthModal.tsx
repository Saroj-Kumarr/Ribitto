// AuthModalSingleFlowFinal.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, User, CheckCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import ribittoLogo from "figma:asset/ec1e75f1b926da771035c7dced21711c27a89f1b.png";
import Select from "react-select";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";
import OtpInputs from "./OTPInputs";

interface Props {
  onClose: () => void;
  onRequestOtp?: (phone: string) => Promise<void>;
  onVerifyOtp?: (
    phone: string,
    otp: string
  ) => Promise<{ exists: boolean; user?: any }>;
  onAuthSuccess?: (user?: any) => void;
  onLogin: (email: string, password: string, role?: any) => Promise<any>;
}

const OTP_EXPIRY_SECONDS = 300;
const OTP_MAX_RESEND = 3;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const normalizedPhone = (s: string) => s.replace(/\D/g, "").replace(/^0+/, "");

export default function AuthModalSingleFlowFinal({
  onClose,
  onRequestOtp,
  onVerifyOtp,
  onAuthSuccess,
  onLogin,
}: Props) {
  const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
  const [phone, setPhone] = useState(""); // user input (no +91)
  const [isLoading, setIsLoading] = useState(false);

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCodeSim, setOtpCodeSim] = useState<string | null>(null);
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [resendCount, setResendCount] = useState(0);
  const [otpInput, setOtpInput] = useState("");
  const [timer, setTimer] = useState(0);

  const [reg, setReg] = useState({
    name: "",
    email: "",
    phone: "",
    location: "", // keep if you like; we’ll derive it on submit
    password: "",
    confirmPassword: "",
    country: "", // NEW: ISO code, e.g. "IN"
    state: "", // NEW: ISO code (within country), e.g. "MH"
    city: "", // NEW: city name
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof reg, string>>
  >({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const otpRef = useRef<HTMLInputElement | null>(null);

  // react-select expects { value, label }
  type Opt = { value: string; label: string; meta?: any };

  const countryOptions: Opt[] = Country.getAllCountries().map(
    (c: ICountry) => ({
      value: c.isoCode, // e.g. "IN"
      label: c.name, // "India"
      meta: c,
    })
  );

  const stateOptions: Opt[] = React.useMemo(() => {
    if (!reg.country) return [];
    return State.getStatesOfCountry(reg.country).map((s: IState) => ({
      value: s.isoCode, // e.g. "MH"
      label: s.name, // "Maharashtra"
      meta: s,
    }));
  }, [reg.country]);

  const cityOptions: Opt[] = React.useMemo(() => {
    if (!reg.country || !reg.state) return [];
    return City.getCitiesOfState(reg.country, reg.state).map((c: ICity) => ({
      value: c.name,
      label: c.name,
      meta: c,
    }));
  }, [reg.country, reg.state]);

  // Demo accounts (UI only)
  const demoAccounts = [
    {
      email: "user@demo.com",
      type: "Registered User",
      desc: "Browse and save properties",
      icon: User,
      color: "bg-slate-100 text-slate-700 border-slate-200",
      role: "registered",
    },
    {
      email: "kyc@demo.com",
      type: "KYC Verified",
      desc: "Full investment access",
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      role: "kyc",
    },
    {
      email: "admin@demo.com",
      type: "Administrator",
      desc: "Platform management",
      icon: Shield,
      color: "bg-purple-50 text-purple-700 border-purple-200",
      role: "admin",
    },
  ];

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Demo login with different user types
      let userType = "registered";

      if (email.includes("admin")) {
        userType = "admin";
      } else if (email.includes("kyc")) {
        userType = "kyc";
      }

      await onLogin(email, password, userType);
      toast.success("Welcome to Ribitto! Login successful.");
      onClose();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP countdown
  useEffect(() => {
    if (!otpSent || !sentAt) {
      setTimer(0);
      return;
    }
    const end = Math.floor(sentAt / 1000) + OTP_EXPIRY_SECONDS;
    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      setTimer(Math.max(0, end - now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [otpSent, sentAt]);

  useEffect(() => {
    if (step === "otp") setTimeout(() => otpRef.current?.focus(), 60);
  }, [step]);

  // Helpers to display / clear errors
  const clearFieldErrors = () => setFieldErrors({});
  const setFieldError = (field: keyof typeof reg, msg: string) =>
    setFieldErrors((prev) => ({ ...prev, [field]: msg }));

  // Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    clearFieldErrors();
    setGeneralError(null);
    const p = normalizedPhone(phone);
    if (!p || p.length !== 10) {
      setFieldError("phone", "Phone number must be 10 digits");
      return;
    }
    setIsLoading(true);
    try {
      const full = `${p}`;
      if (onRequestOtp) {
        await onRequestOtp(full);
      } else {
        const code = generateOtp();
        setOtpCodeSim(code);
        console.log("[DEV] simulated OTP:", code);
        toast.success("Simulated OTP generated (dev)");
      }
      setOtpSent(true);
      setSentAt(Date.now());
      setOtpInput("");
      setResendCount(0);
      setStep("otp");
      setGeneralError(null);
    } catch (err) {
      setGeneralError("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    clearFieldErrors();
    setGeneralError(null);
    if (resendCount >= OTP_MAX_RESEND) {
      setGeneralError("Resend limit reached");
      return;
    }
    setIsLoading(true);
    try {
      const full = `${normalizedPhone(phone)}`;
      if (onRequestOtp) await onRequestOtp(full);
      else {
        const code = generateOtp();
        setOtpCodeSim(code);
        console.log("[DEV] simulated OTP resent:", code);
        toast.success("Simulated OTP resent (dev)");
      }
      setSentAt(Date.now());
      setResendCount((s) => s + 1);
      setOtpInput("");
    } catch {
      setGeneralError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP -> if backend says exists => auth, else => show register.
  // In UI-only mode we go straight to register.
  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    clearFieldErrors();
    setGeneralError(null);

    if (!/^\d{6}$/.test(otpInput)) {
      setFieldError("phone", "Enter a valid 6-digit OTP"); // show under phone area (or OTP area)
      return;
    }

    setIsLoading(true);
    try {
      const full = `${normalizedPhone(phone)}`;
      if (onVerifyOtp) {
        const resp = await onVerifyOtp(full, otpInput);
        if (resp.exists) {
          toast.success("Authenticated");
          onAuthSuccess?.(resp.user);
          onClose();
          return;
        } else {
          // new user -> open register, preserve phone
          setReg((r) => ({ ...r, phone: full }));
          setStep("register");
          return;
        }
      } else {
        // UI-only: no backend — go to register
        setReg((r) => ({ ...r, phone: `${normalizedPhone(phone)}` }));
        toast.success("Phone verified (UI-only)");
        setStep("register");
        return;
      }
    } catch {
      setGeneralError("Verification failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Register submit with inline field validation
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFieldErrors();
    setGeneralError(null);

    let ok = true;
    if (!reg.name.trim()) {
      setFieldError("name", "Full name is required");
      ok = false;
    }
    if (!/\S+@\S+\.\S+/.test(reg.email)) {
      setFieldError("email", "Invalid email address");
      ok = false;
    }
    if (!reg.country || !reg.state || !reg.city) {
      setFieldError("location", "Please select country, state, and city");
      ok = false;
    }

    if (reg.password.length < 8) {
      setFieldError("password", "Password must be at least 8 characters");
      ok = false;
    }
    if (reg.password !== reg.confirmPassword) {
      setFieldError("confirmPassword", "Passwords do not match");
      ok = false;
    }

    if (!ok) return;
    if (!agreed) {
      setGeneralError("You must accept Terms & Privacy");
      return;
    }

    // inside handleRegisterSubmit, after all validations pass:
    const composedLocation = `${reg.city}, ${reg.state}, ${reg.country}`;
    setReg((r) => ({ ...r, location: composedLocation }));

    // Frontend-only: backend will create user
    toast.success("Registration completed (frontend-only)");
    onClose();
  };

  // Demo account click handler — NO prefill, direct auth + redirect
  const handleDemoClick = (account: {
    email: string;
    type: string;
    role?: string;
  }) => {
    const demoUser = {
      email: account.email,
      role: account.role || account.type,
    };
    toast.success(`Logged in as ${account.type}`);

    handleLogin(account.email, "demopassword");
    onAuthSuccess?.(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[95vh] overflow-y-auto bg-white shadow-2xl border-0">
        <CardHeader className="relative text-center pb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="flex justify-center mb-4">
            <img src={ribittoLogo} alt="logo" className="h-10" />
          </div>

          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <p className="text-sm text-slate-600">Quick sign-up with phone OTP</p>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Phone step */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1 flex">
                <div className="inline-flex items-center px-3 ">+91</div>
                <Input
                  id="phone"
                  placeholder="Enter your 10-digit mobile number (e.g. 9876543210)"
                  value={phone}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setPhone(digits);
                  }}
                  className="input-modern"
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.phone}</p>
              )}
              {generalError && (
                <p className="text-red-600 text-sm mt-1">{generalError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          )}

          {/* OTP step */}
          {step === "otp" && (
            <form onSubmit={handleVerify} className="space-y-4">
              <Label>Enter OTP</Label>
              <OtpInputs
                length={6}
                value={otpInput}
                onChange={(next) =>
                  setOtpInput(next.replace(/\D/g, "").slice(0, 6))
                }
              />

              {fieldErrors.phone && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.phone}</p>
              )}
              {generalError && (
                <p className="text-red-600 text-sm mt-1">{generalError}</p>
              )}

              <div className="flex items-center justify-between mt-2 text-xs text-slate-600">
                <div>
                  Expires in:{" "}
                  <strong>
                    {Math.floor(timer / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timer % 60).toString().padStart(2, "0")}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCount >= OTP_MAX_RESEND || isLoading}
                  className={`underline ${
                    resendCount >= OTP_MAX_RESEND
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Resend ({resendCount}/{OTP_MAX_RESEND})
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  className="py-3"
                  disabled={
                    isLoading || otpInput.replace(/\D/g, "").length !== 6
                  }
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  variant="ghost"
                  className="py-3"
                  onClick={() => {
                    setStep("phone");
                    setOtpSent(false);
                    setOtpCodeSim(null);
                    setSentAt(null);
                    setResendCount(0);
                    setOtpInput("");
                    clearFieldErrors();
                    setGeneralError(null);
                  }}
                >
                  Edit Phone
                </Button>
              </div>
            </form>
          )}

          {/* Register step — two columns */}
          {step === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={reg.name}
                    onChange={(e) => setReg({ ...reg, name: e.target.value })}
                    placeholder="John Doe"
                    className="input-modern mt-2"
                  />
                  {fieldErrors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    value={reg.email}
                    onChange={(e) => setReg({ ...reg, email: e.target.value })}
                    placeholder="name@example.com"
                    className="input-modern mt-2"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Phone</Label>
                  <div className="flex mt-1">
                    <div className="inline-flex items-center px-3 ">+91</div>
                    <Input
                      value={reg.phone}
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setReg((r) => ({ ...r, phone: digits })); // allow empty too
                      }}
                      placeholder="9876543210"
                      className="input-modern mt-2"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className="sm:col-span-1">
                  <Label>Country</Label>
                  <div className="mt-2">
                    <Select
                      options={countryOptions}
                      value={
                        countryOptions.find((o) => o.value === reg.country) ||
                        null
                      }
                      onChange={(opt) => {
                        setReg((r) => ({
                          ...r,
                          country: opt?.value || "",
                          state: "", // reset downstream
                          city: "",
                        }));
                      }}
                      placeholder="Select country"
                      classNamePrefix="rs"
                    />
                  </div>
                </div>

                {/* State */}
                <div className="sm:col-span-1">
                  <Label>State</Label>
                  <div className="mt-2">
                    <Select
                      isDisabled={!reg.country}
                      options={stateOptions}
                      value={
                        stateOptions.find((o) => o.value === reg.state) || null
                      }
                      onChange={(opt) => {
                        setReg((r) => ({
                          ...r,
                          state: opt?.value || "",
                          city: "",
                        }));
                      }}
                      placeholder="Select state"
                      classNamePrefix="rs"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="sm:col-span-1">
                  <Label>City</Label>
                  <div className="mt-2">
                    <Select
                      isDisabled={!reg.country || !reg.state}
                      options={cityOptions}
                      value={
                        cityOptions.find((o) => o.value === reg.city) || null
                      }
                      onChange={(opt) =>
                        setReg((r) => ({ ...r, city: opt?.value || "" }))
                      }
                      placeholder="Select city"
                      classNamePrefix="rs"
                    />
                  </div>
                  {fieldErrors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.location}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={reg.password}
                    onChange={(e) =>
                      setReg({ ...reg, password: e.target.value })
                    }
                    placeholder="Create a strong password"
                    className="input-modern mt-2"
                  />
                  {fieldErrors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={reg.confirmPassword}
                    onChange={(e) =>
                      setReg({ ...reg, confirmPassword: e.target.value })
                    }
                    placeholder="Re-enter password"
                    className="input-modern mt-2"
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* general form error */}
              {generalError && (
                <p className="text-red-600 text-sm mt-2">{generalError}</p>
              )}

              <div className="flex items-center gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the Terms &amp; Privacy Policy
                </label>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}

          {/* Demo Accounts UI (bottom) - DOES NOT prefill fields; clicking logs in as demo */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                Demo Accounts
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mb-4">
              Try the platform with demo accounts (no form prefill — direct
              sign-in)
            </p>

            <div className="space-y-3">
              {demoAccounts.map((acct) => {
                const Icon = acct.icon;
                return (
                  <div
                    key={acct.email}
                    className={`p-4 border rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center space-x-3 ${acct.color}`}
                    onClick={() => handleDemoClick(acct)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleDemoClick(acct);
                    }}
                  >
                    <div className="p-2 rounded-lg bg-white/40">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-slate-900">
                          {acct.type}
                        </p>
                        <div className="text-xs font-medium px-2 py-0.5 rounded-full border">
                          {acct.role === "registered" ? "Demo" : "Demo"}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {acct.email}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{acct.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
