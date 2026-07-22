import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Narrative from "./Narrative";
import "./index.css";

// sym-ui 는 .dark 클래스로 다크 토큰을 켠다. 단독 HTML 이므로 OS 설정을 따른다.
const mq = window.matchMedia("(prefers-color-scheme: dark)");
const apply = () => document.documentElement.classList.toggle("dark", mq.matches);
apply();
mq.addEventListener("change", apply);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Narrative />
  </StrictMode>,
);
