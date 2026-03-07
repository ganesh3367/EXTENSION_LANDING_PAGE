import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Update background state
            setScrolled(currentScrollY > 50);

            // Toggle visibility on scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
