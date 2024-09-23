import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import './Right.css';

function Right({ selectedgroup }) {
  const [notes, setNotes] = useState('');
  const [groupNotes, setGroupNotes] = useState([]);

 
  useEffect(() => {
    const loadedNotes = JSON.parse(localStorage.getItem(selectedgroup.name)) || [];
    setGroupNotes(loadedNotes);
  }, [selectedgroup]);

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveNote = () => {
    if (notes.trim()) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const newNote = { text: notes, date: currentDate, time: currentTime };

      const updatedNotes = [...groupNotes, newNote]; 
      setGroupNotes(updatedNotes); 

      
      localStorage.setItem(selectedgroup.name, JSON.stringify(updatedNotes));
      setNotes(''); 
    }
  };

  return (
    <div className="right-container">
    
      <div className="group-header">
        <span
          className="group-circle"
          style={{ backgroundColor: selectedgroup.color }}
        >
          {selectedgroup.name.charAt(0).toUpperCase()}
        </span>
        <span className="group-name">{selectedgroup.name}</span>
      </div>

      <div className="notes-section">
        <ul>
          {groupNotes.map((note, index) => (
            <li key={index}>
              <div className="date-time">
                <div className="note-time">{note.time}</div>
                <div className="note-date">{note.date}</div>
              </div>
              <div className="note-text">
                <div>{note.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    
      <div className="input-section">
        <textarea
          value={notes}
          onChange={handleInputChange}
          placeholder="Type your note here..."
        />
        <IoSend className="send" onClick={handleSaveNote} />
      </div>
    </div>
  );
}

export default Right;
