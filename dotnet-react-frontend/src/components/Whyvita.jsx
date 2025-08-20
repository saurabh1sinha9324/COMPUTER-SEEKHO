import React from 'react';
import './Whyvita.css';

function Whyvita() {
  return (
    <section className="why-vita">
      <div className="why-vita-container">
        <div className="why-vita-image">
          <img src="/Whyvita/whychoose.jpg" alt="Why Choose BRAIN INFOTECH" />
        </div>
        <div className="why-vita-content">
          <h2 className="title">
            Why Choose <span>BRAIN INFOTECH</span>?
          </h2>
          <p className="description">
            Our institute has been empowering students for over 20 years. We ensure the best learning experience and career growth.
          </p>
          <ul className="features-list">
            <li>🏫 Best-in-class Infrastructure</li>
            <li>👨‍🏫 Experienced Faculty</li>
            <li>📚 Modern Learning Methodology</li>
            <li>💼 More than 95% Placement for 10 Consecutive Batches</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Whyvita;
