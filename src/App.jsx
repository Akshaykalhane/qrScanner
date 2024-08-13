import React , { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import QrCodeScanner from './pages/Html5QrCode'
import QrCodeScannerNew from './pages/QrScanner'
// import ReactQrCodeScanner from './pages/ReactQrCode'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/homePage/HomePage'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
