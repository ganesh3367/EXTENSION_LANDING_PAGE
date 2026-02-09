import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-text">Built for VS Code</span>
                        <span className="footer-copyright">© {currentYear} Ganesh Wayal. All rights reserved.</span>
                    </div>

                    <div className="footer-links">
                        <a href="https://twitter.com/ganeshwayal" target="_blank" rel="noopener noreferrer" className="footer-link">
                            Twitter
                        </a>
                        <a href="https://github.com/ganeshwayal" target="_blank" rel="noopener noreferrer" className="footer-link">
                            GitHub
                        </a>
                        <a href="mailto:contact@ganeshwayal.com" className="footer-link">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
