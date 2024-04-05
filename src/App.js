import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [clickedColourIndex, setClickedColourIndex] = useState(null);
  const [playing, setPlaying] = useState(false);

  const sounds = [
    {
      name: "boom",
      sound: require("./sounds/boom.wav"),
      key: "A",
    },
    {
      name: "clap",
      sound: require("./sounds/clap.wav"),
      key: "S",
    },
    {
      name: "hihat",
      sound: require("./sounds/hihat.wav"),
      key: "D",
    },
    {
      name: "kick",
      sound: require("./sounds/kick.wav"),
      key: "F",
    },
    {
      name: "openhat",
      sound: require("./sounds/openhat.wav"),
      key: "G",
    },
    {
      name: "ride",
      sound: require("./sounds/ride.wav"),
      key: "H",
    },
    {
      name: "snare",
      sound: require("./sounds/snare.wav"),
      key: "J",
    },
    {
      name: "tink",
      sound: require("./sounds/tink.wav"),
      key: "K",
    },
    {
      name: "tom",
      sound: require("./sounds/tom.wav"),
      key: "L",
    },
  ];

  const colors = [
    {
      normal: "A0153E",
      hit: "FF204E",
    },
    {
      normal: "FBCB0A",
      hit: "EBF400",
    },
    {
      normal: "00DFA2",
      hit: "16FF00",
    },
    {
      normal: "2192FF",
      hit: "31E1F7",
    },
    {
      normal: "612897",
      hit: "7900FF",
    },
    {
      normal: "F94C10",
      hit: "FF8400",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", colourClicked);

    return () => {
      window.removeEventListener("keydown", colourClicked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => {
    if (playing) return;

    setPlaying(true);

    const index = Math.floor(Math.random() * sounds.length);

    const randomSound = sounds[index];
    const audio = new Audio(randomSound.sound);

    audio.play();

    setTimeout(() => {
      setPlaying(false);
    }, 100);
  };

  const colourClicked = useCallback(
    (colourIndex) => {
      if (typeof colourIndex === "object") {
        colourIndex = Math.floor(Math.random() * colors.length);
      }

      setClickedColourIndex(colourIndex);
      play();

      setTimeout(() => {
        setClickedColourIndex(null);
      }, 100);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [play]
  );

  return (
    <div className="App">
      <div className="colours-wrapper">
        {colors.map((colour, i) => {
          return (
            <button
              key={i}
              className={`colour-button div${i}`}
              style={{
                backgroundColor:
                  clickedColourIndex === i
                    ? ` #${colour.hit}`
                    : ` #${colour.normal}`,
              }}
              onClick={() => colourClicked(i)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
