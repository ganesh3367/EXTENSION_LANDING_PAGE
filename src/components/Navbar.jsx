import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { currentUser, loading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Update background state
            setIsScrolled(currentScrollY > 50);
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
