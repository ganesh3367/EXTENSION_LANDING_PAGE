import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VSCodeIntegration.css';

gsap.registerPlugin(ScrollTrigger);

const VSCodeIntegration = () => {
    const sectionRef = useRef(null);
    const mockupRef = useRef(null);
    const textRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const sidebarRef = useRef(null);
    const cursorRef = useRef(null);
    const linesRef = useRef([]);
    const filesRef = useRef([]);
    const glowRef = useRef(null);
    const badgeRef = useRef(null);

    const addToLines = (el) => {
        if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
    };
    const addToFiles = (el) => {
        if (el && !filesRef.current.includes(el)) filesRef.current.push(el);
    };

    useEffect(() => {
        const section = sectionRef.current;

        // Master timeline scrubbed by scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom center",
                scrub: 1.5,
            }
        });

        tl.fromTo(mockupRef.current,
            {
                rotateY: 15,
                rotateX: 5,
                x: 120,
                opacity: 0,
                scale: 0.9
            },
            {
                rotateY: 0,
                rotateX: 0,
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power3.out"
            }
        );

        tl.fromTo(titleRef.current,
            { x: -60, opacity: 0, filter: "blur(8px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
            "-=1.2"
        );

        tl.fromTo(descRef.current,
            { x: -40, opacity: 0, filter: "blur(6px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
            "-=0.8"
        );

        // 3. Sidebar files stagger in
        tl.fromTo(filesRef.current,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "power2.out" },
            "-=0.6"
        );

        // 4. Code lines type in one by one
        tl.fromTo(linesRef.current,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, stagger: 0.06, duration: 0.2, ease: "power2.out" },
            "-=0.3"
        );

        // 5. Badge pops in
        tl.fromTo(badgeRef.current,
            { y: 15, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
            "-=0.2"
        );

        // Background glow follows scroll
        tl.fromTo(glowRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
            0
        );

        // Blinking cursor (independent, non-scrubbed)
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        });

        // Mouse-driven 3D tilt on mockup
        const handleMouseMove = (e) => {
            const rect = section.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(mockupRef.current, {
                rotateY: x * 6,
                rotateX: -y * 4,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(mockupRef.current, {
                rotateY: 0,
                rotateX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        };

        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            section.removeEventListener('mousemove', handleMouseMove);
            section.removeEventListener('mouseleave', handleMouseLeave);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="vscode-section" ref={sectionRef}>
            <div className="vsi-glow" ref={glowRef}></div>

            <div className="container vscode-container">
                <div className="vscode-text" ref={textRef}>
                    <h2 className="vscode-title" ref={titleRef}>
                        Right where<br />you work.
                    </h2>
                    <p className="vscode-desc" ref={descRef}>
                        No external apps. No copy-pasting from web tools.
                        The extension lives inside VS Code, ready whenever you need it.
                    </p>
                    <div className="vsi-badge" ref={badgeRef}>
                        <span className="vsi-badge-icon">⚡</span>
                        One-click conversion
                    </div>
                </div>

                <div className="vscode-mockup" ref={mockupRef}>
                    {/* Title bar */}
                    <div className="vsi-titlebar">
                        <div className="vsi-traffic-lights">
                            <span className="tl-dot tl-red"></span>
                            <span className="tl-dot tl-yellow"></span>
                            <span className="tl-dot tl-green"></span>
                        </div>
                        <span className="vsi-titlebar-text">App.jsx — Truncate</span>
                        <div style={{ width: '52px' }}></div>
                    </div>

                    <div className="vsi-body">
                        {/* Sidebar */}
                        <div className="sidebar" ref={sidebarRef}>
                            <div className="sidebar-header">Explorer</div>
                            <div className="file-list">
                                <div className="file-item" ref={addToFiles}>📁 src</div>
                                <div className="file-item" ref={addToFiles}>&nbsp;&nbsp;📁 components</div>
                                <div className="file-item active" ref={addToFiles}>&nbsp;&nbsp;⚛️ App.jsx</div>
                                <div className="file-item" ref={addToFiles}>&nbsp;&nbsp;📄 index.css</div>
                                <div className="file-item" ref={addToFiles}>📦 package.json</div>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="editor-area">
                            <div className="editor-lines">
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">1</span>
                                    <span className="keyword">import</span> React <span className="keyword">from</span> <span className="str">'react'</span>;
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">2</span>
                                    <span className="keyword">import</span> {'{'} <span className="comp">Header</span> {'}'} <span className="keyword">from</span> <span className="str">'./components'</span>;
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">3</span>
                                    &nbsp;
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">4</span>
                                    <span className="keyword">export default function</span> <span className="comp">App</span>() {'{'}
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">5</span>
                                    &nbsp;&nbsp;<span className="keyword">return</span> (
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">6</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">div</span> className=<span className="str">"app"</span>&gt;
                                </div>
                                <div className="code-line active-line" ref={addToLines}>
                                    <span className="line-num">7</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">Header</span> /&gt;
                                    <span className="vsi-cursor" ref={cursorRef}>|</span>
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">8</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">MainContent</span> /&gt;
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">9</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="comp">div</span>&gt;
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">10</span>
                                    &nbsp;&nbsp;);
                                </div>
                                <div className="code-line" ref={addToLines}>
                                    <span className="line-num">11</span>
                                    {'}'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VSCodeIntegration;
