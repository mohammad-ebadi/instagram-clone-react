import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layouts/pageLayout/PageLayout";
import ProfilePage from "./pages/profilePage/ProfilePage";
// import E from "./components/404/E";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
        <Route path="/:username" element={<ProfilePage></ProfilePage>}></Route>
        {/* <Route path="*" element={<E></E>}></Route> */}
      </Routes>
    </PageLayout>
  );
}

export default App;
