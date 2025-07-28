// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem("user-Info")),
//   login: (user) => set({ user }),
//   logout: () => set({ user: null }),
//   setUser: (user) => set({ user }),
// }));

// export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isUserLoading: true, // ✅ مرحله ۱: اضافه کردن فلگ لودینگ

  login: (user) => {
    localStorage.setItem("user-Info", JSON.stringify(user));
    set({ user, isUserLoading: false });
  },

  logout: () => {
    localStorage.removeItem("user-Info");
    set({ user: null, isUserLoading: false });
  },

  setUser: (user) => {
    set({ user, isUserLoading: false });
  },

  initAuth: () => {
    const storedUser = localStorage.getItem("user-Info");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isUserLoading: false });
    } else {
      set({ user: null, isUserLoading: false });
    }
  },
}));

export default useAuthStore;