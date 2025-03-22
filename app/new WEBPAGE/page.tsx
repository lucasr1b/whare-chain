'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.title = "Welcome Page";

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Splash lasts for 2.5s

    return () => clearTimeout(timeout);
  }, []);

  const handleWalletConnect = () => {
    console.log('Connecting wallet...');
  };

  return (
    <div className="app-container">
      {/* Splash Screen: Always rendered on top */}
      <div className={`splash-screen ${showSplash ? '' : 'splash-hidden'}`}>
        <Image
          src="/logo_wharae_coin_-_orange.png"
          alt="Splash Logo"
          width={100}
          height={100}
          className="splash-logo"
        />
      </div>

      {/* Main Content: Always rendered, even while splash is visible */}
      <div className="main-content">
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-logo-container">
              <Image 
                src="/logo_wharae_coin_-_orange.png" 
                alt="Wharae chain Logo" 
                className="nav-logo"
                width={50}
                height={50}
              />
              <span className="nav-brand">WhareChain</span>
            </div>
            <button className="wallet-button" onClick={handleWalletConnect}>
              <Image 
                src="/dashboardicon.png" 
                alt="Metamask Logo" 
                className="wallet-icon"
                width={24}
                height={24}
              />
              Dashboard
            </button>
          </div>
        </nav>

        <main>
        <section className="hero-section">
  {/* Background Video */}
  <video
    className="hero-video"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/background1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay content */}
  <div className="hero-overlay">
    <div className="hero-content">
      <h1 className="hero-title">Building Trust,</h1>
      <h1 className="hero-title">One Block at a Time</h1>
      <h2 className="hero-subtitle">Transparent Housing Registry (THR)</h2>
      <p className="hero-description">
        A blockchain - powered database ensuring real-time transparency and efficiency in state housing allocation.
      </p>
    </div>
  </div>
</section>

          <section className="what-we-do">
            <h2 className="what-we-do-title">WHAT WE DO</h2>
            <hr className="divider" />
            <div className="content-grid">
              <Image 
                src="/manio.avif"
                alt="People Working"
                className="content-image"
                width={600}
                height={400}
              />
              <div className="content-text">
                <p>At WhareChain, we are transforming how communities access and trust social housing. We use blockchain technology to build a transparent, secure, and tamper-proof platform that assures equitable allocation of housing resources. Our technology uses smart contracts to automate procedures such as eligibility verification and rent management while also providing stakeholders with real-time insights into housing operations. With an emphasis on accountability and community-driven governance, we're creating a future in which social housing is accessible, efficient, and rooted in trust. Together, we can build a world in which everyone has a place to call home.</p>
              </div>
            </div>
          </section>

          <section className="vision-section">
            <h2 className="vision-title">OUR VISION</h2>
            <hr className="vision-divider" />
            <div className="vision-grid">
              <div className="vision-item">
                <svg className="vision-icon" viewBox="0 0 24 24" fill="none" stroke="#00000A" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
                  <path d="M12 6l0 0.01M12 12l0 0.01"/>
                </svg>
                <h3 className="vision-subtitle">Fairness</h3>
                <p className="vision-text">Fair housing starts with clear data. Web3 ensures no one is left behind.</p>
              </div>
              <div className="vision-item">
                <svg className="vision-icon" viewBox="0 0 24 24" fill="none" stroke="#00000A" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <rect x="9" y="13" width="6" height="8"/>
                </svg>
                <h3 className="vision-subtitle">Transparency</h3>
                <p className="vision-text">Transparency isn't a privilege, it's a right. Fair housing is built on trust, transparency, and technology.</p>
              </div>
              <div className="vision-item">
                <svg className="vision-icon" viewBox="0 0 24 24" fill="none" stroke="#00000A" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <h3 className="vision-subtitle">Innovation</h3>
                <p className="vision-text">Innovation meets impact: Blockchain solutions for real world housing challenges.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-title">About Us</h3>
              <div className="footer-links">
                <a href="#">Our Story</a>
                <a href="#">Team</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Services</h3>
              <div className="footer-links">
                <a href="#">Wait-listing</a>
                <a href="#">Maintainance</a>
                <a href="#">NFTs</a>
                <a href="#">DeFi</a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Resources</h3>
              <div className="footer-links">
                <a href="#">Documentation</a>
                <a href="#">Whitepaper</a>
                <a href="#">Blog</a>
                <a href="#">FAQ</a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Legal</h3>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Disclaimer</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
