import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

const Features = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.to(cardsRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform" // clear transform so CSS hover works
        });
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    const features = [
        {
            title: "Clean JSX Output",
            desc: "Generates semantic, accessible React code that looks like you wrote it by hand.",
            icon: "⚛️"
        },
        {
            title: "No Manual Refactor",
            desc: "Forget about changing class to className or fixing self-closing tags manually.",
            icon: "⚡"
        },
        {
            title: "Developer Friendly",
            desc: "Built by developers, for developers. Integrated right into your favorite editor.",
            icon: "🛠️"
        },
        {
            title: "Saves Hours",
            desc: "Cut down your development time by automating the tedious parts of UI work.",
            icon: "⏳"
        }
    ];

    return (
        <section className="features-section" ref={containerRef}>
            <div className="container">
                <div className="features-grid">
                    {features.map((f, i) => (
                        <div className="feature-card" key={i} ref={addToRefs}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
