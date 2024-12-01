import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layouts/Navbar";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
