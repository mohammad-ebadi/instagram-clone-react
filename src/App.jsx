import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layouts/pageLayout/PageLayout";
import ProfilePage from "./pages/profilePage/ProfilePage";
import WrongRoute from "./pages/404/wrongRoute";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
        <Route path="/:username" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="*" element={<WrongRoute></WrongRoute>}></Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
