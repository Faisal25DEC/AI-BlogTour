import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create/Create";
import View from "./pages/View/View";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

import ProfileUser from "./pages/ProfileUser/ProfileUser";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog/:id" element={<View />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
      </Routes>
    </div>
  );
}

export default App;
