import Image from "next/image";
import Link from "next/link";
import { BookOpen, Monitor, Rocket, Calendar, Hexagon, GraduationCap, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import InfrastructureGlobe from "@/components/InfrastructureGlobeDynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stores24HomePage from "./stores24/page";

export default async function Home() {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";

  // Ensure stores24 subdomain root never renders the main BlueVolt landing page.
  if (host.startsWith("stores24.")) {
    return <Stores24HomePage />;
  }

  // Serve in-project static apps on their product subdomains.
  if (host.startsWith("lifeos.")) {
    redirect("/lifeos/index.html");
  }

  if (host.startsWith("vmart.") || host.startsWith("vemgalmart.")) {
    redirect("/vmart/index.html");
  }

  return (
    <>
      <main>
        <div className="hero-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Cinematic Corporate Video Background */}
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6, // Increased again to ensure visibility
              zIndex: 0, // Brought forward
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blinking-lights-3086-large.mp4" type="video/mp4" />
          </video>

          {/* Strong White Fade for Legibility */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 20%, var(--bg-base) 90%, var(--bg-base) 100%)',
            zIndex: 1, // Sit above video, below text
            pointerEvents: 'none' // Ensure clicks pass through
          }}></div>

          <div className="background-grid"></div>

          <section className="hero">

            {/* Left Content Column */}
            <div className="hero-content-left">
              <Reveal delay={0.1}>
                <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '2rem' }}>
                  <span style={{
                    color: 'var(--accent)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
                    The Complete Digital Ecosystem
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <h1>
                  Unifying the <br />
                  <span className="hero-highlight">Future of Education</span>
                </h1>
              </Reveal>

              <Reveal delay={0.3}>
                <p>
                  BlueVolt delivers a seamlessly integrated suite of platforms—from school administration to event coordination—designed to elevate digital learning environments worldwide.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="hero-actions">
                  <Link href="#ecosystem" className="btn-launch" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                    Explore the Ecosystem
                  </Link>
                  <Link href="/contact" style={{ color: 'var(--text-primary)', fontWeight: '600', padding: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'color 0.2s', width: '100%' }}>
                    Contact Global Sales <span style={{ transition: 'transform 0.2s' }}>&rarr;</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Graphic Column - Ecosystem Core */}
            <Reveal delay={0.5}>
              <div className="hero-graphic-right">

                {/* Subtle Glowing Background */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }}></div>

                {/* Ecosystem Floating Cards */}
                <div className="hero-cards-container">

                  {/* Schools24 Card (Center) */}
                  <div className="hero-card-center">
                    <div style={{ padding: '0.75rem', background: 'rgba(37,99,235,0.1)', borderRadius: '12px' }}>
                      <GraduationCap size={24} color="var(--accent)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Schools24</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Administration Hub</p>
                    </div>
                  </div>

                  {/* Events 24 Card (Left/Back) */}
                  <div className="hero-card-left">
                    <div style={{ padding: '0.5rem', background: 'rgba(37,99,235,0.1)', borderRadius: '8px' }}>
                      <Calendar size={20} color="var(--accent)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Events 24</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Event Orchestration</p>
                    </div>
                  </div>

                  {/* LifeOS Card (Right/Back) */}
                  <div className="hero-card-right">
                    <div style={{ padding: '0.5rem', background: 'rgba(37,99,235,0.1)', borderRadius: '8px' }}>
                      <Hexagon size={20} color="var(--accent)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Life OS</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Operations Core</p>
                    </div>
                  </div>

                </div>

                {/* Decorative Orbit Rings */}
                <div className="hero-orbit ring-1"></div>
                <div className="hero-orbit ring-2"></div>

              </div>
            </Reveal>

          </section>
        </div>



        {/* --- About Section / Bento Grid --- */}
        <section className="about-section" id="about" style={{ marginTop: '0', paddingTop: '6rem' }}>
          <div className="about-split">
            <Reveal delay={0.2} width="100%">
              <div className="brands-header" style={{ textAlign: 'left', maxWidth: '100%', marginBottom: 0 }}>
                <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', fontWeight: 800 }}>About BlueVolt</h2>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1.6 }}>We are dedicated to revolutionizing education through comprehensive support and advanced digital platforms. Our infrastructure empowers global academic institutions to scale seamlessly.</p>
              </div>
            </Reveal>

            {/* Grounding Corporate Image */}
            <Reveal delay={0.3} width="100%">
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-main)', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ paddingBottom: '66.66%', position: 'relative' }}>
                  <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" alt="Corporate Office" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="bento-grid">
            {/* Main Bento Feature */}
            <Reveal delay={0.2} width="100%">
              <div className="bento-item">
                <div className="bento-content">
                  <div className="glow-icon"><BookOpen size={32} strokeWidth={2} color="var(--accent)" /></div>
                  <h3 className="card-title">Institutional Intelligence</h3>
                  <p className="card-text">Advanced academic counseling and strategic institutional training for global education centers.</p>
                </div>
              </div>
            </Reveal>

            {/* Secondary Features */}
            <Reveal delay={0.4} width="100%">
              <div className="bento-item">
                <div className="bento-content">
                  <div className="glow-icon"><Monitor size={32} strokeWidth={2} color="var(--accent)" /></div>
                  <h3 className="card-title">Next-Gen EdTech</h3>
                  <p className="card-text">Scalable e-learning platforms and LMS infrastructure designed for high-availability enterprise environments.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6} width="100%">
              <div className="bento-item">
                <div className="bento-content">
                  <div className="glow-icon"><Rocket size={32} strokeWidth={2} color="var(--accent)" /></div>
                  <h3 className="card-title">Accelerated Growth</h3>
                  <p className="card-text">Technical workshops designed to optimize human capital for the modern digital economy.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Global 3D Infrastructure Globe --- */}
        <div id="infrastructure">
          <InfrastructureGlobe />
        </div>


        {/* --- Our Ecosystem Section --- */}
        <section className="brands-section" id="ecosystem" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
          <Reveal delay={0.2} width="100%">
            <div className="brands-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.5rem 1.25rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Rocket size={16} /> Global Network
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>The BlueVolt Ecosystem</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                Our products are engineered to work in harmony, creating a resilient digital foundation for modern institutions, commerce, and enterprise operations.
              </p>
            </div>
          </Reveal>

          <div className="brands-grid" style={{ gap: '3rem' }}>
            {/* Schools24 */}
            <Reveal delay={0.1}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="/Assets/Schools24.png" alt="Schools24" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-live">Live Ecosystem</span>
                  <h3 className="brand-card-title">Schools24</h3>
                  <p className="brand-card-description">
                    The cornerstone administrative platform for educational institutions. Manages everything from admissions to complex academic workflows with zero friction.
                  </p>
                  <div className="brand-card-footer">
                    <a href="https://schools24.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                      Visit Platform <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* BlueVolt POS */}
            <Reveal delay={0.2}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="/Assets/Stores24.png" alt="BlueVolt POS" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-live">Enterprise Ready</span>
                  <h3 className="brand-card-title">BlueVolt POS</h3>
                  <p className="brand-card-description">
                    A unified retail management and ERP solution (formerly Stores24). Engineered for high-velocity commerce and intelligent inventory automation.
                  </p>
                  <div className="brand-card-footer">
                    <Link href="/stores24" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                      Access Dashboard <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Events 24 */}
            <Reveal delay={0.3}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="/Assets/Events24.png" alt="Events 24" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-beta">Beta Access</span>
                  <h3 className="brand-card-title">Events 24</h3>
                  <p className="brand-card-description">
                    End-to-end event orchestration for large-scale institutional coordination. Ticketing, logistics, and real-time attendance management.
                  </p>
                  <div className="brand-card-footer">
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Deploying Globally</span>
                    <Link href="/products/events24" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Learn More</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Life OS */}
            <Reveal delay={0.4}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" alt="Life OS" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-dev">In Development</span>
                  <h3 className="brand-card-title">Life OS</h3>
                  <p className="brand-card-description">
                    A personal and professional productivity layer designed to organize institutional life, data, and communication in one unified interface.
                  </p>
                  <div className="brand-card-footer">
                    <Link href="/lifeos" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Access Platform</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vemgal Mart */}
            <Reveal delay={0.5}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop" alt="Vemgal Mart" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-internal">Internal Beta</span>
                  <h3 className="brand-card-title">Vemgal Mart</h3>
                  <p className="brand-card-description">
                    The regional commerce fulfilled infrastructure. Connecting local producers with institutional demand through a smart logistics engine.
                  </p>
                  <div className="brand-card-footer">
                    <Link href="/vemgalmart" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Access Platform</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Eliment */}
            <Reveal delay={0.6}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="brand-card-image-wrapper">
                  <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" alt="Eliment" fill style={{ objectFit: 'cover' }} />
                  <div className="brand-card-overlay" />
                </div>
                <div className="brand-card-content">
                  <span className="ecosystem-badge badge-dev">Architecture</span>
                  <h3 className="brand-card-title">Eliment</h3>
                  <p className="brand-card-description">
                    The underlying infrastructure layer that powers the BlueVolt ecosystem. High-availability, secure, and distributed by design.
                  </p>
                  <div className="brand-card-footer">
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phase 1 Complete</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>


      </main>
    </>
  );
}
