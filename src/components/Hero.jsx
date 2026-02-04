import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Refs for animation
  const heroRef = useRef(null);
  const bgGlowRef = useRef(null);
  const brandingRef = useRef(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const heroObjectRef = useRef(null);
  const windowRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bgGlow = bgGlowRef.current;
    const branding = brandingRef.current;
    const title = titleRef.current;
    const subtext = subtextRef.current;
    const cta = ctaRef.current;
    const heroObject = heroObjectRef.current;
    const heroWindow = windowRef.current;
    const cursor = cursorRef.current;

    if (!hero) return;

    // 1. Initial State Setup (Hidden)
    gsap.set([branding, title, subtext, cta], { y: 30, opacity: 0, filter: 'blur(10px)' });
    gsap.set(heroObject, { y: 100, opacity: 0, rotationX: 10, scale: 0.95 });
    gsap.set(bgGlow, { opacity: 0, scale: 0.8 });

    // 2. Cinematic Entrance Timeline
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        // Init Scroll Animations AFTER entrance is done to avoid state conflict
        gsap.to(title, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "40% top", // Fade out quicker
            scrub: true,
          }
        });
      }
    });

    tl.to(bgGlow, { opacity: 0.6, scale: 1, duration: 2, ease: "power2.out" })
      .to(branding, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, "-=1.5")
      .to(title, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, "-=1.1")
      .to(subtext, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, "-=1.1")
      .to(cta, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, "-=1.1")
      .to(heroObject, {
        y: 0, opacity: 1, rotationX: 0, scale: 1,
        duration: 1.8, ease: "power3.out"
      }, "-=1.0");

    // 3. Idle Motion (Breathing)
    gsap.to(heroObject, {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });

    gsap.to(bgGlow, {
      scale: 1.2,
      opacity: 0.4,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 4. Cursor Blink
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)"
    });

    // 5. Scroll Parallax & Micro Transformations
    // Ensure we start monitoring AFTER entrance
    // We can use a small delay or just rely on scrub correctly mapping 0 scroll to current state

    // Parallax for Hero Object
    gsap.to(heroObject, {
      y: -50,
      scale: 0.98,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Title scroll animation moved to tl.onComplete

    // 6. Mouse Tilt Interaction
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return; // Desktop only
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(heroWindow, {
        rotationY: xPos * 6,
        rotationX: -yPos * 4,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-glow-bg" ref={bgGlowRef}></div>

      <div className="hero-body">

        {/* 1. Branding Row */}
        <div className="branding-row" ref={brandingRef}>
          <div className="brand-icon">⚛️</div>
          <div className="brand-name">HTML to React</div>
          <div className="brand-badge">VS Code Extension</div>
        </div>

        {/* 2. Main Content */}
        <h1 className="hero-headline" ref={titleRef}>
          Convert HTML into React.<br />
          Instantly.
        </h1>
        <p className="hero-subtext" ref={subtextRef}>
          Clean JSX. Reusable components.<br />
          Inside VS Code — one command away.
        </p>

        {/* 3. CTA Buttons */}
        <div className="cta-group" ref={ctaRef}>
          <a href="#" className="btn-primary">Install Extension</a>
          <a href="#" className="btn-secondary">Watch Demo</a>
        </div>

        {/* 4. Hero Object (The Window) */}
        <div className="hero-object-container" ref={heroObjectRef}>
          <div className="hero-window" ref={windowRef}>

            {/* Fake Header */}
            <div className="window-header">
              <div className="window-dots">
                <div className="dot" style={{ background: '#FF5F56' }}></div>
                <div className="dot" style={{ background: '#FFBD2E' }}></div>
                <div className="dot" style={{ background: '#27C93F' }}></div>
              </div>
              <div className="window-title">Header.jsx</div>
              <div style={{ width: 40 }}></div>
            </div>

            {/* Split Body */}
            <div className="window-body">

              {/* Left: HTML */}
              <div className="pane pane-left">
                <div style={{ opacity: 0.5, marginBottom: '1rem' }}>// Input: HTML</div>
                <div><span className="t">&lt;div</span> <span className="a">class</span>=<span className="s">"nav"</span><span className="t">&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t">&lt;img</span> <span className="a">src</span>=<span className="s">"logo.svg"</span><span className="t">&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t">&lt;ul&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;li&gt;</span>Home<span className="t">&lt;/li&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t">&lt;/ul&gt;</span></div>
                <div><span className="t">&lt;/div&gt;</span></div>
              </div>

              {/* Center Arrow */}
              <div className="convert-arrow">→</div>

              {/* Right: React */}
              <div className="pane pane-right">
                <div style={{ opacity: 0.5, marginBottom: '1rem', color: '#4EC9B0' }}>// Output: JSX</div>
                <div><span className="k">export const</span> <span className="t">NavBar</span> = () =&gt; (</div>
                <div>&nbsp;&nbsp;<span className="t">&lt;div</span> <span className="a">className</span>=<span className="s">"nav"</span><span className="t">&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;img</span> <span className="a">src</span>=<span className="s">"logo.svg"</span> <span className="t">/&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;ul&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;li&gt;</span>Home<span className="t">&lt;/li&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t">&lt;/ul&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t">&lt;/div&gt;</span></div>
                <div>);<span className="cursor" ref={cursorRef}></span></div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
