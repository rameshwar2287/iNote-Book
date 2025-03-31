import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home  from './Components/Home';
import About from './Components/About';
import NodeState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    < div className="bg-gradient-to-r from-[#de4343] via-purple-500 to-blue-600 w-full  ">
    <NodeState>
    <Navbar/>
    <Alert alert={alert}/>
    <div  className=" container">

      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
      </NodeState>
      </div>
    </>

  );
}

export default App;
