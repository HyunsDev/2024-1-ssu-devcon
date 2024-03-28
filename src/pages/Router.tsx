import { Route, Routes } from "react-router-dom";
import { MainPage } from "./main/main.page";
import { CanvasInReactPage } from "./canvas-in-react/page";
import { CanvasAnimationPage } from "./animation/page";
import { CursorPage } from "./cursor/page";
import { ScreenSizePage } from "./screen-size/page";
import { BackgroundPage } from "./background/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/canvas-in-react" element={<CanvasInReactPage />} />
      <Route path="/canvas-animation" element={<CanvasAnimationPage />} />
      <Route path="/cursor" element={<CursorPage />} />
      <Route path="/screen-size" element={<ScreenSizePage />} />
      <Route path="/background" element={<BackgroundPage />} />
    </Routes>
  );
}
