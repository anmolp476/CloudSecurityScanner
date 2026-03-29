import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      </Routes>
    </>
  );
}

export default App;
