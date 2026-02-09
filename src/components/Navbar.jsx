import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add background when scrolled
            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Hide/Show on scroll
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
                    <a href="https://marketplace.visualstudio.com/items?itemName=GaneshWayal.html-to-react-js" target="_blank" rel="noopener noreferrer" className="nav-btn nav-btn-primary" style={{ textDecoration: 'none' }}>
                        Get Extension
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
