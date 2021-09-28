import { motion } from "framer-motion";
import "./App.css";
import React from "react";
import { useKeyPress } from "ahooks";
import { Helmet } from "react-helmet";

import { Search } from "./components/Search";
import { Quotes } from "./components/Quotes";
import { Greeting } from "./components/Greeting";
import { Checklist } from "./components/Checklist";
import { Menu, Settings } from "./components/Menu";
import { Time } from "./components/Time";

export const CheckContext = React.createContext({
  checks: {
    visible: false,
    data: [{ default: true, name: "My Todo!", completed: false }],
  },
  setChecks: () => {},
});

export const SettingsContext = React.createContext({
  settings: {
    visible: false,
    engine: "https://duckduckgo.com?q={q}",
    background: null,
    time: false,
    quotes: true,
    blur: true,
    theme: "dark",
  },
  setSettings: () => {},
});

function App() {
  const [checks, setChecks] = React.useState({
    visible: false,
    data: checkLoad(),
  });

  function checkLoad() {
    if (localStorage.getItem("checks")) {
      return JSON.parse(localStorage.getItem("checks"));
    } else {
      return [{ name: "My Todo!", completed: false }];
    }
  }

  function themeLoad() {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    } else {
      return "dark";
    }
  }

  function quoteLoad() {
    return JSON.parse(localStorage.getItem("quotes"));
  }

  function bgLoad() {
    return localStorage.getItem("bg");
  }

  function blurLoad() {
    return JSON.parse(localStorage.getItem("blur"));
  }

  function timeLoad() {
    return JSON.parse(localStorage.getItem("time"));
  }

  function engineLoad() {
    if (localStorage.getItem("engine")) {
      return localStorage.getItem("engine");
    } else {
      return "https://duckduckgo.com?q={q}";
    }
  }

  const [settings, setSettings] = React.useState({
    visible: false,
    engine: engineLoad(),
    background: bgLoad(),
    time: timeLoad(),
    quotes: quoteLoad(),
    blur: blurLoad(),
    theme: themeLoad(),
  });

  React.useEffect(() => {
    if (settings.theme) {
      document.documentElement.classList = settings.theme;
      localStorage.setItem("theme", settings.theme);
    }
  }, [settings.theme]);

  React.useEffect(() => {
    localStorage.setItem("quotes", settings.quotes);
  }, [settings.quotes]);

  React.useEffect(() => {
    localStorage.setItem("blur", settings.blur);
  }, [settings.blur]);

  React.useEffect(() => {
    localStorage.setItem("time", settings.time);
  }, [settings.time]);

  React.useEffect(() => {
    localStorage.setItem("engine", settings.engine);
  }, [settings.engine]);

  const val = React.useMemo(() => ({ settings, setSettings }), [settings]);

  const value = React.useMemo(() => ({ checks, setChecks }), [checks]);

  useKeyPress("ESCAPE", () => {
    if (document.activeElement.tagName.toLowerCase() !== "input")
      if (!checks.visible) {
        setSettings({
          visible: !settings.visible,
          engine: settings.engine,
          background: settings.background,
          time: settings.time,
          quotes: settings.quotes,
          blur: settings.blur,
          theme: settings.theme,
        });
      } else {
        setChecks({
          visible: !checks.visible,
          data: checks.data,
        });
      }
  });

  useKeyPress("C", () => {
    if (document.activeElement.tagName.toLowerCase() !== "input")
      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: settings.background,
        time: !settings.time,
        quotes: settings.quotes,
        blur: settings.blur,
        theme: settings.theme,
      });
  });

  useKeyPress("Q", () => {
    if (document.activeElement.tagName.toLowerCase() !== "input")
      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: settings.background,
        time: settings.time,
        quotes: !settings.quotes,
        blur: settings.blur,
        theme: settings.theme,
      });
  });

  useKeyPress("B", () => {
    if (document.activeElement.tagName.toLowerCase() !== "input")
      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: settings.background,
        time: settings.time,
        quotes: settings.quotes,
        blur: !settings.blur,
        theme: settings.theme,
      });
  });

  useKeyPress("T", () => {
    if (document.activeElement.tagName.toLowerCase() !== "input")
      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: settings.background,
        time: settings.time,
        quotes: settings.quotes,
        blur: settings.blur,
        theme: settings.theme === "light" ? "dark" : "light",
      });
  });

  return (
    <div
      style={{ backgroundImage: `url(${settings.background})` }}
      className="bg-cover absolute flex bg-white dark:bg-black dark:text-white h-full w-full transition-colors duration-300"
    >
      <Helmet>
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2f3136" />
        <title>New → Tab</title>
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta
          name="description"
          content="An uber-customizable new tab experience."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@atmattt" />
        <meta name="twitter:creator" content="@atmattt" />
        <meta property="og:url" content="https://newtab.vc/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="New → Tab" />
        <meta
          property="og:description"
          content="An uber-customizable new tab experience."
        />
        <meta property="og:image" content="/img.png" />
        <meta property="og:image:width" content="1224" />
        <meta property="og:image:height" content="719" />
      </Helmet>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute w-full"
      >
        <div className="flex justify-between w-full px-5 mt-5">
          <SettingsContext.Provider value={val}>
            <Time />
          </SettingsContext.Provider>
          <a
            href="https://github.com/punctuations/newtab"
            className="hover:underline"
          >
            New &rarr; Tab
          </a>
          <SettingsContext.Provider value={val}>
            <Settings />
          </SettingsContext.Provider>
        </div>
      </motion.header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="w-full h-full flex flex-col items-center justify-center space-y-12"
      >
        <SettingsContext.Provider value={val}>
          <Search />
        </SettingsContext.Provider>
        <SettingsContext.Provider value={val}>
          {settings.quotes && <Quotes />}
        </SettingsContext.Provider>
      </motion.main>
      <SettingsContext.Provider value={val}>
        <CheckContext.Provider value={value}>
          <Menu />
        </CheckContext.Provider>
      </SettingsContext.Provider>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute w-full bottom-5"
      >
        <div className="flex justify-between items-end w-full px-5">
          <CheckContext.Provider value={value}>
            <Checklist />
          </CheckContext.Provider>
          <Greeting />
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
