import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/ui/provider.jsx";
// import { ChakraProvider } from "@chakra-ui/react";
// import { Provider } from "@/components/ui/provider"
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
