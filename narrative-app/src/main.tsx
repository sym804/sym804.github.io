import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Narrative from "./Narrative";
import "./index.css";

// 포트폴리오의 다른 산출물이 전부 다크다. OS 설정을 따르면 문서마다
// 배경이 달라져 한 묶음으로 안 읽힌다. 다크로 고정한다.
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Narrative />
  </StrictMode>,
);
