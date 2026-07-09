import  { useState,type ReactNode } from "react";
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
  MessageSquare,
  Settings,
  LogOut,
  UserRoundPlus,
  CalendarPlus,
  Search,
  UserCheck2,
  Printer,
  Calendar,
 type LucideIcon,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

/* ---------- Types ---------- */

type StatusType =
  | "Available"
  | "Busy"
  | "Waiting"
  | "Completed"
  | "In Progress"
  | "Scheduled";

interface NavItem {
  label: string;
  icon: LucideIcon;
  badge?: number;
  path : string
}

interface StatCardData {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  delta: string;
  deltaPositive: boolean;
}

interface Doctor {
  name: string;
  department: string;
  time: string;
  status: StatusType;
}

interface Appointment {
  token: string;
  patient: string;
  doctor: string;
  time: string;
  status: StatusType;
}

interface QuickAction {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  path? : string
}

/* ---------- Static data ---------- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home , path : "/dashboard" },
  { label: "Patients", icon: Users , path : "/createpatient"  },
  { label: "Appointments", icon: CalendarDays , path : "/appointments"},
  { label: "Doctors", icon: Stethoscope , path : "/doctors"},
  { label: "Departments", icon: Grid2x2 , path : "/departments"},
  { label: "Messages", icon: MessageSquare, badge: 3  , path :"/messages" },
  { label: "Settings", icon: Settings , path : "/settings"},
];

const statCards: StatCardData[] = [
  {
    label: "Today's Patients",
    value: 42,
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    delta: "+12% from yesterday",
    deltaPositive: true,
  },
  {
    label: "Doctors Available",
    value: 8,
    icon: Stethoscope,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    delta: "+2 from yesterday",
    deltaPositive: true,
  },
//   {
//     label: "Appointments",
//     value: 35,
//     icon: CalendarDays,
//     iconBg: "bg-amber-100",
//     iconColor: "text-amber-600",
//     delta: "+8% from yesterday",
//     deltaPositive: true,
//   },
//   {
//     label: "Waiting Patients",
//     value: 12,
//     icon: Users,
//     iconBg: "bg-violet-100",
//     iconColor: "text-violet-600",
//     delta: "-3 from yesterday",
//     deltaPositive: false,
//   },
];

const doctors: Doctor[] = [
  { name: "Dr. Arjun Mehta", department: "Cardiology", time: "9:00 AM - 4:00 PM", status: "Available" },
  { name: "Dr. Priya Nair", department: "Neurology", time: "10:00 AM - 5:00 PM", status: "Available" },
  { name: "Dr. Rahul Verma", department: "Pediatrics", time: "9:00 AM - 2:00 PM", status: "Busy" },
  { name: "Dr. Neha Singh", department: "Orthopedic", time: "11:00 AM - 6:00 PM", status: "Available" },
  { name: "Dr. Amit Patel", department: "General Medicine", time: "9:00 AM - 5:00 PM", status: "Available" },
];

const appointments: Appointment[] = [
  { token: "1001", patient: "Rajesh Kumar", doctor: "Dr. Arjun Mehta", time: "10:00 AM", status: "Waiting" },
  { token: "1002", patient: "Sneha Iyer", doctor: "Dr. Priya Nair", time: "10:20 AM", status: "Completed" },
  { token: "1003", patient: "Vikram Shah", doctor: "Dr. Rahul Verma", time: "10:30 AM", status: "Waiting" },
  { token: "1004", patient: "Anita Patel", doctor: "Dr. Neha Singh", time: "11:00 AM", status: "In Progress" },
  { token: "1005", patient: "Mohit Gupta", doctor: "Dr. Amit Patel", time: "11:30 AM", status: "Scheduled" },
];

const quickActions: QuickAction[] = [
  { label: "Register Patient", icon: UserRoundPlus, iconColor: "text-blue-600" , path : "/createpatient" },
  { label: "Book Appointment", icon: CalendarPlus, iconColor: "text-emerald-600" },
  { label: "Search Patient", icon: Search, iconColor: "text-violet-600" },
  { label: "Check Doctor Availability", icon: UserCheck2, iconColor: "text-amber-600" },
  { label: "Print Token", icon: Printer, iconColor: "text-rose-600" },
];

const statusStyles: Record<StatusType, string> = {
  Available: "bg-emerald-100 text-emerald-700",
  Busy: "bg-amber-100 text-amber-700",
  Waiting: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Scheduled: "bg-violet-100 text-violet-700",
};

/* ---------- Small components ---------- */

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
        View All
      </a>
    </div>
  );
}

