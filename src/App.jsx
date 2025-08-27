import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/register/register";
import Home from "./pages/home";
import Profile from "./pages/profile/profile";
import Detail from "./pages/detail/detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/:toolname" element={<Detail/>}/>
    </Routes>
  );
}

export default App;
