import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";

// Providers
import AuthProvider from "./FirebaseAuth/AuthProvider.jsx";
import ThemeProvider from "./Contexts/ThemeProvider.jsx";

// Router
import router from "./Router/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
