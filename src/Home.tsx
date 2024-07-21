import { Button } from "primereact/button";
import "./Home.css";
import PhotoIcon from "./svg/photo.svg?react";
import { Page } from "./App";

interface HomePros {
  setPage(page: Page): void;
}

export function Home(props: HomePros) {
  return (
    <div className="homeContainer">
      <div className="svgContainer">
        <PhotoIcon />
      </div>
      <h1>Photo Upload App</h1>
      <p>
        Welcome to the <b>Photo Upload App</b> to start with choose one of the
        following options:
      </p>
      <Button
        label="View Gallery"
        outlined
        onClick={() => props.setPage("gallery")}
      />
      <Button
        label="Upload Photos"
        outlined
        onClick={() => props.setPage("upload")}
      />
    </div>
  );
}
