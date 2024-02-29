import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./PublicRoutes";
import Login from "../Containers/Public/Login";
import Register from "../Containers/Public/Register";
import PrivateRouter from "./PrivateRoutes";
import DashBoard from "./DashboardRoutes";
import { app } from "../FireBase/Firebase";

function App() {

  const [user, setuser] = useState(false);
  
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth?.uid) {
        setuser(true);
      } else setuser(false);
    });
  }, [setuser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter isAutentication={user}>
              <Login />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter isAutentication={user}>
              <Register />
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter isAutentication={user}>
              <DashBoard />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
