
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [arrows, setArrows] = useState([]);
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addArrow = (rotation) => {
    const width = 50, height = 10;
    setArrows([...arrows, { id: Date.now(), x: 50, y: 50, w: width, h: height, rotate: rotation }]);
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

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => addArrow(0)} style={{ marginRight: '5px' }}>➕ Horizontal Arrow</button>
        <button onClick={() => addArrow(90)} style={{ marginRight: '5px' }}>➕ Vertical Arrow</button>
        <button onClick={() => addArrow(45)} style={{ marginRight: '5px' }}>➕ 45° Left Arrow</button>
        <button onClick={() => addArrow(315)}>➕ 45° Right Arrow</button>
      </div>

      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#FFFFFF', color: 'black' }}>
        {arrows.map(a => (
          <Rnd
            key={a.id}
            size={{ width: a.w, height: a.h }}
            position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) =>
              updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y })
            }
            style={{
              backgroundColor: 'blue',
              opacity: 0.9,
              cursor: 'pointer',
              transform: `rotate(${a.rotate}deg)`
            }}
          >
            <div style={{ width: '100%', height: '100%' }}></div>
            <button onClick={() => deleteArrow(a.id)} style={{ marginTop: '5px', color: 'red', position: 'absolute', top: '-25px', left: '0' }}>❌</button>
          </Rnd>
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
