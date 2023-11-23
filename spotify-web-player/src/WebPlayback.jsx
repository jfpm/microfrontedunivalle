import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/*function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "web-player",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 1,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        //document.body.style.backgroundColor = getRandomColor();
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });

        const color = getRandomColor();
        document.body.style.backgroundColor = color;
        const btns = document.querySelectorAll(".btn-spotify");
        btns.forEach((element) => {
          element.style.backgroundColor = color;
        });
      });

      /*player.addListener('track_changed', ( track => {
                console.log('Track changed:', track);
                document.body.style.backgroundColor = getRandomColor();
            }));*/

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper now-playing__side">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>
              <div className="now-playing__album">
                {current_track.album.name}
              </div>

              <div className="playing__controls">
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack();
                  }}
                >
                  <FontAwesomeIcon icon={faBackward} />
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  <FontAwesomeIcon icon={is_paused ? faPlay : faPause} />
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
                  }}
                >
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;
