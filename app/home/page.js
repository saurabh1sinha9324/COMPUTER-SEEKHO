'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './home.css';

const HomePage = () => {
  return (
    <>
      <Header />

      <main className="home-main">
        <section className="hero-section">
          <h1>Welcome to SMVITA</h1>
          <p>Empowering your future with top-notch training and career support.</p>
        </section>

        <section className="about-section">
          <h2>About SMVITA</h2>
          <p>
            SMVITA (Vidyanidhi Info Tech Academy) is dedicated to shaping the careers of IT aspirants through
            industry-relevant training and placement assistance.
          </p>
        </section>

        <section className="features-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Experienced Faculty</li>
            <li>Placement Support</li>
            <li>Live Project Training</li>
            <li>Industry-Relevant Curriculum</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
