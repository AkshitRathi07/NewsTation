import { useState } from 'react'
import './App.css'

import React, { Component } from 'react'                    //rcc
import NavBar from './components/NavBar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  max=9;
  
   state = {
    progress:0
  }
  
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress} 
        />
        {/* <News setProgress={this.setProgress}  max={this.max} country="in" category="Science"/> */}
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress}  key="/" max={this.max} country="in" category="general"/>} />
          <Route path="/business" element={<News setProgress={this.setProgress}  key="business" max={this.max} country="in" category="business"/>} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" max={this.max} country="in" category="entertainment"/>} />
          <Route path="/general" element={<News setProgress={this.setProgress}  key="general" max={this.max} country="in" category="general"/>} />
          <Route path="/health" element={<News setProgress={this.setProgress}  key="health" max={this.max} country="in" category="health"/>} />
          <Route path="/science" element={<News setProgress={this.setProgress}  key="science" max={this.max} country="in" category="science"/>} />
          <Route path="/sports" element={<News setProgress={this.setProgress}  key="sports" max={this.max} country="in" category="sports"/>} />
          <Route path="/technology" element={<News setProgress={this.setProgress}  key="technology" max={this.max} country="in" category="technology"/>} />
        </Routes>
        </Router>
      </div>   
    )
  }
}
