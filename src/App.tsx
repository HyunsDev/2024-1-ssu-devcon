import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { MainRouter } from "./pages/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
