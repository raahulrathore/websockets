import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  const sendMessage = () => {
    console.log("send message");
    socket.emit("message", { message: message });
  };
  useEffect(() => {
    sendMessage();
  }, [message]);

  useEffect(() => {
    socket.on("receive", (data) => {
      // console.log(data);
      setRecievedMessage(data.message);
    });
  }, []);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="app">
        <input placeholder="message" onInput={handleInput} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="message">
        <h3> {recievedMessage}</h3>
      </div>
    </>
  );
}

export default App;
