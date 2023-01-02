import "./App.css";
import io from "socket.io-client";
import { useState, createContext } from "react";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
export const UserContext = createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const socket = io.connect("http://localhost:3001");

  return (
    <div className="App">
      <UserContext.Provider
        value={{ userName, setUserName, room, setRoom, socket }}
      >
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Login />} />
            <Route path={`/chat`} element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
