// import React, { useEffect, useState } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home.jsx";
// import AuthPage from "./pages/auth/AuthPage.jsx";
// import PageLayout from "./layouts/pageLayout/PageLayout.jsx";
// import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
// import { auth } from "./config/firebase.jsx";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);

  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

    
//     return () => unsubscribe();
//   }, []);
//   return (
//     <PageLayout>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             user ? <Home></Home> : <Navigate to="/auth" replace></Navigate>
//           }
//         ></Route>
//         <Route
//           path="/auth"
//           element={
//             !user ? <AuthPage></AuthPage> : <Navigate to="/" replace></Navigate>
//           }
//         ></Route>
//         <Route
//           path="/:username"
//           element={
//             user ? (
//               <ProfilePage></ProfilePage>
//             ) : (
//               <Navigate to="/auth" replace></Navigate>
//             )
//           }
//         ></Route>



//         {/* <Route path="/" element={<Home></Home>}></Route>
//         <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
//         <Route path="/:username" element={<ProfilePage></ProfilePage>}></Route> */}

//       </Routes>
//     </PageLayout>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import PageLayout from "./layouts/pageLayout/PageLayout.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import { auth } from "./config/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "./store/useAuthStore.js";

function App() {
  const { user, login, logout, isUserLoading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth(); // ✅ مرحله اول: بررسی لوکال‌استوریج
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          username: currentUser.displayName || "unknown",
          email: currentUser.email,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        };
        login(userData); // ✅ ذخیره در zustand + localStorage
      } else {
        logout(); // ✅ پاک‌سازی کامل
      }
    });

    return () => unsubscribe();
  }, []);

  if (isUserLoading) return <div>Loading...</div>; // ✅ فقط وقتی لود می‌شه

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/:username"
          element={user ? <ProfilePage /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </PageLayout>
  );
}

export default App;