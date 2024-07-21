import React from "react";
import ReactDOM from "react-dom/client";
import { Upload } from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Upload />
    </PrimeReactProvider>
  </React.StrictMode>
);
