import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <span className="logo-dot">.</span>
                </div>

                <div className="navbar-links">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it works</a>
                    <a href="#benefits" className="nav-link">Benefits</a>
                </div>

                <div className="navbar-actions">
                    <Link to="/about" className="nav-btn nav-btn-primary" style={{ textDecoration: 'none' }}>
                        About It
                    </Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
