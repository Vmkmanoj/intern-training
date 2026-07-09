
import {
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface SelectProps {
  icon?: LucideIcon;
  options: string[];
  placeholder: string;
}

function InputSelect({ icon: Icon, options, placeholder }: SelectProps) {
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

export default InputSelect