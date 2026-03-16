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

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            strips.forEach((strip, index) => {
                const direction = stripsData[index].direction;
                const marqueeContent = strip.querySelector('.marquee-content');

                tl.to(marqueeContent, {
                    xPercent: direction * -30,
                    ease: "none"
                }, 0);

                const startRot = index % 2 === 0 ? 15 : -15;
                const endRot = index % 2 === 0 ? -5 : 5;

                gsap.set(strip, { rotateX: startRot, z: -50, opacity: 0.8 });

                tl.to(strip, {
                    rotateX: endRot,
                    z: 0,
                    opacity: 1,
                    ease: "power1.inOut"
                }, 0);

                if (index === strips.length - 1) {
                    tl.to(strip, {
                        rotateX: -90,
                        opacity: 0,
                        z: -200,
                        ease: "power2.in"
                    }, ">-0.5");
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
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
