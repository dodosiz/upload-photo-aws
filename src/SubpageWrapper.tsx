import { ReactNode, useEffect } from "react";
import { Page } from "./App";
import "./SubpageWrapper.css";
import { Button } from "primereact/button";

interface SubpageWrapperProps {
  children: ReactNode;
  setPage(page: Page): void;
}

export function SubpageWrapper(props: SubpageWrapperProps) {
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.pathname);
      props.setPage("home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <>
      <div className="goBack">
        <Button label="Home" link onClick={() => props.setPage("home")} />
      </div>
      <div className="subPage">{props.children}</div>
    </>
  );
}
