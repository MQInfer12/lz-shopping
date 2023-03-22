import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Login from "./pages/login";
import User from "./pages/user";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Index />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<User />} path='/user' />
        </Route>
        <Route element={<Home />} path='/home' />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
