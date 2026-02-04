import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LiveTransformation.css';

gsap.registerPlugin(ScrollTrigger);

const LiveTransformation = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const editorRef = useRef(null);

    // Code Refs - Arrays for line-by-line animation
    const htmlLinesRef = useRef([]);
    const jsxLinesRef = useRef([]);
    const badgeRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const header = headerRef.current;
        const editor = editorRef.current;
        const htmlLines = htmlLinesRef.current;
        const jsxLines = jsxLinesRef.current;
        const badge = badgeRef.current;

        if (!section || !editor) return;

        // 1. Initial State
        gsap.set(header, { y: 30, opacity: 0 });
        gsap.set(editor, { scale: 0.96, opacity: 0, filter: 'blur(10px)' });
        gsap.set(jsxLines, { opacity: 0, y: 10 }); // JSX Hidden
        gsap.set(htmlLines, { opacity: 1, y: 0 }); // HTML Visible

        // 2. Entrance Animation (Viewport)
        const entranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        entranceTl.to(header, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
            .to(editor, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "expo.out" }, "-=0.8");

        // 3. Pinned Scroll Transformation (The "WOW" moment)
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "center center",
                end: "+=2000", // Give it time
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // Step A: Fade OUT HTML lines (staggered)
        scrollTl.to(htmlLines, {
            opacity: 0,
            x: -20, // Drift left
            stagger: 0.1,
            duration: 1,
            ease: "power2.in"
        });

        // Step B: Fade IN JSX lines (staggered)
        scrollTl.to(jsxLines, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5"); // Overlap slightly with HTML fade for fluidity

        // Step C: Badge Enters
        scrollTl.to(badge, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        // 4. Parallax & 3D Tilt (Subtle)
        // We can use a separate ScrollTrigger or just animate properties in the main scrub
        scrollTl.to(editor, {
            rotationX: 2, // Slight tilt back
            y: -50, // Move up faster than header
            ease: "none"
        }, 0); // At start of scrub

        scrollTl.to(header, {
            y: -20, // Move up slower
            ease: "none"
        }, 0);


        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            // Timelines are killed by ScrollTrigger usually
        };
    }, []);

    // Helper for adding logic
    const addToHtml = (el) => { if (el && !htmlLinesRef.current.includes(el)) htmlLinesRef.current.push(el); };
    const addToJsx = (el) => { if (el && !jsxLinesRef.current.includes(el)) jsxLinesRef.current.push(el); };

    return (
        <section className="live-transformation" ref={sectionRef}>
            <div className="lt-glow"></div>

            <div className="lt-container" ref={containerRef}>
                <div className="lt-header" ref={headerRef}>
                    <span className="lt-label">Live Conversion Preview</span>
                    <h2 className="lt-title">See it happen live.</h2>
                    <div className="lt-divider"></div>
                </div>

                <div className="editor-window" ref={editorRef}>
                    <div className="editor-header">
                        <div className="window-controls">
                            <div className="dot" style={{ background: '#ff5f56' }}></div>
                            <div className="dot" style={{ background: '#ffbd2e' }}></div>
                            <div className="dot" style={{ background: '#27c93f' }}></div>
                        </div>
                        <div className="filename">Component.jsx</div>
                    </div>

                    <div className="editor-body">

                        {/* HTML Layer */}
                        <div className="code-layer html-layer">
                            <div className="code-line" ref={addToHtml}><span className="comment">&lt;!-- Raw HTML --&gt;</span></div>
                            <div className="code-line" ref={addToHtml}><span className="tag">&lt;div</span> <span className="attr">class</span>=<span className="val">"user-profile"</span>&gt;</div>
                            <div className="code-line" ref={addToHtml} style={{ paddingLeft: '1.5rem' }}><span className="tag">&lt;img</span> <span className="attr">src</span>=<span className="val">"avatar.jpg"</span> <span className="attr">alt</span>=<span className="val">"User"</span> /&gt;</div>
                            <div className="code-line" ref={addToHtml} style={{ paddingLeft: '1.5rem' }}><span className="tag">&lt;h3&gt;</span><span className="text">Jane Doe</span><span className="tag">&lt;/h3&gt;</span></div>
                            <div className="code-line" ref={addToHtml} style={{ paddingLeft: '1.5rem' }}><span className="tag">&lt;button</span> <span className="attr">onclick</span>=<span className="val">"follow()"</span>&gt;</div>
                            <div className="code-line" ref={addToHtml} style={{ paddingLeft: '3rem' }}><span className="text">Follow</span></div>
                            <div className="code-line" ref={addToHtml} style={{ paddingLeft: '1.5rem' }}><span className="tag">&lt;/button&gt;</span></div>
                            <div className="code-line" ref={addToHtml}><span className="tag">&lt;/div&gt;</span></div>
                        </div>

                        {/* REACT Layer */}
                        <div className="code-layer jsx-layer">
                            <div className="code-line" ref={addToJsx}><span className="comment">// React Component</span></div>
                            <div className="code-line" ref={addToJsx}><span className="keyword">const</span> <span className="component">UserProfile</span> = () =&gt; (</div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '1.5rem' }}><span className="jsx-tag">&lt;div</span> <span className="prop">className</span>=<span className="val">"user-profile"</span>&gt;</div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '3rem' }}><span className="component">&lt;Avatar</span> <span className="prop">src</span>=<span className="val">"/avatar.jpg"</span> <span className="prop">alt</span>=<span className="val">"User"</span> /&gt;</div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '3rem' }}><span className="component">&lt;UserName&gt;</span>Jane Doe<span className="component">&lt;/UserName&gt;</span></div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '3rem' }}><span className="component">&lt;Button</span> <span className="prop">onClick</span>=<span className="brace">&#123;</span><span className="text">handleFollow</span><span className="brace">&#125;</span>&gt;</div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '4.5rem' }}>Follow</div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '3rem' }}><span className="component">&lt;/Button&gt;</span></div>
                            <div className="code-line" ref={addToJsx} style={{ paddingLeft: '1.5rem' }}><span className="jsx-tag">&lt;/div&gt;</span></div>
                            <div className="code-line" ref={addToJsx}>);</div>
                        </div>

                    </div>

                    {/* Badge */}
                    <div className="lt-badge" ref={badgeRef}>
                        <div className="check-icon">✓</div>
                        1-Click Conversion
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LiveTransformation;
