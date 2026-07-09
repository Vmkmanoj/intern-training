import React, {useEffect, useState,type ReactNode, type FormEvent } from "react";
import {
  Cross,
  Menu,
  Bell,
  ChevronDown,
  Home,
  Users,
  CalendarDays,
  Stethoscope,
  Grid2x2,
  Receipt,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeft,
  UserRound,
  Phone,
  Mail,
  Calendar,
  Info,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  UserRoundPlus,
  type LucideIcon,
} from "lucide-react";
import {  useNavigate } from "@tanstack/react-router";
import { useDoctor } from "../../hooks/doctor";

/* ---------- Types ---------- */

interface NavItem {
  label: string;
  icon: LucideIcon;
  badge?: number;
  path ? : string
}

interface PatientForm {
  doctor: string;
  name: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  email: string;
  emergencyContact: string;
}

/* ---------- Static data ---------- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home ,path : "/receptionist"},
  { label: "Patients", icon: Users , path : "/createpatient" },
  { label: "Appointments", icon: CalendarDays },
  { label: "Doctors", icon: Stethoscope },
  { label: "Departments", icon: Grid2x2 },
  { label: "Reports", icon: BarChart3 },
  { label: "Messages", icon: MessageSquare, badge: 3 },
  { label: "Settings", icon: Settings },
];

const doctorOptions = [
  "Dr. Arjun Mehta - Cardiology",
  "Dr. Priya Nair - Neurology",
  "Dr. Rahul Verma - Pediatrics",
  "Dr. Neha Singh - Orthopedic",
  "Dr. Amit Patel - General Medicine",
];

const genderOptions = ["Male", "Female", "Other"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const checklist = [
  "All required fields are filled",
  "Phone number is valid",
  "Address is complete",
  "Doctor is selected",
];

const initialForm: PatientForm = {
  doctor: "",
  name: "",
  phone: "",
  address: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  email: "",
  emergencyContact: "",
};

/* ---------- Shared layout pieces ---------- */

