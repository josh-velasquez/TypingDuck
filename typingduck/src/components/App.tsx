import { BrowserRouter, Route, Routes } from "react-router-dom";
import TypeTestPage from "../pages/TypeTestPage";
import TypeSpeedPage from "../pages/TypeSpeedPage";
import NavigationBar from "./NavigationBar";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    <BrowserRouter basename="/TypingDuck">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/typing-speed" element={<TypeSpeedPage />} />
        <Route path="/typing-test" element={<TypeTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