/* ---------- Layout pieces ---------- */

function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

const handleChange = (label: string, path?: string) => {

  setActive(label);

  if (!path) return;

  navigate({ to: path });
};

const handleLogout = ()=>{

    localStorage.clear()

    navigate({to : "/auth"})

}

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
              onClick={() => {
  console.log("clicked");
  handleChange(label, path);
}}
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
          <LogOut className="w-[18px] h-[18px]" onClick={()=>handleLogout}/>
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
        <h1 className="text-lg font-semibold text-slate-800">Receptionist Dashboard</h1>
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
            <p className="font-semibold text-slate-800">{localStorage.getItem("username")}</p>
            <p className="text-slate-400 text-xs">{localStorage.getItem("roles")}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

function GreetingBanner() {
    const today = new Date();

const day = today.toLocaleDateString("en-US", {
  weekday: "long",
});

const date = today.toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
  return (
    <Card className="flex items-center justify-between px-6 py-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Good Morning, {localStorage.getItem("username")} <span>👋</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Here's what's happening at the hospital today.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
      <div className="text-sm leading-tight">
  <p className="font-semibold text-slate-800">{day}</p>
  <p className="text-slate-400">{date}</p>
</div>
      </div>
    </Card>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {statCards.map(({ label, value, icon: Icon, iconBg, iconColor, delta, deltaPositive }) => (
        <Card key={label} className="px-5 py-5 flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
            <p className={`text-xs font-medium mt-1 ${deltaPositive ? "text-emerald-600" : "text-rose-500"}`}>
              {delta}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function DoctorsTable() {
  return (
    <Card>
      <CardHeader title="Today's Available Doctors" />
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-y border-slate-100">
            <th className="font-medium px-5 py-2.5">Doctor</th>
            <th className="font-medium px-3 py-2.5">Department</th>
            <th className="font-medium px-3 py-2.5">Time</th>
            <th className="font-medium px-3 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.name} className="border-b border-slate-50 last:border-none">
              <td className="px-5 py-3 font-medium text-slate-800">{d.name}</td>
              <td className="px-3 py-3 text-slate-500">{d.department}</td>
              <td className="px-3 py-3 text-slate-500">{d.time}</td>
              <td className="px-3 py-3">
                <StatusBadge status={d.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function AppointmentsTable() {
  return (
    <Card>
      <CardHeader title="Today's Appointments" />
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-y border-slate-100">
            <th className="font-medium px-5 py-2.5">Token No.</th>
            <th className="font-medium px-3 py-2.5">Patient Name</th>
            <th className="font-medium px-3 py-2.5">Doctor</th>
            <th className="font-medium px-3 py-2.5">Time</th>
            <th className="font-medium px-3 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.token} className="border-b border-slate-50 last:border-none">
              <td className="px-5 py-3 font-medium text-slate-800">{a.token}</td>
              <td className="px-3 py-3 text-slate-500">{a.patient}</td>
              <td className="px-3 py-3 text-slate-500">{a.doctor}</td>
              <td className="px-3 py-3 text-slate-500">{a.time}</td>
              <td className="px-3 py-3">
                <StatusBadge status={a.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function QuickActions() {

    const navigate = useNavigate()

  return (
    <Card className="px-6 py-6">
      <h3 className="font-bold text-slate-900 mb-5">Quick Actions</h3>
      <div className="grid grid-cols-5 gap-4">
        {quickActions.map(({ label, icon: Icon, iconColor , path}) => (
          <button
            key={label}
            onClick={()=>navigate({to : path})}
            className="flex flex-col items-center justify-center gap-3 border border-slate-200 rounded-xl py-7 hover:border-blue-300 hover:shadow-sm transition"
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
            <span className="text-sm font-medium text-slate-700 text-center px-2">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Page ---------- */

export default function ReceptionistDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="p-8 space-y-6">
          <GreetingBanner />
          <StatsRow />
          <div className="grid grid-cols-2 gap-6">
            <DoctorsTable />
            <AppointmentsTable />
          </div>
          <QuickActions />
        </main>
      </div>
    </div>
  );
}