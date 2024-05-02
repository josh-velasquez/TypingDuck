import { HashRouter, Route, Routes } from "react-router-dom";
import TypeTestPage from "../pages/TypeTestPage";
import TypeSpeedPage from "../pages/TypeSpeedPage";
import NavigationBar from "./NavigationBar";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    // NOTE: we have to use HashRouter since BrowserRouter does not work with GitHub Pages
    <HashRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/typing-speed" element={<TypeSpeedPage />} />
        <Route path="/typing-test" element={<TypeTestPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
