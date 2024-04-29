import { BrowserRouter, Route, Routes } from "react-router-dom";
import TypeTestPage from "../pages/TypeTestPage";
import TypeSpeedPage from "../pages/TypeSpeedPage";
import NavigationBar from "./NavigationBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/typing-speed" element={<TypeSpeedPage />} />
        <Route path="/typing-test" element={<TypeTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
