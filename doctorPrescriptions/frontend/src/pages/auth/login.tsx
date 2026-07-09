import InputField from "../../component/inputFiled"
import {
  Lock,
  Mail,
} from "lucide-react";
import {useLogin} from "../../hooks/useLogin"
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

interface SwitchProps {
  onSwitch: () => void;
}

function LoginForm({ onSwitch }: SwitchProps) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const { mutate } = useLogin();


const navigate = useNavigate()

const handleLogin = () => {
  mutate(
    {
      Email: email,
      Password: password,
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("bearer", data.access_token);
        localStorage.setItem("username", data.userdetails.userName);
        localStorage.setItem("roles", data.userdetails.roles);
        navigate({ to: "/receptionist" as const });
      },
    }
  );
};

  return (
    <div className="flex-1 px-8 py-8 flex flex-col justify-center max-w-md">
      <h2 className="text-2xl font-bold text-slate-900">Log in</h2>
      <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Email or username
          </label>
          <InputField icon={Mail} placeholder="Enter your email or username" value={email}
  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
            Password
          </label>
          <InputField icon={Lock} placeholder="Enter your password" showToggle value={password}
  onChange={(e) => setPassword(e.target.value)}/>
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

        <button onClick={handleLogin} className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
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

export default LoginForm