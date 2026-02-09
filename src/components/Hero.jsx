import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const glowRef = useRef(null);
    const scrollRef = useRef(null);

    // Button Refs for Animation
    const heroBtnWrapperRef = useRef(null);
    const heroBtnPrimaryRef = useRef(null);

    // Floaters
    const floatersRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;

        // 1. Entrance Timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(eyebrowRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2 }
        )
            .fromTo(titleRef.current,
                { y: 50, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
                "-=0.7"
            )
            .fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(ctaRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(scrollRef.current,
                { opacity: 0 },
                { opacity: 0.7, duration: 1 },
                "-=0.5"
            );

        // 2. Scroll Parallax (Title & Content)
        // Use fromTo to ensure we have a defined start state that matches the end of the entrance animation
        // and a defined end state for the scroll effect.
        gsap.fromTo([titleRef.current, subtitleRef.current, ctaRef.current],
            { y: 0, opacity: 1 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom center", // Extended end to make it smoother
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                },
                y: -100,
                opacity: 0,
                stagger: 0.1,
                immediateRender: false // Critical: wait for entrance animation to finish or at least don't overwrite initial state immediately
            }
        );

        // 3. Mouse Movement Parallax
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1

            // Move glow
            gsap.to(glowRef.current, {
                x: x * 50,
                y: y * 50,
                duration: 2,
                ease: "power2.out"
            });

            // Move floaters with different intensities
            floatersRef.current.forEach((floater, i) => {
                const depth = (i + 1) * 20;
                gsap.to(floater, {
                    x: x * depth,
                    y: y * depth,
                    duration: 1.5,
                    ease: "power2.out"
                });
            });

            // Subtle tilt for title
            gsap.to(titleRef.current, {
                x: x * 10,
                y: y * 5,
                duration: 2,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 4. Button Magnetic Effect
        const btnWrapper = heroBtnWrapperRef.current;
        const btnPrimary = heroBtnPrimaryRef.current;

        // Pulse animation for button
        if (btnPrimary) {
            gsap.to(btnPrimary, {
                scale: 1.05,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }


        const handleBtnMouseMove = (e) => {
            if (!btnWrapper || !btnPrimary) return;
            const rect = btnWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btnPrimary, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleBtnMouseLeave = () => {
            if (!btnPrimary) return;
            gsap.to(btnPrimary, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        if (btnWrapper) {
            btnWrapper.addEventListener('mousemove', handleBtnMouseMove);
            btnWrapper.addEventListener('mouseleave', handleBtnMouseLeave);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (btnWrapper) {
                btnWrapper.removeEventListener('mousemove', handleBtnMouseMove);
                btnWrapper.removeEventListener('mouseleave', handleBtnMouseLeave);
            }
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    const addToFloaters = (el) => {
        if (el && !floatersRef.current.includes(el)) {
            floatersRef.current.push(el);
        }
    };

    return (
        <section className="hero-section" ref={sectionRef}>
            {/* Background Elements */}
            <div className="hero-glow" ref={glowRef}></div>
            <div className="hero-floater floater-1" ref={addToFloaters}></div>
            <div className="hero-floater floater-2" ref={addToFloaters}></div>
            <div className="hero-floater floater-3" ref={addToFloaters}></div>

            <div className="container hero-container">
                <div className="hero-eyebrow" ref={eyebrowRef}>
                    Now Available for VS Code
                </div>

                <h1 className="hero-title" ref={titleRef}>
                    Build React<br />
                    at the speed of thought.
                </h1>

                <p className="hero-subtitle" ref={subtitleRef}>
                    Stop rewriting repetitive code. Convert HTML to React components instantly,
                    right inside your editor. No setup required.
                </p>

                <div className="hero-cta-group" ref={ctaRef}>
                    <div className="hero-btn-wrapper" ref={heroBtnWrapperRef}>
                        <a href="https://marketplace.visualstudio.com/items?itemName=GaneshWayal.html-to-react-js" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary" ref={heroBtnPrimaryRef} style={{ textDecoration: 'none' }}>
                            Install Extension
                        </a>
                    </div>
                    <a href="#how-it-works" className="hero-btn hero-btn-secondary" style={{ textDecoration: 'none' }}>
                        See How It Works
                    </a>
                </div>

                <div className="scroll-indicator" ref={scrollRef}>
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
