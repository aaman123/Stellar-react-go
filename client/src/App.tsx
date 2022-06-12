import React from 'react'
import './App.css'
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/account/:username' element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
