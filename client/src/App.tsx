import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Login from "./pages/login";
import ProtectedRoute from "./components/wrappers/protectedRoute";
/* import User from "./pages/user";
import Reserve from "./pages/reserve"; */

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Index />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            path="/home"
          />
          {/* <Route element={<User />} path='/user' /> */}
          {/* <Route element={<Reserve />} path='/reserve/:idProduct/:quantity/:ci' />
          <Route element={<ProtectedRoute><Home /></ProtectedRoute>} path='/home/:idProduct/:quantity/:ci' /> */}
          <Route element={<Index />} path="/view/:idProduct" />
          <Route element={<Index />} path="/*" />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
