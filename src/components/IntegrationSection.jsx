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

        // 1. Entrance Animation (Cinematic)
        const entranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Set initial state
        gsap.set(leftText, { x: -50, opacity: 0, filter: 'blur(10px)' });
        gsap.set(editor, { x: 50, opacity: 0, filter: 'blur(10px)' });

        entranceTl.to(leftText, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" })
            .to(editor, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }, "-=1");

        // 2. Parallax Depth (Scroll)
        gsap.to(editor, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(leftText, {
            y: -20, // Slower than editor
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 3. "Alive" Editor Animations (Looping)

        // Blink Cursor
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        });

        // Highlight Row Simulation
        const aliveTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        // Highlight row 2
        aliveTl.to(codeRows[2], { className: "code-row highlighted", duration: 0.1 })
            .to(codeRows[2], { className: "code-row", duration: 0.1, delay: 0.8 }) // Un-highlight
            // Highlight row 5
            .to(codeRows[5], { className: 'code-row highlighted', duration: 0.1, delay: 1 })
            .to(codeRows[5], { className: "code-row", duration: 0.1, delay: 1.5 });


        // 4. Mouse Move Tilt (Premium)
        const handleMouseMove = (e) => {
            if (window.innerWidth < 1024) return; // Desktop only
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize -1 to 1
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            gsap.to(editor, {
                rotationY: xPos * 6, // Max 6deg
                rotationX: -yPos * 4, // Max 4deg inverted
                boxShadow: `${-xPos * 20}px ${yPos * 20 + 40}px 80px -10px rgba(0,0,0,0.6)`, // Dynamic shadow
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            aliveTl.kill();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const addToCodeRows = (el) => { if (el && !codeRowsRef.current.includes(el)) codeRowsRef.current.push(el); };

    return (
        <section className="integration-section" ref={sectionRef}>
            <div className="integration-container">

                {/* Left Text */}
                <div className="int-left-content" ref={leftTextRef}>
                    <span className="int-label">INTEGRATION</span>
                    <h2 className="int-title">Right where you work.</h2>
                    <p className="int-desc">
                        No context switching. No copying and pasting from a web tool.
                        Generate components directly inside VS Code with a single command.
                    </p>
                </div>

                {/* Right Mock */}
                <div className="int-right-content">
                    <div className="vscode-mock" ref={editorRef}>
                        <div className="vscode-highlight"></div>

                        <div className="vscode-header">
                            <div className="win-controls">
                                <div className="win-dot" style={{ background: '#ff5f56' }}></div>
                                <div className="win-dot" style={{ background: '#ffbd2e' }}></div>
                                <div className="win-dot" style={{ background: '#27c93f' }}></div>
                            </div>
                            <div className="tabs-container">
                                <div className="tab active">Hero.jsx</div>
                                <div className="tab" style={{ opacity: 0.6 }}>utils.js</div>
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
                                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div>
                                </div>
                                <div className="code-content">
                                    <div className="code-row" ref={addToCodeRows}><span className="k">import</span> React <span className="k">from</span> <span className="s">'react'</span>;</div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;</div>
                                    <div className="code-row" ref={addToCodeRows}><span className="k">export const</span> <span className="f">Hero</span> = (<span className="v">props</span>) =&gt; (</div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;<span className="t">&lt;section</span> <span className="v">className</span>=<span className="s">"hero"</span><span className="t">&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;h1&gt;</span>{'{props.title}'}<span className="t">&lt;/h1&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;p&gt;</span></div>
                                    <div className="code-row" ref={addToCodeRows}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start building with speed.</div>
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
