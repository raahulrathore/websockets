import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => {
    // console.log("send message");
    socket.emit("message", { message: message });
  };
  useEffect(() => {
    sendMessage();
  }, [message]);

  useEffect(() => {
    socket.on("receive", (data) => {
      console.log(data);
      setRecievedMessage(data.message);
    });
  }, []);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };
  return (
    <>
      <div className="room">
        <input
          placeholder="room_id"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      <div className="app">
        <input placeholder="message" onInput={handleInput} />
        {/* <button>Send</button> */}
      </div>
      <div className="message">
        <h3> {recievedMessage}</h3>
      </div>
    </>
  );
}

export default App;
