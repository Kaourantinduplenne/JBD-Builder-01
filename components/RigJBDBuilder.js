
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [arrows, setArrows] = useState([]);

  const addArrow = () => {
    setArrows([...arrows, { id: Date.now(), x: 50, y: 50, w: 50, h: 10, rotate: 0 }]);
  };

  const updateArrow = (id, newProps) => {
    setArrows(arrows.map(a => (a.id === id ? { ...a, ...newProps } : a)));
  };

  const deleteArrow = (id) => {
    setArrows(arrows.filter(a => a.id !== id));
  };

  return (
    <div style={{ width: '800px', backgroundColor: '#00587C', padding: '20px', color: 'white', fontFamily: 'Quantico' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: '300px', height: '100px' }} />
        <div style={{ width: '10px' }}></div>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>JBD Builder</h1>
      </div>
      <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', margin: '10px 0' }}></div>

      <button onClick={addArrow} style={{ marginBottom: '10px', padding: '5px 10px' }}>➕ Add Blue Arrow</button>

      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#FFFFFF', color: 'black' }}>
        {arrows.map(a => (
          <div key={a.id} style={{ position: 'absolute', left: a.x, top: a.y }}>
            <Rnd
              size={{ width: a.w, height: a.h }}
              position={{ x: a.x, y: a.y }}
              onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y })
              }
              style={{
                transform: `rotate(${a.rotate}deg)`,
                backgroundColor: 'blue',
                opacity: 0.9,
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '100%', height: '100%' }}></div>
            </Rnd>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
              <button onClick={() => updateArrow(a.id, { rotate: 0 })}>↔️ Horizontal</button>
              <button onClick={() => updateArrow(a.id, { rotate: 90 })}>↕️ Vertical</button>
              <button onClick={() => updateArrow(a.id, { rotate: 45 })}>↗️ Left 45°</button>
              <button onClick={() => updateArrow(a.id, { rotate: 315 })}>↘️ Right 45°</button>
              <button onClick={() => deleteArrow(a.id)} style={{ color: 'red' }}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
