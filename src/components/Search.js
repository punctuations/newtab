import React from "react";

export function Search() {
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

  function submit(e) {
    if (e.key === "Enter") {
      window.location.href = `https://search.balls.workers.dev/?q=${encodeURIComponent(
        location
      )}&engine=${encodeURIComponent(
        "https://duckduckgo.com/?q={q}"
      )}&ref=newtab`;
    }
  }

  return (
    <div className="z-20 flex flex-col">
      <label htmlFor="search">search</label>
      <div className="flex flex-row">
        <input
          id="search"
          name="search"
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
