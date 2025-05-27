
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [workers, setWorkers] = useState([]);
  const [workerInput, setWorkerInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [zones, setZones] = useState([]);
  const [arrows, setArrows] = useState([]);

  const addWorker = () => {
    if (workerInput.trim()) {
      setWorkers([...workers, workerInput.trim()]);
      setWorkerInput('');
    }
  };

  const deleteWorker = (index) => {
    setWorkers(workers.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (taskInput.trim() && selectedWorkers.length) {
      setTasks([...tasks, { step: taskInput.trim(), persons: [...selectedWorkers] }]);
      setTaskInput('');
      setSelectedWorkers([]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addZone = (color) => {
    setZones([...zones, { id: Date.now(), color, x: 10, y: 10, w: 100, h: 100 }]);
  };

  const updateZone = (id, updates) => {
    setZones(zones.map(z => z.id === id ? { ...z, ...updates } : z));
  };

  const deleteZone = (id) => {
    setZones(zones.filter(z => z.id !== id));
  };

  const addArrow = () => {
    setArrows([...arrows, { id: Date.now(), x: 20, y: 20, w: 60, h: 10, direction: 'horizontal' }]);
  };

  const updateArrow = (id, updates) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteArrow = (id) => {
    setArrows(arrows.filter(a => a.id !== id));
  };

  return (
    <div style={{ backgroundColor: '#005670', fontFamily: 'Quantico, sans-serif', color: 'white', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean Logo" width={300} height={100} />
        <div style={{ marginLeft: '10px', fontSize: '38px', fontWeight: 'bold' }}>
          JBD Builder
        </div>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: '#FFB511', marginTop: '4px' }}></div>

      <div style={{ marginTop: '20px', width: '800px' }}>
        <input placeholder="Operation" value={operation} onChange={(e) => setOperation(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
        <input placeholder="Rig" value={rig} onChange={(e) => setRig(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
        <input placeholder="PIC" value={pic} onChange={(e) => setPic(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
        <textarea placeholder="Line of Fire Hazard" value={lofHazard} onChange={(e) => setLofHazard(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />

        <div style={{ margin: '10px 0' }}>
          <input placeholder="Add Personnel" value={workerInput} onChange={(e) => setWorkerInput(e.target.value)} />
          <button onClick={addWorker}>Add</button>
          <ul>
            {workers.map((w, i) => (
              <li key={i}>
                <span style={{ backgroundColor: '#FFB511', borderRadius: '50%', padding: '4px 8px', marginRight: '8px' }}>{i + 1}</span>
                {w} <button onClick={() => deleteWorker(i)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '10px 0' }}>
          <input placeholder="Task Step" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
          <select multiple value={selectedWorkers} onChange={(e) => setSelectedWorkers(Array.from(e.target.selectedOptions, opt => opt.value))}>
            {workers.map((w, i) => (
              <option key={i} value={w}>{w}</option>
            ))}
          </select>
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map((t, i) => (
              <li key={i}>
                {i + 1}. {t.step} (Persons: {t.persons.join(', ')}) <button onClick={() => deleteTask(i)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ position: 'relative', width: '800px', height: '400px', border: '1px solid white' }}>
          {zones.map(z => (
            <Rnd key={z.id} size={{ width: z.w, height: z.h }} position={{ x: z.x, y: z.y }}
              onDragStop={(e, d) => updateZone(z.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) => updateZone(z.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), ...pos })}
              style={{ border: `2px dashed ${z.color}`, backgroundColor: `rgba(255,255,255,0.1)` }}>
              <button onClick={() => deleteZone(z.id)}>❌</button>
            </Rnd>
          ))}
          {arrows.map(a => (
            <Rnd key={a.id} size={{ width: a.w, height: a.h }} position={{ x: a.x, y: a.y }}
              onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) => updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), ...pos })}
              style={{ backgroundColor: 'white' }}>
              <div style={{ transform: a.direction === 'vertical' ? 'rotate(90deg)' : a.direction === 'left' ? 'rotate(45deg)' : a.direction === 'right' ? 'rotate(-45deg)' : 'none' }}>
                ➡
              </div>
              <button onClick={() => updateArrow(a.id, { direction: 'horizontal' })}>↔</button>
              <button onClick={() => updateArrow(a.id, { direction: 'vertical' })}>↕</button>
              <button onClick={() => updateArrow(a.id, { direction: 'left' })}>↖</button>
              <button onClick={() => updateArrow(a.id, { direction: 'right' })}>↘</button>
              <button onClick={() => deleteArrow(a.id)}>❌</button>
            </Rnd>
          ))}
        </div>

        <div style={{ margin: '10px 0' }}>
          <button onClick={() => addZone('green')}>Add Green Zone</button>
          <button onClick={() => addZone('red')}>Add Red Zone</button>
          <button onClick={() => addZone('black')}>Add Black Zone</button>
          <button onClick={addArrow}>Add Arrow</button>
        </div>
      </div>
    </div>
  );
}