function Sidebar() {
  const [active, setActive] = useState("Patients");
  const navigate  = useNavigate()

  const handleChange = (lable: string, path?: string) => {
    setActive(lable);
    if (path) {
      navigate({ to: path });
    }
  };

  return (
    <aside className="w-60 shrink-0 bg-[#0B1220] text-slate-300 flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
          <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold text-white">CareWell</p>
          <p className="text-[10px] tracking-widest text-blue-400 font-semibold -mt-1">
            HOSPITAL
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map(({ label, icon: Icon, badge , path } : NavItem) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleChange(label , path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className="bg-violet-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-400 hover:bg-white/5 transition">
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5 text-slate-500" />
        <h1 className="text-lg font-semibold text-slate-800">Register Patient</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            5
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <img
            src="https://i.pravatar.cc/64?img=47"
            alt="Anjali Sharma"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="leading-tight text-sm">
            <p className="font-semibold text-slate-800">Anjali Sharma</p>
            <p className="text-slate-400 text-xs">Receptionist</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

function Breadcrumbs() {
  const crumbs = ["Dashboard", "Patients", "Register Patient"];
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
      {crumbs.map((c, i) => (
        <React.Fragment key={c}>
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          <span className={i === crumbs.length - 1 ? "text-slate-500" : "hover:text-blue-600 cursor-pointer"}>
            {c}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- Form field helpers ---------- */

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
      {children} {required && <span className="text-rose-500">*</span>}
    </label>
  );
}

interface TextFieldProps {
  icon?: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

function TextField({ icon: Icon, placeholder, value, onChange }: TextFieldProps) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          Icon ? "pl-9" : "pl-3.5"
        } pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition`}
      />
    </div>
  );
}

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

function TextArea({ placeholder, value, onChange }: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 text-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
    />
  );
}

type SelectFieldOption = string | { label: string; value: string };

interface SelectFieldProps {
  icon?: LucideIcon;
  placeholder: string;
  options: SelectFieldOption[];
  value: string;
  onChange: (v: string) => void;
}

function SelectField({ icon: Icon, placeholder, options, value, onChange }: SelectFieldProps) {
  const renderedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          Icon ? "pl-9" : "pl-3.5"
        } pr-9 py-2.5 rounded-lg border border-slate-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition ${
          value ? "text-slate-800" : "text-slate-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {renderedOptions.map(({ value: optionValue, label }) => (
          <option key={optionValue} value={optionValue} className="text-slate-800">
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

/* ---------- Side panels ---------- */

function InfoPanel() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
      <div className="flex items-center gap-2 text-blue-700 font-semibold">
        <Info className="w-[18px] h-[18px]" />
        Information
      </div>
      <p className="text-sm text-slate-600 mt-3">Please ensure:</p>
      <ul className="mt-2 space-y-2">
        {checklist.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TipPanel() {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
      <div className="flex items-center gap-2 text-amber-600 font-semibold">
        <Lightbulb className="w-[18px] h-[18px]" />
        Tip
      </div>
      <p className="text-sm text-slate-600 mt-2">
        You can assign the patient to a doctor later if not sure.
      </p>
    </div>
  );
}


interface DoctorOption {
  label: string;
  value: string;
}
/* ---------- Main form ---------- */

function RegisterPatientForm() {
  const [form, setForm] = useState<PatientForm>(initialForm);
    const {
    data,
    isLoading,
    error,
  } = useDoctor();

  const [docters , setDocters] = useState<DoctorOption[]>([]);

  useEffect(() => {
  if (data?.data) {
    const doctorList = data.data.map((doctor: any) => ({
      label: doctor.Name,
      value: doctor.Id,
    }));

    setDocters(doctorList);
  }
}, [data]);

  const set = <K extends keyof PatientForm>(key: K) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleReset = () => setForm(initialForm);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering patient:", form);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-start gap-4 px-8 pt-7 pb-6 border-b border-slate-100">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <UserRound className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Patient Information</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Fill in the details below to register a new patient.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-7 space-y-6">
        <div className="grid grid-cols-2 gap-6">
<SelectField
  placeholder="Select Doctor"
  options={docters}
  value={form.doctor}
  onChange={set("doctor")}
/>
          <div>
            <Label required>Patient Name</Label>
            <TextField
              placeholder="Enter patient full name"
              value={form.name}
              onChange={set("name")}
            />
          </div>

          <div>
            <Label required>Phone Number</Label>
            <TextField
              icon={Phone}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={set("phone")}
            />
          </div>
          <div>
            <Label required>Address</Label>
            <TextArea
              placeholder="Enter full address"
              value={form.address}
              onChange={set("address")}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <Label>Date of Birth</Label>
            <TextField
              icon={Calendar}
              placeholder="Select date of birth"
              value={form.dob}
              onChange={set("dob")}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <SelectField
              placeholder="Select gender"
              options={genderOptions}
              value={form.gender}
              onChange={set("gender")}
            />
          </div>
          <div>
            <Label>Blood Group</Label>
            <SelectField
              placeholder="Select blood group"
              options={bloodGroupOptions}
              value={form.bloodGroup}
              onChange={set("bloodGroup")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Email (Optional)</Label>
            <TextField
              icon={Mail}
              placeholder="Enter email address"
              value={form.email}
              onChange={set("email")}
            />
          </div>
          <div>
            <Label>Emergency Contact (Optional)</Label>
            <TextField
              icon={Phone}
              placeholder="Enter emergency contact number"
              value={form.emergencyContact}
              onChange={set("emergencyContact")}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            <UserRoundPlus className="w-4 h-4" />
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Page ---------- */

export default function RegisterPatientPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Register Patient</h2>
              <Breadcrumbs />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Patients
            </button>
          </div>

          <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
            <RegisterPatientForm />
            <div className="space-y-5">
              <InfoPanel />
              <TipPanel />
            </div>
          </div>
        </main>

        <footer className="text-center text-xs text-slate-400 py-6">
          © 2025 CareWell Hospital. All rights reserved.
        </footer>
      </div>
    </div>
  );
}