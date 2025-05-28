
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [arrows, setArrows] = useState([]);
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addArrow = () => {
    setArrows([...arrows, { id: Date.now(), x: 50, y: 50, w: 50, h: 10, rotate: 0 }]);
  };

  const updateArrow = (id, newProps) => {
    setArrows(arrows.map(a => (a.id === id ? { ...a, ...newProps } : a)));
  };

  const deleteArrow = (id) => {
    setArrows(arrows.filter(a => a.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const reorderTask = (index, direction) => {
    const newTasks = [...tasks];
    const [moved] = newTasks.splice(index, 1);
    newTasks.splice(index + direction, 0, moved);
    setTasks(newTasks);
  };

  return (
    <div style={{ width: '800px', backgroundColor: '#00587C', padding: '20px', color: 'white', fontFamily: 'Quantico' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: '300px', height: '100px' }} />
        <div style={{ width: '10px' }}></div>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>JBD Builder</h1>
      </div>
      <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', margin: '10px 0' }}></div>

      <div style={{ marginBottom: '10px' }}>
        <label>Operation:</label>
        <input value={operation} onChange={e => setOperation(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Rig:</label>
        <input value={rig} onChange={e => setRig(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>PIC:</label>
        <input value={pic} onChange={e => setPic(e.target.value)} style={{ width: '100%' }} />
      </div>

      <button onClick={addArrow} style={{ marginBottom: '10px', padding: '5px 10px' }}>➕ Add Blue Arrow</button>

      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#FFFFFF', color: 'black' }}>
        {arrows.map(a => (
          <div key={a.id} style={{ position: 'absolute', left: a.x, top: a.y, transform: `rotate(${a.rotate}deg)` }}>
            <Rnd
              size={{ width: a.w, height: a.h }}
              position={{ x: 0, y: 0 }}
              onDragStop={(e, d) => updateArrow(a.id, { x: a.x + d.x, y: a.y + d.y })}
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height) })
              }
              style={{ backgroundColor: 'blue', opacity: 0.9, cursor: 'pointer' }}
            >
              <div style={{ width: '100%', height: '100%' }}></div>
            </Rnd>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
              <button onClick={() => updateArrow(a.id, { rotate: 0 })}>↔️</button>
              <button onClick={() => updateArrow(a.id, { rotate: 90 })}>↕️</button>
              <button onClick={() => updateArrow(a.id, { rotate: 45 })}>↗️</button>
              <button onClick={() => updateArrow(a.id, { rotate: 315 })}>↘️</button>
              <button onClick={() => deleteArrow(a.id)} style={{ color: 'red' }}>❌</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Task Step:</label>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} style={{ width: '100%' }} />
        <button onClick={addTask} style={{ marginTop: '5px' }}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {index + 1}. {task}
              <button onClick={() => deleteTask(index)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
              {index > 0 && <button onClick={() => reorderTask(index, -1)} style={{ marginLeft: '5px' }}>⬆️</button>}
              {index < tasks.length - 1 && <button onClick={() => reorderTask(index, 1)} style={{ marginLeft: '5px' }}>⬇️</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
