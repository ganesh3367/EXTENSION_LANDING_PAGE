import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTA.css';

const CTA = () => {
    const sectionRef = useRef(null);
    const buttonRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Pulse animation
        gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Magnetic Effect
        const wrapper = wrapperRef.current;
        const button = buttonRef.current;

        const onMouseMove = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const onMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        wrapper.addEventListener('mousemove', onMouseMove);
        wrapper.addEventListener('mouseleave', onMouseLeave);

        return () => {
            wrapper.removeEventListener('mousemove', onMouseMove);
            wrapper.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <section className="cta-section" ref={sectionRef}>
            <div className="container">
                <h2 className="cta-title">
                    Stop rewriting HTML.<br />
                    Let React do the work.
                </h2>

                <div className="cta-button-wrapper" ref={wrapperRef}>
                    <a href="https://marketplace.visualstudio.com/items?itemName=GaneshWayal.html-to-react-js" target="_blank" rel="noopener noreferrer" className="cta-button" ref={buttonRef} style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Install VS Code Extension
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
