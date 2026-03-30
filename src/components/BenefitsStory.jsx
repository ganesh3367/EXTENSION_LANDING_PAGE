import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BenefitsStory.css';

gsap.registerPlugin(ScrollTrigger);

const BenefitsStory = () => {
    const containerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const previewRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);

    const benefits = [
        {
            id: 1,
            title: "Clean JSX",
            desc: "Automatically fixes className, self-closing tags, and SVG attributes.",
            icon: "🧼"
        },
        {
            id: 2,
            title: "No Manual Refactor",
            desc: "Skip the tedious find-and-replace. We handle prop naming and formatting.",
            icon: "⚡"
        },
        {
            id: 3,
            title: "Component Ready",
            desc: "Wraps output in a functional component structure so it's ready to import.",
            icon: "📦"
        },
        {
            id: 4,
            title: "Saves Hours",
            desc: "Developers save an average of 5 hours per week on frontend UI scaffolding.",
            icon: "⏳"
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        if (!container || !leftCol || !rightCol) return;

        let ctx = gsap.context(() => {
            const updateActive = (index) => {
                setActiveStep(index);
                // Sharp transition - only animate if ref exists
                if (previewRef.current) {
                    gsap.fromTo(previewRef.current,
                        { filter: 'blur(10px)', opacity: 0.5, scale: 0.95 },
                        { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
                    );
                }
            };

            const benefitBlocks = gsap.utils.toArray(rightCol.querySelectorAll('.benefit-block'));

            ScrollTrigger.matchMedia({
                "(min-width: 1025px)": () => {
                    ScrollTrigger.create({
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        pin: leftCol,
                        invalidateOnRefresh: true
                    });
                }
            });

            benefitBlocks.forEach((block, i) => {
                ScrollTrigger.create({
                    trigger: block,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => updateActive(i),
                    onEnterBack: () => updateActive(i),
                    toggleClass: { targets: block, className: "active" }
                });

                gsap.fromTo(block,
                    { opacity: 0.3 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: block,
                            start: "top 60%",
                            end: "bottom 60%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    // Render Logic for Preview Panel
    const renderPreviewContent = () => {
        switch (activeStep) {
            case 0: // Clean JSX
                return (
                    <div className="preview-code">
                        <div className="code-fix-row">
                            <span className="code-bad">class="btn"</span>
                            <span className="arrow-right">➜</span>
                            <span className="code-good">className="btn"</span>
                        </div>
                        <div className="code-fix-row">
                            <span className="code-bad">&lt;img&gt;</span>
                            <span className="arrow-right">➜</span>
                            <span className="code-good">&lt;img /&gt;</span>
                        </div>
                        <div className="code-fix-row">
                            <span className="code-bad">onclick="..."</span>
                            <span className="arrow-right">➜</span>
                            <span className="code-good">onClick={'{...}'}</span>
                        </div>
                    </div>
                );
            case 1: // No Refactor
                return (
                    <div className="preview-code">
                        <div style={{ color: '#888', marginBottom: '1rem' }}>// Auto-Fixes Enabled</div>
                        <div className="code-fix-row">
                            <span style={{ color: '#fff' }}>✓ Fixed SVG camelCase</span>
                        </div>
                        <div className="code-fix-row">
                            <span style={{ color: '#fff' }}>✓ Remapped style strings</span>
                        </div>
                        <div className="code-fix-row">
                            <span style={{ color: '#fff' }}>✓ Closed void elements</span>
                        </div>
                    </div>
                );
            case 2: // Component Ready
                return (
                    <div className="preview-code" style={{ textAlign: 'left', width: '100%' }}>
                        <div><span style={{ color: '#C586C0' }}>const</span> <span style={{ color: '#DCDCAA' }}>Component</span> = () =&gt; (</div>
                        <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#808080' }}>&lt;div&gt;</span></div>
                        <div style={{ paddingLeft: '2rem', color: '#4EC9B0' }}>...Content</div>
                        <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#808080' }}>&lt;/div&gt;</span></div>
                        <div>);</div>
                        <div style={{ marginTop: '0.5rem' }}><span style={{ color: '#C586C0' }}>export default</span> <span style={{ color: '#DCDCAA' }}>Component</span>;</div>
                    </div>
                );
            case 3: // Saves Hours
                return (
                    <div className="time-meter">
                        <span className="time-val">5h+</span>
                        <span className="time-label">Saved Weekly</span>
                        <div style={{
                            marginTop: '1rem', height: '4px', width: '100%', background: '#333', borderRadius: '4px', overflow: 'hidden'
                        }}>
                            <div style={{ height: '100%', width: '85%', background: '#27c93f' }}></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="benefits-story" id="benefits" ref={containerRef}>
            <div className="bs-container">

                {/* Left Column (Sticky) */}
                <div className="bs-left-col" ref={leftColRef}>
                    <div className="bs-content-wrapper">
                        <div className="bs-header">
                            <h2 className="bs-title">Built for real<br />React developers.</h2>
                            <p className="bs-subtitle">Everything you hate doing manually — automated.</p>
                            <div className="bs-progress">0{activeStep + 1} / 04</div>
                        </div>

                        <div className="bs-preview-box" ref={previewRef}>
                            <div className="bs-preview-content">
                                {renderPreviewContent()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Scrolling) */}
                <div className="bs-right-col" ref={rightColRef}>
                    {benefits.map((b) => (
                        <div key={b.id} className="benefit-block">
                            <div className="benefit-icon">{b.icon}</div>
                            <h3 className="benefit-title">{b.title}</h3>
                            <p className="benefit-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BenefitsStory;
