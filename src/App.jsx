import { useState } from 'react'
import './App.css'

import React from 'react'                    //rcc
import NavBar from './components/NavBar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


const  App = () => {
  const max=9;
  
  const[progress,setProgress]=useState(0);
  const[mode,setMode]=useState('light'); 

  const toggleMode = () =>{
         if(mode==='light'){
          setMode('dark');
          document.body.style.backgroundColor='#121212';
          document.body.style.color='white';
         }
         else{
          setMode('light');
          document.body.style.backgroundColor='white';
          document.body.style.color='black';
         }
  }
 
    return (
      <div>
        <Router>
        <NavBar mode={mode} toggleMode={toggleMode}/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
        />
        {/* <News setProgress={setProgress}  max={max} country="in" category="Science"/> */}
        <Routes>
          <Route path="/" element={<News mode={mode} setProgress={setProgress}  key="/" max={max} country="in" category="general"/>} />
          <Route path="/business" element={<News mode={mode} setProgress={setProgress}  key="business" max={max} country="in" category="business"/>} />
          <Route path="/entertainment" element={<News mode={mode} setProgress={setProgress}  key="entertainment" max={max} country="in" category="entertainment"/>} />
          <Route path="/general" element={<News mode={mode} setProgress={setProgress}  key="general" max={max} country="in" category="general"/>} />
          <Route path="/health" element={<News mode={mode} setProgress={setProgress}  key="health" max={max} country="in" category="health"/>} />
          <Route path="/science" element={<News mode={mode} setProgress={setProgress}  key="science" max={max} country="in" category="science"/>} />
          <Route path="/sports" element={<News mode={mode} setProgress={setProgress}  key="sports" max={max} country="in" category="sports"/>} />
          <Route path="/technology" element={<News mode={mode} setProgress={setProgress}  key="technology" max={max} country="in" category="technology"/>} />
        </Routes>
        </Router>
      </div>   
    )
  
}

export default App; 