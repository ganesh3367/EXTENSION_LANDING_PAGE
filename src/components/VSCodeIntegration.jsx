import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VSCodeIntegration.css';

const VSCodeIntegration = () => {
    const sectionRef = useRef(null);
    const mockupRef = useRef(null);
    const textRef = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        tl.to(mockupRef.current, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        })
            .to(sidebarRef.current, {
                opacity: 1,
                duration: 0.5
            }, "-=0.5")
            .to(textRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8
            }, "-=0.8");

    }, []);

    return (
        <section className="vscode-section" ref={sectionRef}>
            <div className="container vscode-container">
                <div className="vscode-text" ref={textRef}>
                    <h2 className="vscode-title">Right where you work.</h2>
                    <p className="vscode-desc">
                        No external apps. No copy-pasting from web tools.
                        The extension lives inside VS Code, ready whenever you need it.
                    </p>
                </div>

                <div className="vscode-mockup" ref={mockupRef}>
                    <div className="sidebar" ref={sidebarRef} style={{ opacity: 0 }}>
                        <div className="sidebar-header">Explorer</div>
                        <div className="file-list">
                            <div className="file-item">📁 src</div>
                            <div className="file-item">📁 components</div>
                            <div className="file-item active">⚛️ App.jsx</div>
                            <div className="file-item">📄 index.css</div>
                        </div>
                    </div>
                    <div className="editor-area">
                        <div className="line"><span className="keyword">import</span> React <span className="keyword">from</span> <span className="str">'react'</span>;</div>
                        <div className="line">&nbsp;</div>
                        <div className="line"><span className="keyword">export default function</span> <span className="comp">App</span>() {'{'}</div>
                        <div className="line">&nbsp;&nbsp;<span className="keyword">return</span> (</div>
                        <div className="line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">div</span> className=<span className="str">"app"</span>&gt;</div>
                        <div className="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">Header</span> /&gt;</div>
                        <div className="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="comp">MainContent</span> /&gt;</div>
                        <div className="line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="comp">div</span>&gt;</div>
                        <div className="line">&nbsp;&nbsp;);</div>
                        <div className="line">{'}'}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VSCodeIntegration;
