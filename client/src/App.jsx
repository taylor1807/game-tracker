import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import NewPostPage from "./pages/NewPostPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  // console.log("app render successsful")
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
