import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, ArrowRightOnRectangleIcon } from './icons';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-brand-primary/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <ShieldCheckIcon className="w-8 h-8 text-brand-primary" />
          <span className="text-2xl font-bold text-white tracking-tight">GuardRails AI</span>
        </NavLink>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-lg transition-colors duration-300 ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-gray hover:text-white'}`
            }
          >
            {isLoggedIn ? 'Dashboard Home' : 'Home'}
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink 
                to="/scanner" 
                className={({ isActive }) => 
                  `text-lg transition-colors duration-300 ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-gray hover:text-white'}`
                }
              >
                Scanner
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-lg transition-colors duration-300 ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-gray hover:text-white'}`
                }
              >
                Analytics
              </NavLink>
              <NavLink 
                to="/report" 
                className={({ isActive }) => 
                  `text-lg transition-colors duration-300 ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-gray hover:text-white'}`
                }
              >
                Report
              </NavLink>
            </>
          )}
          <NavLink 
            to="/compliance" 
            className={({ isActive }) => 
              `text-lg transition-colors duration-300 ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-gray hover:text-white'}`
            }
          >
            Compliance
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
           {isLoggedIn ? (
             <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-lg text-brand-gray hover:text-white transition-colors duration-300"
              aria-label="Sign Out"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              Sign Out
            </button>
           ) : (
            <>
              <NavLink to="/signin" className="text-lg text-brand-gray hover:text-white transition-colors duration-300">
                Sign In
              </NavLink>
              <NavLink to="/signin" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-brand-primary/30 hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </NavLink>
            </>
           )}
        </div>
        <div className="md:hidden">
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;