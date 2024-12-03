import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layouts/Navbar";
import HomePage from "./components/HomePage";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<NewsFeed />} />
      </Routes>
    </div>
  );
}

export default App;
