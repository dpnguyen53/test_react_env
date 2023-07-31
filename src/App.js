import "./App.css";
import { Routes, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { actTryLogin } from "pages/AdminTemplate/AuthPage/duck/actions";
import { useDispatch } from "react-redux";
import renderRoutes from "./routes";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //dispatch actTryLogin
    dispatch(actTryLogin(navigate));
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{renderRoutes()}</Routes>
    </Suspense>
  );
}

export default App;
