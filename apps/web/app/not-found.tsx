'use client';

import { useEffect, useState, useRef } from 'react';

/* ============================
   3D Isometric House (pure CSS)
   ============================ */
function FloatingHouse() {
    return (
        <div className="house-scene">
            <div className="house-float">
                {/* Chimney */}
                <div className="chimney">
                    <div className="smoke-container">
                        <div className="smoke smoke-1" />
                        <div className="smoke smoke-2" />
                        <div className="smoke smoke-3" />
                    </div>
                </div>

                {/* Roof */}
                <div className="roof">
                    <div className="roof-front" />
                    <div className="roof-back" />
                    <div className="roof-left" />
                    <div className="roof-right" />
                </div>

                {/* Walls */}
                <div className="house-body">
                    <div className="wall wall-front">
                        <div className="door">
                            <div className="door-knob" />
                        </div>
                        <div className="window window-front-1">
                            <div className="window-glow" />
                            <div className="window-cross-h" />
                            <div className="window-cross-v" />
                        </div>
                        <div className="window window-front-2">
                            <div className="window-glow" />
                            <div className="window-cross-h" />
                            <div className="window-cross-v" />
                        </div>
                    </div>
                    <div className="wall wall-right">
                        <div className="window window-side">
                            <div className="window-glow" />
                            <div className="window-cross-h" />
                            <div className="window-cross-v" />
                        </div>
                    </div>
                    <div className="wall wall-back" />
                    <div className="wall wall-left" />
                    <div className="wall wall-top" />
                    <div className="wall wall-bottom" />
                </div>

                {/* Foundation / floating island */}
                <div className="island">
                    <div className="island-top" />
                    <div className="island-front" />
                    <div className="island-right" />
                    <div className="grass grass-1" />
                    <div className="grass grass-2" />
                    <div className="grass grass-3" />
                </div>
            </div>

            {/* Shadow */}
            <div className="house-shadow" />
        </div>
    );
}

/* ============================
   Floating Particles
   ============================ */
