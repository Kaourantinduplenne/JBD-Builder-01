
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [diagram, setDiagram] = useState('Drillfloor');
  const [personnel, setPersonnel] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [zones, setZones] = useState([]);
  const [arrows, setArrows] = useState([]);

  const addPerson = () => {
    if (newPerson.trim()) {
      setPersonnel([...personnel, newPerson]);
      setNewPerson('');
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { step: newTask, persons: [] }]);
      setNewTask('');
    }
  };

  const addZone = (color) => {
    setZones([...zones, { id: Date.now(), x: 50, y: 50, w: 100, h: 100, color }]);
  };

  const updateZone = (id, newProps) => {
    setZones(zones.map(z => z.id === id ? { ...z, ...newProps } : z));
  };

  const deleteZone = (id) => {
    setZones(zones.filter(z => z.id !== id));
  };

  const addArrow = (rotation) => {
    setArrows([...arrows, { id: Date.now(), x: 50, y: 50, w: 50, h: 10, rotate: rotation }]);
  };

  const updateArrow = (id, newProps) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, ...newProps } : a));
  };

  const deleteArrow = (id) => {
    setArrows(arrows.filter(a => a.id !== id));
  };

  const generatePreview = () => {
    alert('Generate preview feature (hook into html2canvas or @react-pdf/renderer)');
  };

  return (
    <div style={{ width: '800px', backgroundColor: '#00587C', color: 'white', padding: '20px', fontFamily: 'Quantico' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: '300px', height: '100px' }} />
        <div style={{ width: '10px' }}></div>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>JBD Builder</h1>
      </div>
      <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', margin: '10px 0' }}></div>

      <input placeholder="Operation" value={operation} onChange={e => setOperation(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <input placeholder="Rig" value={rig} onChange={e => setRig(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <input placeholder="PIC" value={pic} onChange={e => setPic(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <textarea placeholder="Line of Fire Hazard" value={lofHazard} onChange={e => setLofHazard(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      
      <select value={diagram} onChange={e => setDiagram(e.target.value)} style={{ width: '100%', margin: '5px 0' }}>
        <option value="Drillfloor">Drillfloor</option>
        <option value="Helideck">Helideck</option>
        <option value="Deck">Deck</option>
      </select>

      <div>
        <input placeholder="Add Personnel" value={newPerson} onChange={e => setNewPerson(e.target.value)} />
        <button onClick={addPerson}>Add</button>
        <ul>{personnel.map((p, i) => (
          <li key={i} style={{ background: 'gray', borderRadius: '50%', width: '30px', height: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', margin: '2px' }}>{i + 1}</li>
        ))}</ul>
      </div>

      <div>
        <input placeholder="Task Step" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
        <ul>{tasks.map((t, i) => <li key={i}>{i + 1}. {t.step}</li>)}</ul>
      </div>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => addZone('green')}>Add Green Zone</button>
        <button onClick={() => addZone('red')}>Add Red Zone</button>
        <button onClick={() => addZone('black')}>Add Black Zone</button>
        <button onClick={() => addArrow(0)}>➕ Horizontal Arrow</button>
        <button onClick={() => addArrow(90)}>➕ Vertical Arrow</button>
        <button onClick={() => addArrow(45)}>➕ 45° Left Arrow</button>
        <button onClick={() => addArrow(315)}>➕ 45° Right Arrow</button>
      </div>

      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#FFFFFF', color: 'black' }}>
        <img src={`/${diagram}.png`} alt={diagram} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        {zones.map(z => (
          <Rnd key={z.id} size={{ width: z.w, height: z.h }} position={{ x: z.x, y: z.y }}
            onDragStop={(e, d) => updateZone(z.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => updateZone(z.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y })}
            style={{ border: `2px dashed ${z.color}`, backgroundColor: `${z.color}`, opacity: 0.2 }}>
            <button onClick={() => deleteZone(z.id)} style={{ position: 'absolute', top: '-20px', left: '0', color: 'red' }}>❌</button>
          </Rnd>
        ))}
        {arrows.map(a => (
          <Rnd key={a.id} size={{ width: a.w, height: a.h }} position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y })}
            style={{ backgroundColor: 'blue', opacity: 0.9, transform: `rotate(${a.rotate}deg)` }}>
            <button onClick={() => deleteArrow(a.id)} style={{ position: 'absolute', top: '-20px', left: '0', color: 'red' }}>❌</button>
          </Rnd>
        ))}
      </div>

      <button onClick={generatePreview} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#FFB511', color: 'black' }}>Generate Preview</button>
    </div>
  );
}
