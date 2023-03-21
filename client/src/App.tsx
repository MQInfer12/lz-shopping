import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Home from "./pages/home";
import Login from "./pages/login";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Home />} path='/home' />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
