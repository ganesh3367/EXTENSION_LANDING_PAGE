import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Gem, Rocket, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './aboutit.css';

gsap.registerPlugin(ScrollTrigger);

const Aboutit = () => {
    const headerRef = useRef(null);
    const storyRef = useRef(null);
    const gridRef = useRef(null);
    const featuresRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance animation
            const entrance = gsap.timeline();
            entrance.fromTo(".about-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
                .fromTo(".about-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
                .fromTo(".about-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");

            // Scroll animations
            if (gridRef.current) {
                gsap.fromTo(".about-card", { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
                });
            }

            if (storyRef.current) {
                gsap.fromTo(storyRef.current, { opacity: 0, scale: 0.95 }, {
                    opacity: 1, scale: 1, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: storyRef.current, start: "top 75%" }
                });
            }

            if (featuresRef.current) {
                gsap.fromTo(".feature-item", { x: -30, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: featuresRef.current, start: "top 80%" }
                });
            }
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="aboutit-page">
            <div className="about-bg-glow"></div>

            <div className="about-container">
                <Link to="/" className="about-home-btn">← Home</Link>

                {/* Header */}
                <header className="about-header" ref={headerRef}>
                    <span className="about-eyebrow">The Origin Story</span>
                    <h1 className="about-title">Why HTML to React?</h1>
                    <p className="about-subtitle">
                        Built by a developer, for developers. Because rewriting the same
                        boilerplate code manually should have been obsolete years ago.
                    </p>
                </header>

                {/* Problem vs Solution Grid */}
                <div className="about-grid" ref={gridRef}>
                    <div className="about-card">
                        <div className="card-icon"><Zap size={32} /></div>
                        <h3 className="card-title">The Problem</h3>
                        <p className="card-text">
                            You find a great design snippet online. It's raw HTML.
                            To use it in your React app, you have to manually change every <code>class</code> to <code>className</code>,
                            close every <code>img</code> and <code>input</code> tag, and fix style attributes.
                            It disrupts your flow.
                        </p>
                    </div>
                    <div className="about-card">
                        <div className="card-icon"><Gem size={32} /></div>
                        <h3 className="card-title">The Solution</h3>
                        <p className="card-text">
                            A single command right in VS Code. Highlight your HTML, run
                            "Convert to React Component", and you get clean, functional React code instantly.
                            It preserves your structure while fixing all the JSX syntax errors automatically.
                        </p>
                    </div>
                    <div className="about-card">
                        <div className="card-icon"><Rocket size={32} /></div>
                        <h3 className="card-title">The Goal</h3>
                        <p className="card-text">
                            To minimize the friction between "seeing a design" and "implementing it".
                            This extension allows you to prototype faster, migrate legacy code easier,
                            and focus on logic rather than syntax drudgery.
                        </p>
                    </div>
                </div>

                {/* The "Why" Story */}
                <section className="about-story" ref={storyRef}>
                    <div className="story-content">
                        <h2 className="story-title">More Than Just Regex</h2>
                        <div className="story-text">
                            <p>
                                When I first started building this tool, I thought simple text replacement would be enough.
                                I was wrong. HTML is messy. Nested tags, self-closing requirements, and inline styles
                                make it complex to parse correctly.
                            </p>
                            <p>
                                I built a robust parser that understands the structure of your code.
                                It doesn't just swap text; it intelligently reconstructs your HTML as valid JSX.
                                It handles the edge cases—like SVG attributes, style objects, and void elements—so
                                you don't have to debug the output.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature List */}
                <section className="features-section" ref={featuresRef}>
                    <div className="features-header">
                        <h2 className="story-title">What's Under the Hood</h2>
                    </div>
                    <div className="feature-list">
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>Instant Conversion</h4>
                                <p>Zero latency. Select text, run command, done.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>Smart Style Parsing</h4>
                                <p>Converts CSS strings to React style objects automatically.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>Self-Closing Tags</h4>
                                <p>Auto-detects and closes void elements like img, br, and input.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>Class to ClassName</h4>
                                <p>Safely renames attributes without breaking your layout.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>SVG Support</h4>
                                <p>Fixes SVG attribute casings (e.g., stroke-width to strokeWidth).</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Check className="feature-check" size={24} />
                            <div className="feature-content">
                                <h4>No Configuration</h4>
                                <p>Works out of the box. No settings json file needed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <div className="about-cta">
                    <a href="https://marketplace.visualstudio.com/items?itemName=GaneshWayal.html-to-react-js" target="_blank" rel="noopener noreferrer" className="cta-button">
                        Get It on Marketplace
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Aboutit;