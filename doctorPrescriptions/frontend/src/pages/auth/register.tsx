import { useState } from "react";
import InputField from "../../component/inputFiled";
import InputSelect from "../../component/inputSelect";

import {
  User,
  Lock,
  Mail,
  Phone,
  Building2,
  Stethoscope,
  BadgeCheck,
} from "lucide-react";

interface UserRegister{
  Name : string,
  Qualification : string,
  Specialization : string,
  Email : string,
  PhoneNumber : string,
  HospitalName : string,
  RegistrationNumber : string,
  Password : string,
  Roles : string
}

import { useRegister } from "../../hooks/useRegister";

interface SwitchProps {
  onSwitch: () =>void;
}

const roles = [
  "Doctoer",
  "Receptionist",
  "Cashser",
];

function RegisterForm({ onSwitch }: SwitchProps) {
  const { mutate, isPending } = useRegister();

  const [formData, setFormData] = useState<UserRegister>({
    Name: "",
    Qualification: "",
    Specialization: "",
    Email: "",
    PhoneNumber: "",
    HospitalName: "",
    RegistrationNumber: "",
    Password: "",
    Roles: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.Password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutate(formData);
  };

  return (
    <div className="flex-1 px-8 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Register
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Create your account to get started.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        {/* Name & Role */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">
              Full Name
            </label>

            <InputField
              icon={User}
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">
              Role
            </label>

            <select
              name="Roles"
              value={formData.Roles}
              onChange={handleChange}
              className="w-full pl-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
            >
              <option value="" disabled>
                Select role
              </option>
              {roles.map((role) => (
                <option key={role} value={role} className="text-slate-800">
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Qualification & Specialization */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">
              Qualification
            </label>

            <InputField
              icon={BadgeCheck}
              name="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              placeholder="MBBS"
            />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">
              Specialization
            </label>

            <InputField
              icon={Stethoscope}
              name="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              placeholder="Cardiology"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Email
          </label>

          <InputField
            icon={Mail}
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Phone Number
          </label>

          <InputField
            icon={Phone}
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="9876543210"
          />
        </div>

        {/* Hospital */}
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Hospital Name
          </label>

          <InputField
            icon={Building2}
            name="HospitalName"
            value={formData.HospitalName}
            onChange={handleChange}
            placeholder="Apollo Hospital"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Registration Number
          </label>

          <InputField
            icon={BadgeCheck}
            name="RegistrationNumber"
            value={formData.RegistrationNumber}
            onChange={handleChange}
            placeholder="Registration Number"
          />
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">
              Password
            </label>

            <InputField
              icon={Lock}
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              showToggle
            />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">
              Confirm Password
            </label>

            <InputField
              icon={Lock}
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
              showToggle
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" required />

          <span>
            I agree to the Terms & Conditions and Privacy
            Policy.
          </span>
        </label>

        {/* Register */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-600 font-semibold"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;