function Particles() {
    const [particles, setParticles] = useState<
        Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number; color: string }>
    >([]);

    useEffect(() => {
        const colors = [
            'rgba(139, 79, 255, 0.3)',
            'rgba(16, 185, 129, 0.25)',
            'rgba(139, 79, 255, 0.15)',
            'rgba(255, 255, 255, 0.12)',
            'rgba(16, 185, 129, 0.15)',
        ];
        const p = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            delay: Math.random() * 8,
            duration: Math.random() * 6 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(p);
    }, []);

    return (
        <div className="particles-container">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ============================
   Glitch "404" text
   ============================ */
function GlitchText() {
    return (
        <div className="glitch-wrapper">
            <div className="glitch" data-text="404">
                404
            </div>
        </div>
    );
}

/* ============================
   Main 404 Page
   ============================ */
export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/en/listings?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <html lang="en">
            <head>
                <title>Page Not Found — NestKhmer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    * { margin: 0; padding: 0; box-sizing: border-box; }

                    body {
                        min-height: 100vh;
                        overflow: hidden;
                        font-family: 'Inter', sans-serif;
                        background: #0a0a12;
                        color: white;
                    }

                    .not-found-page {
                        position: relative;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        perspective: 1200px;
                        overflow: hidden;
                    }

                    /* ---- Background ---- */
                    .bg-gradient {
                        position: absolute;
                        inset: 0;
                        background:
                            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139, 79, 255, 0.12) 0%, transparent 60%),
                            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139, 79, 255, 0.06) 0%, transparent 50%);
                    }

                    .grid-bg {
                        position: absolute;
                        inset: 0;
                        background-image:
                            linear-gradient(rgba(139, 79, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 79, 255, 0.03) 1px, transparent 1px);
                        background-size: 60px 60px;
                        mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
                    }

                    /* ---- Particles ---- */
                    .particles-container {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                    }

                    .particle {
                        position: absolute;
                        border-radius: 50%;
                        animation: float-particle linear infinite;
                    }

                    @keyframes float-particle {
                        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
                        10% { opacity: 1; }
                        50% { transform: translate(20px, -40px) scale(1.5); opacity: 0.8; }
                        90% { opacity: 0.2; }
                    }

                    /* ---- Content Layout ---- */
                    .content-wrapper {
                        position: relative;
                        z-index: 10;
                        display: flex;
                        align-items: center;
                        gap: 60px;
                        max-width: 1100px;
                        padding: 2rem;
                    }

                    .text-side {
                        flex: 1;
                        max-width: 480px;
                    }

                    .house-side {
                        flex: 0 0 auto;
                    }

                    /* ---- Glitch 404 ---- */
                    .glitch-wrapper {
                        margin-bottom: 1rem;
                    }

                    .glitch {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: clamp(5rem, 12vw, 9rem);
                        font-weight: 800;
                        line-height: 1;
                        color: white;
                        position: relative;
                        text-shadow: 0 0 40px rgba(139, 79, 255, 0.3);
                        animation: glitch-skew 4s infinite linear;
                    }

                    .glitch::before,
                    .glitch::after {
                        content: attr(data-text);
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }

                    .glitch::before {
                        color: #0ff;
                        animation: glitch-1 3s infinite linear;
                        clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
                    }

                    .glitch::after {
                        color: #f0f;
                        animation: glitch-2 3s infinite linear;
                        clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
                    }

                    @keyframes glitch-1 {
                        0%, 100% { transform: translate(0); }
                        20% { transform: translate(-3px, 2px); }
                        40% { transform: translate(3px, -1px); }
                        60% { transform: translate(-2px, 1px); }
                        80% { transform: translate(2px, -2px); }
                    }

                    @keyframes glitch-2 {
                        0%, 100% { transform: translate(0); }
                        20% { transform: translate(3px, -2px); }
                        40% { transform: translate(-3px, 1px); }
                        60% { transform: translate(2px, -1px); }
                        80% { transform: translate(-2px, 2px); }
                    }

                    @keyframes glitch-skew {
                        0%, 100% { transform: skew(0deg); }
                        2% { transform: skew(2deg); }
                        4% { transform: skew(0deg); }
                        48% { transform: skew(0deg); }
                        50% { transform: skew(-1deg); }
                        52% { transform: skew(0deg); }
                    }

                    /* ---- Text ---- */
                    .subtitle {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 1.4rem;
                        font-weight: 700;
                        margin-bottom: 0.75rem;
                        background: linear-gradient(135deg, #fff 0%, rgba(139, 79, 255, 0.7) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .description {
                        color: rgba(255, 255, 255, 0.5);
                        font-size: 0.95rem;
                        line-height: 1.7;
                        margin-bottom: 2rem;
                    }

                    /* ---- Search bar ---- */
                    .search-form {
                        display: flex;
                        align-items: center;
                        gap: 0;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 16px;
                        padding: 4px;
                        margin-bottom: 2rem;
                        backdrop-filter: blur(20px);
                        transition: border-color 0.3s;
                    }

                    .search-form:focus-within {
                        border-color: rgba(139, 79, 255, 0.3);
                        box-shadow: 0 0 30px rgba(139, 79, 255, 0.08);
                    }

                    .search-icon {
                        padding: 0 0.75rem;
                        color: rgba(255, 255, 255, 0.3);
                    }

                    .search-input {
                        flex: 1;
                        background: transparent;
                        border: none;
                        outline: none;
                        color: white;
                        font-size: 0.875rem;
                        padding: 12px 0;
                        font-family: 'Inter', sans-serif;
                    }

                    .search-input::placeholder {
                        color: rgba(255, 255, 255, 0.25);
                    }

                    .search-btn {
                        padding: 10px 20px;
                        background: linear-gradient(135deg, #8b4fff, #6c3ce0);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        cursor: pointer;
                        transition: all 0.3s;
                        white-space: nowrap;
                    }

                    .search-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 8px 24px rgba(139, 79, 255, 0.35);
                    }

                    /* ---- Quick links ---- */
                    .quick-links {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }

                    .quick-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 8px 16px;
                        background: rgba(255, 255, 255, 0.04);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        border-radius: 10px;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.8rem;
                        font-weight: 500;
                        text-decoration: none;
                        transition: all 0.3s;
                        backdrop-filter: blur(10px);
                    }

                    .quick-link:hover {
                        background: rgba(139, 79, 255, 0.1);
                        border-color: rgba(139, 79, 255, 0.2);
                        color: white;
                        transform: translateY(-2px);
                    }

                    .quick-link svg {
                        width: 14px;
                        height: 14px;
                        opacity: 0.7;
                    }

                    /* ---- 3D House ---- */
                    .house-scene {
                        width: 280px;
                        height: 340px;
                        position: relative;
                    }

                    .house-float {
                        position: absolute;
                        top: 40px;
                        left: 50%;
                        transform-style: preserve-3d;
                        transform: translateX(-50%) rotateX(-20deg) rotateY(35deg);
                        animation: house-bob 4s ease-in-out infinite;
                    }

                    @keyframes house-bob {
                        0%, 100% { transform: translateX(-50%) rotateX(-20deg) rotateY(35deg) translateY(0); }
                        50% { transform: translateX(-50%) rotateX(-20deg) rotateY(35deg) translateY(-15px); }
                    }

                    /* Walls */
                    .house-body {
                        position: relative;
                        width: 140px;
                        height: 100px;
                        transform-style: preserve-3d;
                    }

                    .wall {
                        position: absolute;
                        backface-visibility: hidden;
                    }

                    .wall-front {
                        width: 140px;
                        height: 100px;
                        background: linear-gradient(180deg, #2a1f4e, #1e1640);
                        border: 1px solid rgba(139, 79, 255, 0.15);
                        transform: translateZ(50px);
                    }

                    .wall-back {
                        width: 140px;
                        height: 100px;
                        background: #16112e;
                        transform: rotateY(180deg) translateZ(50px);
                    }

                    .wall-right {
                        width: 100px;
                        height: 100px;
                        background: linear-gradient(180deg, #231a42, #1a1336);
                        border: 1px solid rgba(139, 79, 255, 0.08);
                        transform: rotateY(90deg) translateZ(140px) translateX(-50px);
                        transform-origin: left;
                    }

                    .wall-left {
                        width: 100px;
                        height: 100px;
                        background: #1a1336;
                        transform: rotateY(-90deg) translateZ(0px) translateX(-50px);
                        transform-origin: left;
                    }

                    .wall-top {
                        width: 140px;
                        height: 100px;
                        background: #2d2252;
                        transform: rotateX(90deg) translateZ(0px) translateY(-50px);
                        transform-origin: top;
                    }

                    .wall-bottom {
                        width: 140px;
                        height: 100px;
                        background: #120e24;
                        transform: rotateX(-90deg) translateZ(100px) translateY(-50px);
                        transform-origin: top;
                    }

                    /* Door */
                    .door {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 28px;
                        height: 48px;
                        background: linear-gradient(180deg, #4c3a8a, #3a2d6e);
                        border-radius: 14px 14px 0 0;
                        border: 1px solid rgba(139, 79, 255, 0.2);
                        box-shadow: inset 0 0 15px rgba(139, 79, 255, 0.1);
                    }

                    .door-knob {
                        position: absolute;
                        right: 5px;
                        top: 55%;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background: #c4a6ff;
                        box-shadow: 0 0 6px rgba(196, 166, 255, 0.5);
                    }

                    /* Windows */
                    .window {
                        position: absolute;
                        width: 22px;
                        height: 22px;
                        background: rgba(139, 79, 255, 0.15);
                        border: 1px solid rgba(139, 79, 255, 0.25);
                        border-radius: 3px;
                        overflow: hidden;
                    }

                    .window-glow {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at 30% 30%, rgba(255, 220, 100, 0.4), rgba(139, 79, 255, 0.1));
                        animation: window-flicker 5s ease-in-out infinite;
                    }

                    @keyframes window-flicker {
                        0%, 100% { opacity: 0.6; }
                        30% { opacity: 1; }
                        50% { opacity: 0.8; }
                        70% { opacity: 1; }
                    }

                    .window-cross-h {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background: rgba(139, 79, 255, 0.3);
                    }

                    .window-cross-v {
                        position: absolute;
                        left: 50%;
                        top: 0;
                        bottom: 0;
                        width: 1px;
                        background: rgba(139, 79, 255, 0.3);
                    }

                    .window-front-1 { top: 20px; left: 16px; }
                    .window-front-2 { top: 20px; right: 16px; }
                    .window-side { top: 20px; left: 50%; transform: translateX(-50%); }

                    /* Roof */
                    .roof {
                        position: absolute;
                        top: -55px;
                        left: -10px;
                        width: 160px;
                        height: 60px;
                        transform-style: preserve-3d;
                    }

                    .roof-front {
                        position: absolute;
                        width: 160px;
                        height: 0;
                        border-left: 80px solid transparent;
                        border-right: 80px solid transparent;
                        border-bottom: 55px solid #3d2d75;
                        transform: translateZ(55px);
                        filter: drop-shadow(0 -4px 20px rgba(139, 79, 255, 0.15));
                    }

                    .roof-back {
                        position: absolute;
                        width: 160px;
                        height: 0;
                        border-left: 80px solid transparent;
                        border-right: 80px solid transparent;
                        border-bottom: 55px solid #2d2055;
                        transform: rotateY(180deg) translateZ(55px) translateX(0px);
                    }

                    .roof-left {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-top: 55px solid transparent;
                        border-bottom: 0 solid transparent;
                        border-right: 110px solid #352865;
                        transform: rotateY(-90deg) translateZ(5px) translateX(55px);
                        transform-origin: right;
                    }

                    .roof-right {
                        position: absolute;
                        right: 0;
                        width: 0;
                        height: 0;
                        border-top: 55px solid transparent;
                        border-bottom: 0 solid transparent;
                        border-left: 110px solid #2a1f50;
                        transform: rotateY(90deg) translateZ(5px) translateX(-55px);
                        transform-origin: left;
                    }

                    /* Chimney */
                    .chimney {
                        position: absolute;
                        top: -80px;
                        right: 20px;
                        width: 16px;
                        height: 30px;
                        background: linear-gradient(180deg, #3d2d75, #2d2055);
                        border: 1px solid rgba(139, 79, 255, 0.15);
                        transform: translateZ(50px);
                        transform-style: preserve-3d;
                    }

                    .smoke-container {
                        position: absolute;
                        top: -20px;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .smoke {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: rgba(139, 79, 255, 0.2);
                        animation: smoke-rise 3s ease-out infinite;
                    }

                    .smoke-1 { animation-delay: 0s; }
                    .smoke-2 { animation-delay: 1s; left: 4px; }
                    .smoke-3 { animation-delay: 2s; left: -3px; }

                    @keyframes smoke-rise {
                        0% { transform: translateY(0) scale(1); opacity: 0.4; }
                        100% { transform: translateY(-50px) scale(2.5); opacity: 0; }
                    }

                    /* Floating Island */
                    .island {
                        position: absolute;
                        bottom: -35px;
                        left: -15px;
                        transform-style: preserve-3d;
                    }

                    .island-top {
                        width: 170px;
                        height: 130px;
                        background: linear-gradient(135deg, #1a3a2e, #122922);
                        border-radius: 8px;
                        transform: rotateX(90deg) translateY(-65px) translateZ(-35px);
                        box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
                    }

                    .island-front {
                        width: 170px;
                        height: 30px;
                        background: linear-gradient(180deg, #122922, #0a1a14);
                        transform: translateZ(65px) translateY(0);
                        border-radius: 0 0 4px 4px;
                    }

                    .island-right {
                        width: 130px;
                        height: 30px;
                        background: linear-gradient(180deg, #0f211a, #081510);
                        transform: rotateY(90deg) translateZ(170px) translateX(-65px);
                        transform-origin: left;
                        border-radius: 0 0 4px 4px;
                    }

                    /* Grass tufts */
                    .grass {
                        position: absolute;
                        width: 4px;
                        height: 12px;
                        background: #2dd4a0;
                        border-radius: 2px;
                        transform: translateZ(65px);
                        opacity: 0.6;
                        animation: grass-sway 2s ease-in-out infinite;
                    }

                    .grass-1 { bottom: 30px; left: 15px; animation-delay: 0s; }
                    .grass-2 { bottom: 30px; left: 130px; animation-delay: 0.5s; height: 8px; }
                    .grass-3 { bottom: 30px; left: 80px; animation-delay: 1s; height: 10px; }

                    @keyframes grass-sway {
                        0%, 100% { transform: translateZ(65px) rotate(0deg); }
                        50% { transform: translateZ(65px) rotate(5deg); }
                    }

                    /* Shadow */
                    .house-shadow {
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 200px;
                        height: 40px;
                        background: radial-gradient(ellipse, rgba(139, 79, 255, 0.12) 0%, transparent 70%);
                        border-radius: 50%;
                        animation: shadow-pulse 4s ease-in-out infinite;
                    }

                    @keyframes shadow-pulse {
                        0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
                        50% { transform: translateX(-50%) scale(0.85); opacity: 0.5; }
                    }

                    /* ---- Logo ---- */
                    .logo-top {
                        position: absolute;
                        top: 2rem;
                        left: 2rem;
                        z-index: 20;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        text-decoration: none;
                    }

                    .logo-icon {
                        width: 32px;
                        height: 32px;
                        border-radius: 8px;
                        background: linear-gradient(135deg, #8b4fff, #6c3ce0);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .logo-text {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-weight: 800;
                        font-size: 1.1rem;
                        color: white;
                    }

                    .logo-text span {
                        color: #10b981;
                    }

                    /* ---- Responsive ---- */
                    @media (max-width: 768px) {
                        .content-wrapper {
                            flex-direction: column-reverse;
                            text-align: center;
                            gap: 30px;
                        }

                        .text-side {
                            max-width: 100%;
                        }

                        .quick-links {
                            justify-content: center;
                        }

                        .house-scene {
                            width: 220px;
                            height: 260px;
                            transform: scale(0.8);
                        }

                        .glitch {
                            font-size: 5rem;
                        }
                    }

                    /* ---- Scanline overlay ---- */
                    .scanlines {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                        background: repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(0, 0, 0, 0.03) 2px,
                            rgba(0, 0, 0, 0.03) 4px
                        );
                        z-index: 15;
                    }
                `}</style>
            </head>
            <body>
                <div className="not-found-page" ref={containerRef}>
                    <div className="bg-gradient" />
                    <div className="grid-bg" />
                    <div className="scanlines" />
                    <Particles />

                    {/* Logo */}
                    <a href="/en" className="logo-top">
                        <div className="logo-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div className="logo-text">
                            Nest<span>Khmer</span>
                        </div>
                    </a>

                    {/* Main Content */}
                    <div className="content-wrapper">
                        <div className="text-side">
                            <GlitchText />
                            <h2 className="subtitle">This address has moved out</h2>
                            <p className="description">
                                Looks like this property listing has expired or was never here.
                                Don&apos;t worry — with 2,400+ live listings, your next home is just a search away.
                            </p>

                            {/* Search */}
                            <form className="search-form" onSubmit={handleSearch}>
                                <div className="search-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search BKK1, Toul Kork, Riverside..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-btn">Search</button>
                            </form>

                            {/* Quick Links */}
                            <div className="quick-links">
                                <a href="/en" className="quick-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    Home
                                </a>
                                <a href="/en/listings" className="quick-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                                    All Listings
                                </a>
                                <a href="/en/districts" className="quick-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Districts
                                </a>
                                <a href="/en/agents" className="quick-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    Agents
                                </a>
                                <a href="/en/contact" className="quick-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                    Contact
                                </a>
                            </div>
                        </div>

                        <div
                            className="house-side"
                            style={{
                                transform: `rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
                                transition: 'transform 0.3s ease-out',
                            }}
                        >
                            <FloatingHouse />
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
