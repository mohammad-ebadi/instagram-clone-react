import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layouts/pageLayout/PageLayout";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
