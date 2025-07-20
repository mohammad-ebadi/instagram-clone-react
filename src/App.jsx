import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layouts/pageLayout/PageLayout";
import ProfilePage from "./pages/profilePage/ProfilePage";
// import WrongRoute from "./pages/404/wrongRoute";
import { auth } from "./.config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Home></Home> : <Navigate to="/auth" replace></Navigate>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            !user ? <AuthPage></AuthPage> : <Navigate to="/" replace></Navigate>
          }
        ></Route>
        <Route
          path="/:username"
          element={
            user ? (
              <ProfilePage></ProfilePage>
            ) : (
              <Navigate to="/auth" replace></Navigate>
            )
          }
        ></Route>
        {/* <Route path="*" element={<WrongRoute></WrongRoute>}></Route> */}
      </Routes>
    </PageLayout>
  );
}

export default App;
