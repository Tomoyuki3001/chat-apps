import React, { useEffect, useState } from "react";

function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data", data);
      console.log(
        "check list",
        setMessageList((list) => [...list, data])
      );
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messsageContents) => {
          return (
            <h2 key={messsageContents.message}>{messsageContents.message}</h2>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hi..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessages}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
