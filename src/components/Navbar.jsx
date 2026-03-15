import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Menu, X, Rocket, LogIn, LayoutDashboard, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const { currentUser, loading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Update background state
            setIsScrolled(currentScrollY > 50);

            // The 'hidden' state logic is removed as per the instruction's implied changes.
            // If it needs to be re-added, it should be done explicitly.

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <span className="logo-dot">.</span>
                    </Link>
                </div>

                <div className="navbar-links">
                    {pathname === '/' ? (
                        <>
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#how-it-works" className="nav-link">How it works</a>
                            <a href="#benefits" className="nav-link">Benefits</a>
                        </>
                    ) : (
                        <Link to="/" className="nav-link">Home</Link>
                    )}
                </div>

                <div className="navbar-actions">
                    <button 
                        className="theme-toggle" 
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                    {currentUser ? (
                        <Link to="/profile" className="nav-btn nav-btn-primary">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className={`nav-btn nav-btn-primary ${loading ? 'loading' : ''}`}>
                            {loading ? '...' : 'Sign In'}
                        </Link>
                    )}
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
