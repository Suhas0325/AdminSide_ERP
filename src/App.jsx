import React from 'react'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './Pages/Home'
import FeedbackDetails from './Pages/FeedbackDetails'

function App() {
 

  return (
    <>

    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/feedback' element={<FeedbackDetails/>}/>
     </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
