import React from 'react'
import WelcomePage from './components/welcome/WelcomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/home/HomePage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App