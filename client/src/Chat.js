import React, { useEffect, useState, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import Scrollbar from "react-scrollbars-custom";

function Chat() {
  const { userName, room, socket } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  const sendMessages = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        userName: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const backToLoginPage = () => {
    navigate(`/`);
  };

  return (
    <div className="chat-main-container">
      <div className="chat-window">
        <div className="chat-header">
          <p>Live chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messsageContents) => {
              return (
                <div
                  className="message"
                  id={userName === messsageContents.userName ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messsageContents.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messsageContents.time}</p>
                      <p id="author">{messsageContents.userName}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hi..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessages();
            }}
          />
          <button onClick={sendMessages}>&#9658;</button>
        </div>
        <div className="chat-backbutton-container">
          <button className="back-button" onClick={backToLoginPage}>
            Back to login page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
