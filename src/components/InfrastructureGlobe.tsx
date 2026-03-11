/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Reveal from './Reveal';

// Dynamic import to avoid SSR issues with Three.js/Globe
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function InfrastructureGlobe() {
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        setIsMounted(true);

        const handleResize = () => {
            if (containerRef.current) {
                const width = window.innerWidth;
                const height = Math.min(window.innerHeight * 0.7, 800);
                setDimensions({ width, height });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Auto-rotate setup
        if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.0; // Increased speed further to make it very obvious
            controls.enableZoom = false;

            // Setup Custom Post-Processing for Cinematic "Neon Bloom"
            const { scene, camera, renderer } = globeEl.current;

            import('three-stdlib').then(({ EffectComposer, RenderPass }) => {
                if (typeof renderer.getSize !== 'function') {
                    // Safety check if renderer is not fully initialized or is using an alternative renderer
                    console.warn("Globe renderer not ready for EffectComposer.");
                    return;
                }
                const renderScene = new RenderPass(scene, camera);
                // strength, radius, threshold
                const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.1);

                const composer = new EffectComposer(renderer);
                composer.addPass(renderScene);
                composer.addPass(bloomPass);

                // Override default render loop
                globeEl.current.postProcessingComposer = composer;

                (function animate() {
                    composer.render();
                    requestAnimationFrame(animate);
                })();
            });
        }
    }, [isMounted, globeEl]); // Added globeEl to dependencies to handle linting and ensure effect runs when ref is available

    // BlueVolt / Redwood Colors
    const primaryAccent = '#2563eb';
    const highlightAccent = '#60a5fa';

    // Same nodes as before, now with real lat/long
    const locations = useMemo(() => [
        { id: 'us-west', name: 'US West (Oregon)', lat: 43.8041, lng: -120.5542, size: 0.15, active: 3102, color: primaryAccent },
        { id: 'us-east', name: 'US East (N. Virginia)', lat: 38.9072, lng: -77.0369, size: 0.25, active: 4890, color: primaryAccent },
        { id: 'sa-east', name: 'South America (São Paulo)', lat: -23.5505, lng: -46.6333, size: 0.1, active: 850, color: highlightAccent },
        { id: 'eu-west', name: 'Europe (London)', lat: 51.5074, lng: -0.1278, size: 0.2, active: 2980, color: primaryAccent },
        { id: 'eu-central', name: 'Europe (Frankfurt)', lat: 50.1109, lng: 8.6821, size: 0.2, active: 3120, color: highlightAccent },
        { id: 'ap-south', name: 'Asia Pacific (Mumbai)', lat: 19.0760, lng: 72.8777, size: 0.3, active: 5600, color: primaryAccent },
        { id: 'ap-se', name: 'Asia Pacific (Singapore)', lat: 1.3521, lng: 103.8198, size: 0.15, active: 2100, color: highlightAccent },
        { id: 'ap-ne', name: 'Asia Pacific (Tokyo)', lat: 35.6762, lng: 139.6503, size: 0.15, active: 1850, color: highlightAccent },
        { id: 'ap-se2', name: 'Asia Pacific (Sydney)', lat: -33.8688, lng: 151.2093, size: 0.1, active: 1100, color: primaryAccent },
    ], []);

    // Simulated data arcs (flowing traffic)
    const arcsData = useMemo(() => [
        { startLat: 38.9072, startLng: -77.0369, endLat: 51.5074, endLng: -0.1278, color: [primaryAccent, highlightAccent] }, // US East to London
        { startLat: 38.9072, startLng: -77.0369, endLat: 43.8041, endLng: -120.5542, color: [primaryAccent, highlightAccent] }, // US East to US West
        { startLat: 51.5074, startLng: -0.1278, endLat: 19.0760, endLng: 72.8777, color: [highlightAccent, primaryAccent] }, // London to Mumbai
        { startLat: 19.0760, startLng: 72.8777, endLat: 1.3521, endLng: 103.8198, color: [primaryAccent, highlightAccent] }, // Mumbai to Singapore
        { startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, color: [highlightAccent, primaryAccent] }, // Singapore to Tokyo
        { startLat: 38.9072, startLng: -77.0369, endLat: -23.5505, endLng: -46.6333, color: [primaryAccent, highlightAccent] }, // US East to Sao Paulo
    ], []);


    return (
        <section className="infrastructure-section" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10, padding: '0 2rem' }}>
                <Reveal delay={0.2} width="100%">
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        Global Ecosystem Reach
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Our platforms are actively deployed across top-tier institutions worldwide, synchronizing education across borders.
                    </p>
                </Reveal>
            </div>

            <div ref={containerRef} style={{ position: 'relative', width: '100vw', height: `${dimensions.height}px`, marginLeft: 'calc(-50vw + 50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'grab', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-surface) 50%, var(--bg-secondary) 100%)', overflow: 'hidden' }}>

                {/* Background glow behind globe */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', maxWidth: '600px', maxHeight: '600px', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

                {isMounted && (
                    <div style={{ zIndex: 5, width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Globe
                            ref={globeEl}
                            width={dimensions.width}
                            height={dimensions.height}
                            backgroundColor="rgba(0,0,0,0)"
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                            // High-End HTML Node Tooltips
                            htmlElementsData={locations}
                            htmlLat={d => (d as any).lat}
                            htmlLng={d => (d as any).lng}
                            htmlElement={(d: any) => {
                                const el = document.createElement('div');
                                el.innerHTML = `
                                    <div style="
                                        background: var(--bg-surface); 
                                        backdrop-filter: blur(12px); 
                                        -webkit-backdrop-filter: blur(12px); 
                                        border: 1px solid var(--border-main); 
                                        padding: 0.75rem 1rem; 
                                        border-radius: var(--radius-md); 
                                        color: var(--text-primary); 
                                        width: 180px; 
                                        box-shadow: var(--shadow-lg);
                                        pointer-events: auto;
                                        cursor: pointer;
                                        transition: transform 0.2s;
                                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                        <div style="font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${d.name}</div>
                                        <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary);">
                                            <span>Active Institutions</span>
                                            <span style="color: var(--text-primary); font-weight: 600;">${d.active.toLocaleString()}</span>
                                        </div>
                                    </div>
                                `;
                                return el;
                            }}

                            // Glowing Rings
                            ringsData={locations}
                            ringLat={d => (d as any).lat}
                            ringLng={d => (d as any).lng}
                            ringColor={() => (t: number) => `rgba(37,99,235,${1 - t})`}
                            ringMaxRadius={12} // Increased radius for visibility
                            ringPropagationSpeed={3}
                            ringRepeatPeriod={800} // Faster pulsing

                            // Dynamic Connections
                            arcsData={arcsData}
                            arcStartLat={d => (d as any).startLat}
                            arcStartLng={d => (d as any).startLng}
                            arcEndLat={(d: any) => (d as any).endLat}
                            arcEndLng={(d: any) => (d as any).endLng}
                            arcColor={(d: any) => (d as any).color}
                            arcDashLength={0.4}
                            arcDashGap={4}
                            arcDashInitialGap={() => Math.random() * 5}
                            arcDashAnimateTime={2000}
                            arcStroke={2} // Increased stroke for visibility
                            arcAltitudeAutoScale={0.4}
                        />
                    </div>
                )}

                {/* Overlay Vignette for seamless blending into site */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, transparent 40%, var(--bg-base) 100%)', zIndex: 10 }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: primaryAccent }}></div> Core Hubs
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: highlightAccent }}></div> Edge Nodes
                </div>
            </div>
        </section>
    );
}
