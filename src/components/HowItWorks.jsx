import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
    const sectionRef = useRef(null);
    const pinnedContainerRef = useRef(null);
    const glowRef = useRef(null);

    // Header Refs
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinnedContainer = pinnedContainerRef.current;
        const steps = section ? gsap.utils.toArray(section.querySelectorAll('.hiw-step')) : [];
        const visuals = section ? gsap.utils.toArray(section.querySelectorAll('.hiw-step-visual')) : [];
        const stepDots = section ? gsap.utils.toArray(section.querySelectorAll('.hiw-dot')) : [];
        const glow = glowRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;

        if (!section || !pinnedContainer || steps.length < 3) return;

        let ctx = gsap.context(() => {
            gsap.set(steps, { autoAlpha: 0, x: 100, scale: 0.95 });
            gsap.set(steps[0], { autoAlpha: 1, x: 0, scale: 1 });
            gsap.set(glow, { xPercent: -50, yPercent: -50, left: '50%', top: '50%' });

            gsap.fromTo([title, subtitle],
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=3500",
                    pin: pinnedContainer,
                    scrub: 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            if (stepDots.length >= 3) {
                gsap.set(stepDots[0], { scale: 1.3, background: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.6)' });
            }

            tl.to(steps[0], {
                autoAlpha: 0,
                x: -100,
                rotationY: 5,
                scale: 0.95,
                duration: 1.5,
                ease: "power2.inOut"
            })
                .fromTo(steps[1],
                    { autoAlpha: 0, x: 100, rotationY: -5, scale: 0.95 },
                    { autoAlpha: 1, x: 0, rotationY: 0, scale: 1, duration: 1.5, ease: "power2.out" },
                    "<0.2"
                )
                .to(glow, { left: '40%', opacity: 0.8, duration: 1.5 }, "<")
                .to(stepDots[0], { scale: 1, background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 0 transparent', duration: 0.5 }, "<")
                .to(stepDots[1], { scale: 1.3, background: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.6)', duration: 0.5 }, "<0.3");

            tl.to(steps[1], {
                autoAlpha: 0,
                x: -100,
                rotationY: 5,
                scale: 0.95,
                duration: 1.5,
                ease: "power2.inOut"
            }, "+=0.3")
                .fromTo(steps[2],
                    { autoAlpha: 0, x: 100, rotationY: -5, scale: 0.95 },
                    { autoAlpha: 1, x: 0, rotationY: 0, scale: 1, duration: 1.5, ease: "power2.out" },
                    "<0.2"
                )
                .to(glow, { left: '60%', opacity: 1, duration: 1.5 }, "<")
                .to(stepDots[1], { scale: 1, background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 0 transparent', duration: 0.5 }, "<")
                .to(stepDots[2], { scale: 1.3, background: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.6)', duration: 0.5 }, "<0.3");


            // "ALIVE" ANIMATIONS (Independent Loops)
            visuals.forEach((visual, i) => {
                if (!visual) return;
                gsap.to(visual, {
                    y: -20, // Gentler float
                    duration: 4 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5
                });
            });

            // Pulse Glow
            gsap.to(glow, {
                scale: 1.2,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="how-it-works" id="how-it-works" ref={sectionRef}>
            {/* Ambient Spot Light */}
            <div className="hiw-glow-spot" ref={glowRef}></div>

            <div className="hiw-pinned-container" ref={pinnedContainerRef}>

                <div className="hiw-header">
                    <h2 className="hiw-title" ref={titleRef}>How it works</h2>
                    <p className="hiw-subtitle" ref={subtitleRef}>From raw HTML to clean React — in seconds.</p>
                </div>

                <div className="hiw-steps-wrapper">

                    {/* STEP 1 */}
                    <div className="hiw-step">
                        <div className="hiw-step-text">
                            <span className="step-label">Step 01</span>
                            <h3 className="step-heading">Paste your<br />HTML</h3>
                            <p className="step-description">
                                Drop any raw HTML into your file. It handles messy indentation, legacy tags, and weird spacing automatically.
                            </p>
                        </div>
                        <div className="hiw-step-visual">
                            <div className="code-block-visual visual-html">
                                <div style={{ opacity: 0.5, marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                                    <div className="vscode-light l-red"></div>
                                    <div className="vscode-light l-yellow"></div>
                                    <div className="vscode-light l-green"></div>
                                    <span style={{ marginLeft: '1rem' }}>index.html</span>
                                </div>
                                <div className="html-code">
                                    <div><span className="tag">&lt;div</span> <span className="attr">class</span>=<span className="val">"hero-banner"</span>&gt;</div>
                                    <div style={{ paddingLeft: '2rem' }}><span className="tag">&lt;h1&gt;</span><span className="text">Welcome User</span><span className="tag">&lt;/h1&gt;</span></div>
                                    <div style={{ paddingLeft: '2rem' }}><span className="tag">&lt;p&gt;</span><span className="text">Start journey</span><span className="tag">&lt;/p&gt;</span></div>
                                    <div style={{ paddingLeft: '2rem' }}><span className="tag">&lt;button&gt;</span><span className="text">Login</span><span className="tag">&lt;/button&gt;</span></div>
                                    <div><span className="tag">&lt;/div&gt;</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="hiw-step">
                        <div className="hiw-step-text">
                            <span className="step-label">Step 02</span>
                            <h3 className="step-heading">Run the<br />Extension</h3>
                            <p className="step-description">
                                Open the VS Code command palette. No config files, no complex setup. Just select and run.
                            </p>
                        </div>
                        <div className="hiw-step-visual">
                            <div className="code-block-visual visual-vscode">
                                <div className="vscode-header">
                                    <div className="vscode-lights">
                                        <div className="vscode-light l-red"></div>
                                        <div className="vscode-light l-yellow"></div>
                                        <div className="vscode-light l-green"></div>
                                    </div>
                                    <span>Command Palette</span>
                                </div>
                                <div className="vscode-body">
                                    <div className="command-item">
                                        <span>&gt; Git: Commit</span>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Cmd+K</span>
                                    </div>
                                    <div className="command-item active">
                                        <span style={{ fontWeight: 600 }}>&gt; Convert to React Component</span>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>recently used</span>
                                    </div>
                                    <div className="command-item">
                                        <span>&gt; TypeScript: Restart Server</span>
                                    </div>
                                    <div className="command-item">
                                        <span>&gt; File: Save All</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="hiw-step">
                        <div className="hiw-step-text">
                            <span className="step-label">Step 03</span>
                            <h3 className="step-heading">Get Clean<br />React</h3>
                            <p className="step-description">
                                Instantly get a functional component. Props are identified, class becomes className, and tags are self-closed.
                            </p>
                        </div>
                        <div className="hiw-step-visual">
                            <div className="code-block-visual visual-react">
                                <div style={{ opacity: 0.5, marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                                    <div className="vscode-light l-red"></div>
                                    <div className="vscode-light l-yellow"></div>
                                    <div className="vscode-light l-green"></div>
                                    <span style={{ marginLeft: '1rem' }}>Hero.jsx</span>
                                </div>
                                <div className="react-code">
                                    <div><span className="keyword">const</span> <span className="component">HeroBanner</span> = () =&gt; (</div>
                                    <div style={{ paddingLeft: '1.5rem' }}><span className="jsx-tag">&lt;div</span> <span className="prop">className</span>=<span className="val">"hero-banner"</span><span className="jsx-tag">&gt;</span></div>
                                    <div style={{ paddingLeft: '3rem' }}><span className="component">&lt;Title&gt;</span>Welcome User<span className="component">&lt;/Title&gt;</span></div>
                                    <div style={{ paddingLeft: '3rem' }}><span className="component">&lt;Text&gt;</span>Start journey<span className="component">&lt;/Text&gt;</span></div>
                                    <div style={{ paddingLeft: '3rem' }}><span className="component">&lt;Button&gt;</span>Login<span className="component">&lt;/Button&gt;</span></div>
                                    <div style={{ paddingLeft: '1.5rem' }}><span className="jsx-tag">&lt;/div&gt;</span></div>
                                    <div>);</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="hiw-step-dots">
                    <div className="hiw-dot"></div>
                    <div className="hiw-dot"></div>
                    <div className="hiw-dot"></div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
