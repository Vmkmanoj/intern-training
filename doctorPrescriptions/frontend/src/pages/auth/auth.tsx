import  { useState } from "react";
import {
  ShieldCheck,
  UsersRound,
  Clock,
  Cross,
} from "lucide-react";

import LoginForm from "./login";
import RegisterForm from "./register"

type AuthMode = "login" | "register";

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

export default function CareWellAuth() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 flex overflow-hidden">
        <HeroPanel mode={mode} />
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}