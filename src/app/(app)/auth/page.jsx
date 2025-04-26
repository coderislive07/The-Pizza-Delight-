"use client"
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, LogIn, UserPlus } from 'lucide-react';
import { loginUser, registerUser } from "../../services/authService";
import { useUserStore } from '../../../store';
import { useRouter } from "next/navigation";


// Allowed admin emails
const ALLOWED_ADMINS = ["dhamijamridul@gmail.com"];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  const router = useRouter();  // Use the useRouter hook for routing

  useEffect(() => {
    // Trigger animation on mount
    setAnimateCard(true);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      console.log(data.user)
      setUser(data.user);

      // Add loading delay before navigating to the dashboard
      setTimeout(() => {
        if(response.isAdmin)
        {
            router.push("/admin/dashboard");
        }
        else
        {
            router.push("/")
        }
        

      }, 1000);  

      alert(isLogin ? "Login Successful" : "Registration Successful");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAnimateCard(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimateCard(true);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden font-[Poppins]">
      {/* Background overlay with pizza image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80 filter blur-[3px]"
        style={{backgroundImage: "url('https://img.freepik.com/free-photo/pizza-with-cheese-brown-wooden-surface-bright-surface_140725-14195.jpg?t=st=1745586351~exp=1745589951~hmac=a5d648273156442b2e9581dc4721130c83a3ec729d226bac7acd2a24dd04e661&w=740')"}}
      ></div>
      
      {/* Animated flames */}
      <div className="absolute bottom-0 left-0 w-full h-20 opacity-30 bg-gradient-to-t from-red-600 to-transparent animate-pulse"></div>
      
      {/* Auth card */}
      <div 
        className={`w-full max-w-md bg-gray-900/50 rounded-lg p-8 shadow-[0_0_30px_rgba(255,0,0,0.3)] relative z-10 border border-red-900/20 transition-all duration-500 ${
          animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center mb-8 relative">
          <h1 className="font-['Bebas_Neue'] text-6xl text-white tracking-wider">The Pizza</h1>
          <div className="absolute font-serif text-red-600 text-xl font-medium bottom-[-20px] right-0 ">Delight</div>
        </div>
        
        <h2 className="text-white text-center mb-8 text-2xl font-semibold">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>

        {error && (
          <div className="bg-red-900/20 text-red-400 p-3 rounded mb-6 text-center border-l-4 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-300 text-sm font-medium">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-3 text-gray-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hellpizza.com"
                required
                className="w-full py-3.5 pl-10 pr-3 bg-gray-800 border border-gray-700 rounded text-white text-base transition-all focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-300 text-sm font-medium">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full py-3.5 pl-10 pr-10 bg-gray-800 border border-gray-700 rounded text-white text-base transition-all focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
              />
              <button 
                type="button" 
                className="absolute right-3 text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock size={20} className="absolute left-3 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full py-3.5 pl-10 pr-3 bg-gray-800 border border-gray-700 rounded text-white text-base transition-all focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="flex justify-center items-center gap-2 py-3.5 mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-all duration-300 disabled:bg-gray-600/40 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            {!loading && (isLogin ? <LogIn size={20} /> : <UserPlus size={20} />)}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          {isLogin ? "Don't have an admin account?" : "Already have an account?"}
          <button 
            type="button" 
            onClick={toggleAuthMode} 
            className="text-red-500 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
