import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat-bot" element={<ChatBot />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
