import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-glow"></div>

            <div className="container">
                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            Truncate<span className="footer-logo-dot">.</span>
                        </div>
                        <p className="footer-tagline">
                            Convert HTML to React components instantly, right inside VS Code.
                        </p>
                    </div>

                    <div className="footer-columns">
                        <div className="footer-col">
                            <h4 className="footer-col-title">Product</h4>
                            <a href="#features" className="footer-link">Features</a>
                            <a href="#how-it-works" className="footer-link">How it Works</a>
                            <a href="#benefits" className="footer-link">Benefits</a>
                            <a href="https://marketplace.visualstudio.com/items?itemName=GaneshWayal.html-to-react-js" target="_blank" rel="noopener noreferrer" className="footer-link">VS Code Marketplace</a>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-col-title">Connect</h4>
                            <a href="https://github.com/ganesh3367" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                            <a href="https://twitter.com/ganeshwayal" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter / X</a>
                            <a href="https://www.linkedin.com/in/ganeshwayal/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                            <a href="mailto:contact@ganeshwayal.com" className="footer-link">Email</a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <span className="footer-copyright">
                        © {currentYear} Ganesh Wayal. All rights reserved.
                    </span>

                    <div className="footer-badge">
                        <span className="badge-dot"></span>
                        Built with React + GSAP
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
