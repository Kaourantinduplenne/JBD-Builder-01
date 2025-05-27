
// RigJBDBuilder.js
// Updated with: Pantone 7708 background, Transocean logo, yellow line, JBD Builder title (Quantico white), wider preview window

import React from 'react';

export default function RigJBDBuilder() {
  return (
    <div style={{ backgroundColor: '#005670', fontFamily: 'Quantico, sans-serif', color: 'white', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <img src="/Transocean Logo_White.png" alt="Transocean Logo" width={300} height={100} />
          <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', marginTop: '4px' }}></div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '38px', fontWeight: 'bold' }}>
          JBD Builder
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {/* Main form and preview area */}
        <div style={{ width: '800px', height: 'auto', border: '1px solid white', padding: '10px' }}>
          {/* Interactive components go here */}
          <p>Interactive Rig JBD Builder Content...</p>
        </div>
      </div>
    </div>
  );
}
