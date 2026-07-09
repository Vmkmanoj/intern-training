import React, { useState,type InputHTMLAttributes } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  UsersRound,
  Clock,
  Stethoscope,
  ChevronDown,
  Cross,
  Pill,
  Microscope,
  ClipboardList,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

type AuthMode = "login" | "register";

const roles = [
  { label: "Doctor", icon: Stethoscope },
  { label: "Nurse", icon: UsersRound },
  { label: "Receptionist", icon: ClipboardList },
  { label: "Pharmacist", icon: Pill },
  { label: "Lab Technician", icon: Microscope },
  { label: "Admin", icon: BadgeCheck },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
        <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <p className="text-lg font-bold text-slate-900">CareWell</p>
        <p className="text-[10px] tracking-widest text-blue-600 font-semibold -mt-1">
          HOSPITAL
        </p>
      </div>
    </div>
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  showToggle?: boolean;
}

function Field({ icon: Icon, type = "text", placeholder, showToggle, ...props }: FieldProps) {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? "text" : "password") : type;
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type={inputType}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
        {...props}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

interface SelectProps {
  icon?: LucideIcon;
  options: string[];
  placeholder: string;
}

function Select({ icon: Icon, options, placeholder }: SelectProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      )}
      <select
        defaultValue=""
        className={`w-full ${
          Icon ? "pl-9" : "pl-3"
        } pr-9 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-slate-800">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

interface HeroPanelProps {
  mode: AuthMode;
}

function HeroPanel({ mode }: HeroPanelProps) {
  const isLogin = mode === "login";
  return (
    <div className="hidden md:flex flex-col bg-blue-50 px-8 pt-8 pb-6 w-[300px] shrink-0">
      <Logo />
      <h1 className="text-2xl font-bold text-slate-900 mt-8">
        {isLogin ? "Welcome back!" : "Create account"}
      </h1>
      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
        {isLogin
          ? "Sign in to your account to continue accessing the hospital system."
          : "Register to access the hospital management system."}
      </p>

      <div className="flex-1 flex items-center justify-center py-6">
        <svg viewBox="0 0 220 200" className="w-full max-w-[220px]">
          <circle cx="110" cy="100" r="90" fill="#DBEAFE" />
          <rect x="60" y="40" width="100" height="120" rx="8" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="2" />
          <rect x="95" y="55" width="30" height="30" rx="4" fill="#2563EB" />
          <rect x="106" y="62" width="8" height="16" fill="#FFFFFF" />
          <rect x="99" y="70" width="22" height="8" fill="#FFFFFF" />
          {[0, 1, 2, 3].map((row: number) =>
            [0, 1].map((col: number) => (
              <rect
                key={`${row}-${col}`}
                x={72 + col * 45}
                y={98 + row * 15}
                width="30"
                height="9"
                rx="2"
                fill={row === 0 && col === 0 ? "#93C5FD" : "#E0EDFB"}
              />
            ))
          )}
          <circle cx="45" cy="150" r="18" fill="#2563EB" />
          <circle cx="45" cy="140" r="8" fill="#FFF" />
          <path d="M30 165 q15 -18 30 0 z" fill="#FFF" />
          <circle cx="175" cy="150" r="18" fill="#60A5FA" />
          <circle cx="175" cy="140" r="8" fill="#FFF" />
          <path d="M160 165 q15 -18 30 0 z" fill="#FFF" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { icon: ShieldCheck, label: "Secure access" },
          { icon: UsersRound, label: "Role based" },
          { icon: Clock, label: "Always on" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-blue-100">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SwitchProps {
  onSwitch: () => void;
}

function LoginForm({ onSwitch }: SwitchProps) {
  return (
    <div className="flex-1 px-8 py-8 flex flex-col justify-center max-w-md">
      <h2 className="text-2xl font-bold text-slate-900">Log in</h2>
      <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Email or username
          </label>
          <Field icon={Mail} placeholder="Enter your email or username" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Password
          </label>
          <Field icon={Lock} placeholder="Enter your password" showToggle />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="rounded border-slate-300" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
          Log in
        </button>

        {/* <div className="flex items-center gap-3 py-1">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs text-slate-400">or</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div> */}

        {/* <button className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.6 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6 29.4 4 24 4c-7.5 0-13.9 4.3-17.1 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.3C29.4 35.1 26.8 36 24 36c-5.4 0-9.9-3.4-11.5-8.1l-6.5 5C9.9 39.6 16.4 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.6-2.7 4.8-5 6.3l6.3 5.3C39.9 37 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/>
          </svg>
          Log in with Google
        </button> */}

        <p className="text-center text-sm text-slate-500 pt-2">
          Don't have an account?{" "}
          <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterForm({ onSwitch }: SwitchProps) {
  return (
    <div className="flex-1 px-8 py-8 max-w-md">
      <h2 className="text-2xl font-bold text-slate-900">Register</h2>
      <p className="text-sm text-slate-500 mt-1">Create your account to get started.</p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Full name
            </label>
            <Field icon={User} placeholder="Enter your full name" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Role
            </label>
            <Select placeholder="Select your role" options={roles.map((r) => r.label)} />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Email
          </label>
          <Field icon={Mail} placeholder="Enter your email" />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Phone number
          </label>
          <Field icon={Phone} placeholder="Enter your phone number" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Password
            </label>
            <Field icon={Lock} placeholder="Create a password" showToggle />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Confirm password
            </label>
            <Field icon={Lock} placeholder="Confirm your password" showToggle />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Department (optional)
          </label>
          <Select
            placeholder="Select department"
            options={["Cardiology", "Pediatrics", "Radiology", "Pharmacy", "Laboratory"]}
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-600 pt-1">
          <input type="checkbox" className="mt-0.5 rounded border-slate-300" />
          <span>
            I agree to the{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
          Register
        </button>

        <p className="text-center text-sm text-slate-500 pt-1">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default function CareWellAuth() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <></>
    // <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    //   <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 flex overflow-hidden">
    //     <HeroPanel mode={mode} />
    //     {mode === "login" ? (
    //       <LoginForm onSwitch={() => setMode("register")} />
    //     ) : (
    //       <RegisterForm onSwitch={() => setMode("login")} />
    //     )}
    //   </div>
    // </div>
  );
}