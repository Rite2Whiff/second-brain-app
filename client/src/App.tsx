import "./App.css";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/ui/Home";
import Dashboard from "./components/ui/Dashboard";
import Signup from "./components/ui/Signup";
import Login from "./components/ui/Login";

function App() {
  return (
    <main className="min-h-screen">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </main>
  );
}

export default App;
