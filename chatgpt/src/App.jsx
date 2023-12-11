import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage("");
    setValue("");
  };
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(
        "http://localhost:8001/completions",
        options
      );
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: value },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const createNewChat = () => {
    setMessage("");
    setValue("");
    setCurrentTitle(null);
  };

  const currentChat = prevChats.filter(
    (prevChats) => prevChats.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(prevChats.map((prevChat) => prevChat.title))
  );
  return (
    <>
      <div className="app">
        <section className="side-bar">
          <button onClick={createNewChat}>+ new chat</button>
          <ul className="history">
            {uniqueTitles
              ? uniqueTitles.map((uniqueTitle, index) => (
                  <li key={index} onClick={() => handleClick(uniqueTitle)}>
                    {uniqueTitle}
                  </li>
                ))
              : null}
          </ul>
          <nav>
            <p>made by Karin</p>
          </nav>
        </section>
        <section className="main">
          {!currentTitle && <h1>karinGPT</h1>}
          <ul
            className={`feed ${currentChat.length === 0 ? "empty-feed" : ""}`}
          >
            {currentChat?.map((chatMessage, index) => {
              return (
                <li key={index}>
                  <p className="role">{chatMessage.role}</p>
                  <p>{chatMessage.message.content}</p>
                </li>
              );
            })}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <input value={value} onChange={(e) => setValue(e.target.value)} />
              <div id="submit" onClick={getMessages} disabled={!value.trim()}>
                submit
              </div>
            </div>
            <p className="info">lorem15</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
