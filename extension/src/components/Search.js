import React from "react";
import { SettingsContext } from "../App";

export function Search() {
  const { settings } = React.useContext(SettingsContext);

  const [location, setLocation] = React.useState("");

  const urls = [
    "!npm use-listen-along",
    "!github punctuations",
    "!lhp 3000",
    "!tweet what is on my mind? 🤔",
    "cool website",
    "whats the weather like in...",
    "What's 1 + 1 again?",
    "!github alii/search",
    "!twitch retrora",
    "!twitch ludwig",
    "!amazon body pillow",
    "!github punctuations/newtab",
    "!spotify donda",
  ];

  const [placeholder] = React.useState(
    urls[Math.floor(Math.random() * urls.length)]
  );

  const isURL = (string) => {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  };

  function submit(e) {
    if (e.key === "Enter") {
      if (!isURL(location)) {
        // user is searching, location is not address.
        window.location.href = `https://search.balls.workers.dev/?q=${encodeURIComponent(
          location
        )}=${encodeURIComponent(settings.engine)}&ref=newtab`;
      } else {
        window.location.href = location;
      }
    }
  }

  return (
    <div className="z-20 flex flex-col">
      <label htmlFor="search">search</label>
      <div className="flex flex-row">
        <input
          autoFocus
          id="search"
          name="search"
          size={location.length > 35 ? (location.length > 55 ? 45 : 35) : 25}
          placeholder={placeholder}
          className="ml-2 focus:outline-none bg-transparent border-b border-black dark:border-white"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => submit(e)}
        />
        <button
          onClick={() => submit({ key: "Enter" })}
          className="text-2xl hover:ml-2 transition-all duration-500"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
