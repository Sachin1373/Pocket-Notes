import React, { useState, useEffect } from 'react';
import Left from './Components/Left_Section/Left';
import Right from './Components/Right/Right';
import Right_Img from './Components/Right_Image/Right_Img';
import './App.css';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='app-container'>
      {isMobile && !selectedGroup ? (
        <Left setSelectedGroup={setSelectedGroup} />
      ) : (
        <>
          <Left setSelectedGroup={setSelectedGroup} />
          {selectedGroup ? <Right selectedgroup={selectedGroup} /> : <Right_Img />}
        </>
      )}
    </div>
  );
}

export default App;
