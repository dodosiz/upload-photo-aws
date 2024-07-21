import { useState } from "react";
import { Home } from "./Home";
import { Upload } from "./Upload";
import { SubpageWrapper } from "./SubpageWrapper";
import { Gallery } from "./Gallery";

export type Page = "home" | "gallery" | "upload";

export function App() {
  const [page, setPage] = useState<Page>("home");
  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "gallery" && (
        <SubpageWrapper setPage={setPage}>
          <Gallery />
        </SubpageWrapper>
      )}
      {page === "upload" && (
        <SubpageWrapper setPage={setPage}>
          <Upload />
        </SubpageWrapper>
      )}
    </>
  );
}
