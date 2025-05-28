
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#FFD433'];
const RIG_OPTIONS = ['DAT', 'DGD', 'DPN', 'DPS', 'DPT', 'DTH', 'DTN', 'DVS'];

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('DAT');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [diagram, setDiagram] = useState('Drillfloor');
  const [personnel, setPersonnel] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [personPositions, setPersonPositions] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskPersons, setTaskPersons] = useState([]);
  const [zones, setZones] = useState([]);
  const [arrows, setArrows] = useState([]);

  const addPerson = () => {
    if (newPerson.trim()) {
      const color = COLORS[personnel.length % COLORS.length];
      setPersonnel([...personnel, { name: newPerson, color }]);
      setNewPerson('');
    }
  };

  const addTask = () => {
    if (newTask.trim() && taskPersons.length) {
      setTasks([...tasks, { step: newTask, persons: taskPersons }]);
      setNewTask('');
      setTaskPersons([]);
    }
  };

  const updatePosition = (index, data) => {
    setPersonPositions({ ...personPositions, [index]: { x: data.x, y: data.y } });
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

  return (
    <div style={{ width: '800px', backgroundColor: '#00587C', color: 'white', padding: '20px', fontFamily: 'Quantico' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: '300px', height: '100px' }} />
        <div style={{ width: '10px' }}></div>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>JBD Builder</h1>
      </div>
      <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', margin: '10px 0' }}></div>

      <input placeholder="Operation" value={operation} onChange={e => setOperation(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <select value={rig} onChange={e => setRig(e.target.value)} style={{ width: '100%', margin: '5px 0' }}>
        {RIG_OPTIONS.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <input placeholder="PIC" value={pic} onChange={e => setPic(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <textarea placeholder="Line of Fire Hazard" value={lofHazard} onChange={e => setLofHazard(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />

      <select value={diagram} onChange={e => setDiagram(e.target.value)} style={{ width: '100%', margin: '5px 0' }}>
        <option value="Drillfloor">Drillfloor</option>
        <option value="Helideck">Helideck</option>
        <option value="Deck">Deck</option>
      </select>

      <div style={{ marginBottom: '10px' }}>
        <input placeholder="Add Personnel" value={newPerson} onChange={e => setNewPerson(e.target.value)} />
        <button onClick={addPerson}>Add</button>
        <ul>
          {personnel.map((p, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <div style={{ backgroundColor: p.color, width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px', textAlign: 'center' }}>{i + 1}</div>
              {p.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <input placeholder="Task Step" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <select multiple value={taskPersons} onChange={e => setTaskPersons(Array.from(e.target.selectedOptions, o => o.value))}>
          {personnel.map((p, i) => (
            <option key={i} value={p.name}>{p.name}</option>
          ))}
        </select>
        <button onClick={addTask}>Add Task</button>
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
        {personnel.map((p, i) => (
          <Rnd
            key={i}
            size={{ width: 30, height: 30 }}
            position={personPositions[i] || { x: 0, y: 0 }}
            onDragStop={(e, d) => updatePosition(i, d)}
            style={{ backgroundColor: p.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
          >
            {i + 1}
          </Rnd>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3>Task Steps</h3>
        <ul>
          {tasks.map((t, i) => (
            <li key={i}>
              {i + 1}. {t.step} - Persons: {t.persons.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      <button style={{ marginTop: '10px', padding: '10px', backgroundColor: '#FFB511', color: 'black' }} onClick={() => alert('Generate Preview Hook Here')}>
        Generate Preview
      </button>
    </div>
  );
}
