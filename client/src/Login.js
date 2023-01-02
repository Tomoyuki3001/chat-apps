import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";

function Login() {
  const { userName, setUserName, room, setRoom, socket } =
    useContext(UserContext);
  const navigate = useNavigate();
  const joinRoom = () => {
    if (userName === "") {
      alert("Please type user name");
    }
    if (room === "") {
      alert("Please type room ID");
    }
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      navigate(`/chat`);
    }
  };
  return (
    <div className="join-main-container">
      <div className="joinChatContainer">
        <h3>Join a chat!!</h3>
        <div className="joinChat-input-container">
          <input
            type="text"
            placeholder="User name..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            className="joinChat-input"
          />
          <input
            type="text"
            placeholder="Room Id..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            className="joinChat-input"
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
