import { useState } from 'react'
import Left from './Components/Left_Section/Left'
import Right from './Components/Right/Right'
import Right_Img from './Components/Right_Image/Right_Img'
import '../src/App.css'
function App() {
   const [selectedgroup,setSelectedGroup]=useState(null)

  return (
    <>
     <div className='app-container'>
     <Left setSelectedGroup={setSelectedGroup}/>
     {selectedgroup ? <Right selectedgroup={selectedgroup}/> : <Right_Img/>}
     </div>
    </>
  )
}

export default App
