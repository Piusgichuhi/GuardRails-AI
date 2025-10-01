import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, UserIcon, KeyIcon } from './icons';

interface SignInPageProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here.
    // For this demo, we simulate a successful login.
    setIsLoggedIn(true);
    navigate('/'); // Redirect to homepage (which will now be the user dashboard)
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-grid-pattern py-12">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-brand-dark/80 backdrop-blur-md border border-brand-primary/20 rounded-xl shadow-2xl shadow-brand-primary/10 animate-fade-in-up">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheckIcon className="w-12 h-12 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-brand-gray">Sign in to access your dashboard.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray pointer-events-none" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-brand-dark border border-brand-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-brand-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
              required
              defaultValue="demo@guardrails.ai"
            />
          </div>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray pointer-events-none" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-brand-dark border border-brand-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-brand-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
              required
              defaultValue="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-brand-gray cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded bg-brand-dark border-brand-gray text-brand-primary focus:ring-brand-primary" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-brand-primary hover:underline">Forgot Password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-brand-primary/30 hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-brand-gray">
          Don't have an account? <NavLink to="/signin" className="font-medium text-brand-primary hover:underline">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;