
import  { useState,type InputHTMLAttributes } from "react";
import {
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  showToggle?: boolean;
}

function InputField({ icon: Icon, type = "text", placeholder, showToggle, ...props }: FieldProps) {
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

export default InputField