

import './App.css'
import { Routes, Route } from "react-router-dom";
import { Detail, LandingPage, Home, Form } from './components';

function App() {
  

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<LandingPage />} />;
      <Route path="/home" element={<Home />} />;
      <Route path="/detailrecipe/:id" element={<Detail />} />;
      <Route path="/createfood" element={<Form />} />;
    </Routes>
  </div>
);
}

export default App
