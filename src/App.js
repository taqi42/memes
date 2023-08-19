import "./App.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function App() {
  const [memeTitle, setMemeTitle] = useState("");
  const [memeAuthor, setMemeAuthor] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [memeHistory, setMemeHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  function getMemes() {
    const API_URL = "https://meme-api.com/gimme";
    axios
      .get(API_URL)
      .then((response) => {
        const newMeme = {
          title: response.data.title,
          author: response.data.author,
          image: response.data.url,
        };

        setMemeTitle(newMeme.title);
        setMemeAuthor(newMeme.author);
        setMemeImage(newMeme.image);

        setMemeHistory((prevHistory) => [...prevHistory, newMeme]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function viewPreviousMeme() {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }

  function viewNextMeme() {
    if (currentIndex < memeHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      getMemes();
    }
  }

  useEffect(() => {
    if (currentIndex === -1) {
      getMemes();
    } else {
      setMemeTitle(memeHistory[currentIndex].title);
      setMemeAuthor(memeHistory[currentIndex].author);
      setMemeImage(memeHistory[currentIndex].image);
    }
  }, [currentIndex, memeHistory]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="title-author-container">
            <p>
              <small>
                <a
                  href={`https://www.reddit.com/user/${memeAuthor}`}
                  target="#"
                >
                  u/{memeAuthor}:
                </a>
              </small>{" "}
              {memeTitle}
            </p>
          </div>
          <div className="image-buttons-container">
            <div className="buttons-wrapper">
              <button id="change-meme" onClick={viewPreviousMeme}>
                <FaArrowLeft />
              </button>
              <img src={memeImage} alt="" />
              <button id="change-meme" onClick={viewNextMeme}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
