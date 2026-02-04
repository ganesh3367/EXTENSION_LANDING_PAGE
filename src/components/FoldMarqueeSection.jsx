import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FoldMarqueeSection.css';

gsap.registerPlugin(ScrollTrigger);

const FoldMarqueeSection = () => {
    const sectionRef = useRef(null);
    const stripsRef = useRef([]);

    // Data for the 4 strips
    const stripsData = [
        {
            id: 1,
            text: ["HTML to React.", "HTML → React.", "Convert HTML."],
            direction: -1 // Left
        },
        {
            id: 2,
            text: ["Clean JSX.", "Reusable Components.", "Production Ready."],
            direction: 1 // Right
        },
        {
            id: 3,
            text: ["Save Hours.", "No Refactor.", "Zero Manual Work."],
            direction: -1 // Left
        },
        {
            id: 4,
            text: ["Inside VS Code.", "One Command.", "Instant Output."],
            direction: 1 // Right
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const strips = stripsRef.current;

        if (!section || strips.length === 0) return;

        // Create a timeline linked to the scroll of the entire section
        // "Slow the scroll time little bit as user need to scroll more for this"
        // We use 'pin' to hold the section in place while the user scrolls.
        // 'end: "+=200%"' means the animation plays over 200% of the viewport height.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top", // Start when section hits top
                end: "+=200%",    // User scrolls 2 screens worth
                pin: true,        // Pin the section
                scrub: 1,         // Smooth scrubbing
                anticipatePin: 1
            }
        });

        // Loop purely to set initial state if needed
        // but GSAP .to() usually handles it.

        strips.forEach((strip, index) => {
            const direction = stripsData[index].direction;
            const marqueeContent = strip.querySelector('.marquee-content');

            // 1. Horizontal Scroll Motion (Slower/longer feel because of the pinned distance)
            // We want it to move significantly.
            tl.to(marqueeContent, {
                xPercent: direction * -30, // Move 30% of the long width
                ease: "none"
            }, 0);

            // 2. 3D Fold / Perspective Effect - "Make it more alive"
            // We animate RotateX and Z to create a "breathing" or "folding" motion.

            // Alternating initial tilts?
            // Let's animate from a slight tilt TO another tilt.
            const startRot = index % 2 === 0 ? 15 : -15;
            const endRot = index % 2 === 0 ? -5 : 5;

            // Set initial state immediately (before animation starts)
            gsap.set(strip, { rotateX: startRot, z: -50, opacity: 0.8 });

            tl.to(strip, {
                rotateX: endRot,
                z: 0, // Come closer (more alive)
                opacity: 1, // Brighten up
                ease: "power1.inOut" // Non-linear ease for "alive" feel
            }, 0);

            // 3. The "Last Strip Fold Away"
            if (index === strips.length - 1) {
                // It starts visible and folds away at the END of the scroll
                // We'll add a specific tween for the last part of the timeline
                tl.to(strip, {
                    rotateX: -90,
                    opacity: 0,
                    z: -200,
                    ease: "power2.in"
                }, ">-0.5"); // Start overlapping strictly near end
            }

            // 4. Parallax / Stagger ? 
            // Let's stagger the starts slightly for "alive" organic feel
            // Actually, marquee should be synced, but the 3D fold can stagger.
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Helper to repeat text
    const getRepeatedText = (lines) => {
        // Repeat enough to fill width
        return [...lines, ...lines, ...lines, ...lines, ...lines].map((text, i) => (
            <span key={i} className="marquee-item">
                {text}
            </span>
        ));
    };

    return (
        <section className="fold-marquee-section" ref={sectionRef}>
            <div className="fold-marquee-container">
                {stripsData.map((data, index) => (
                    <div
                        key={data.id}
                        className="fold-strip"
                        ref={el => stripsRef.current[index] = el}
                    >
                        <div className="fold-strip-inner">
                            <div className="marquee-content" style={{
                                display: 'flex',
                                gap: '0', // handled by padding in item
                                width: 'max-content',
                                paddingLeft: '5vw'
                            }}>
                                {getRepeatedText(data.text)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FoldMarqueeSection;
