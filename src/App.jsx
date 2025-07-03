import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}></Route>
        {/* <Route path="/auth" element={<AuthPage></AuthPage>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
