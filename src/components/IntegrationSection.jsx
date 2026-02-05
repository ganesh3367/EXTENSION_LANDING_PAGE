import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntegrationSection.css';

gsap.registerPlugin(ScrollTrigger);

const IntegrationSection = () => {
    const sectionRef = useRef(null);
    const leftTextRef = useRef(null);
    const editorRef = useRef(null);
    const cursorRef = useRef(null);
    const codeRowsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const leftText = leftTextRef.current;
        const editor = editorRef.current;
        const cursor = cursorRef.current;
        const codeRows = codeRowsRef.current;

        if (!section || !editor) return;

        // 1. Entrance Animation (Cinematic & Smooth)
        const entranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Initial States
        gsap.set(leftText, { x: -60, opacity: 0, filter: 'blur(10px)' });
        gsap.set(editor, { x: 60, opacity: 0, filter: 'blur(10px)', scale: 0.95 });

        // Animation
        entranceTl.to(leftText, {
            x: 0, opacity: 1, filter: 'blur(0px)',
            duration: 1.5, ease: "expo.out"
        })
            .to(editor, {
                x: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
                duration: 1.5, ease: "expo.out"
            }, "-=1.3"); // Staggered overlap

        // 2. Parallax Depth on Scroll
        gsap.to(editor, {
            y: -40,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 3. "Alive" Loop
        // Blink Cursor
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        });

        // Gentle Floating (Idle)
        gsap.to(editor, {
            y: -10,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5
        });

        // Random Line Highlights
        const highlightTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        highlightTl
            .to(codeRows[2], { className: "code-row highlighted", duration: 0.1 })
            .to(codeRows[2], { className: "code-row", duration: 0.1, delay: 0.8 })
            .to(codeRows[5], { className: "code-row highlighted", duration: 0.1, delay: 1.5 })
            .to(codeRows[5], { className: "code-row", duration: 0.1, delay: 1 });


        // 4. Mouse Tilt (Premium Feeling)
        const handleMouseMove = (e) => {
            if (window.innerWidth < 1024) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            gsap.to(editor, {
                rotationY: xPos * 4,
                rotationX: -yPos * 3,
                boxShadow: `${-xPos * 30}px ${yPos * 20 + 80}px 150px -30px rgba(0,0,0,0.8)`, // Dynamic shadow
                duration: 1.2,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            highlightTl.kill();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const addToCodeRows = (el) => { if (el && !codeRowsRef.current.includes(el)) codeRowsRef.current.push(el); };

    return (
        <section className="integration-section" ref={sectionRef}>
            <div className="integration-container">

                {/* Left Text */}
                <div className="int-left-content" ref={leftTextRef}>
                    <div className="int-label">INTEGRATION</div>
                    <h2 className="int-title">Right where you work.</h2>
                    <p className="int-desc">
                        No context switching. No copying and pasting from web tools.
                        Generate clean React components directly inside VS Code.
                    </p>
                </div>

                {/* Right Mock */}
                <div className="int-right-content">
                    <div className="vscode-mock" ref={editorRef}>

                        <div className="vscode-header">
                            <div className="win-controls">
                                <div className="win-dot" style={{ background: '#ff5f56' }}></div>
                                <div className="win-dot" style={{ background: '#ffbd2e' }}></div>
                                <div className="win-dot" style={{ background: '#27c93f' }}></div>
                            </div>
                            <div className="tabs-container">
                                <div className="tab active">
                                    <span style={{ marginRight: 6 }}>⚛️</span> Hero.jsx
                                </div>
                                <div className="tab">utils.js</div>
                            </div>
                        </div>

                        <div className="vscode-body">
                            <div className="vscode-sidebar">
                                <div className="sidebar-icon active"></div>
                                <div className="sidebar-icon"></div>
                                <div className="sidebar-icon"></div>
                            </div>

                            <div className="vscode-editor-area">
                                <div className="line-numbers">
                                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
                                </div>
                                <div className="code-content">
                                    <div className="code-row" ref={addToCodeRows}><span className="k">import</span> React <span className="k">from</span> <span className="s">'react'</span>;</div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;</div>
                                    <div className="code-row" ref={addToCodeRows}><span className="k">export const</span> <span className="f">Hero</span> = (<span className="v">props</span>) =&gt; (</div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;<span className="t">&lt;section</span> <span className="v">className</span>=<span className="s">"hero"</span><span className="t">&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;h1&gt;</span>{'{props.title}'}<span className="t">&lt;/h1&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;p&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generated directly in VS Code.</div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;/p&gt;</span><span className="cursor" ref={cursorRef}></span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;<span className="t">&lt;/section&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>);</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default IntegrationSection;
