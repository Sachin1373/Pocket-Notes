import React, { useState, useEffect } from 'react';
import './Left.css';

function Left({ setSelectedGroup }) {
  const [showModal, setModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [color, setColor] = useState("#000000");
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const getInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  };

  const handleGroups = () => {
    if (groupName) {
      const newGroup = { name: groupName, color: color };
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      setGroupName('');
      setColor('#000000');
      closeModal();
    }
  };

  const handleGroupClick = (group) => {
    return () => {
      setSelectedGroup(group);
      setActiveGroup(group);
    };
  };



  return (
    <>
      <div className="left-container">
        <h2>Pocket Notes</h2>
        <button onClick={openModal}>+ Create Notes Group</button>
        <ul className="group-list">
          {groups.map((group, index) => (
            <li 
              key={index}
              className="group-item" 
              onClick={handleGroupClick(group)}
              style={{
                backgroundColor: activeGroup === group ? '#efdbd5' : '#fff',
              }}>
              <span className="group-circle" style={{ backgroundColor: group.color }}>
                {getInitials(group.name)}
              </span>
              <span className="group-name">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Notes Group</h3>
            <label>Group Name</label>
            <input 
              type="text" 
              placeholder="Enter your group name..."  
              onChange={(e) => setGroupName(e.target.value)}
            />
            <label>Choose Colour</label>
            <input type="color" onChange={(e) => setColor(e.target.value)} />
            <button className="create-btn" onClick={handleGroups}>Create</button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Left;
