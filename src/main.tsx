import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FilterContextProvider from "./contexts/FilterContextProvider.tsx";
import MovieItemsContextProvider from "./contexts/MovieItemsContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterContextProvider>
      <MovieItemsContextProvider>
        <App />
      </MovieItemsContextProvider>
    </FilterContextProvider>
  </StrictMode>
);
