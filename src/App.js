import { motion } from "framer-motion";
import "./App.css";
import React from "react";
import { Search } from "./components/Search";
import { Quotes } from "./components/Quotes";
import { Greeting } from "./components/Greeting";
import { Checklist } from "./components/Checklist";
import { Menu, Settings } from "./components/Menu";

export const CheckContext = React.createContext({
  checks: { visible: false, data: [{ name: "My Todo!", completed: false }] },
  setChecks: () => {},
});

export const SettingsContext = React.createContext({
  settings: {
    visible: false,
    background: null,
    quotes: true,
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
    return localStorage.getItem("quotes") !== null;
  }

  const [settings, setSettings] = React.useState({
    visible: false,
    background: null,
    quotes: quoteLoad(),
    theme: themeLoad(),
  });

  React.useEffect(() => {
    if (settings.theme) {
      document.documentElement.classList = settings.theme;
      localStorage.setItem("theme", settings.theme);
    }
  }, [settings.theme]);

  React.useEffect(() => {
    if (settings.quotes) localStorage.setItem("quotes", settings.quotes);
  }, [settings.quotes]);

  const val = React.useMemo(() => ({ settings, setSettings }), [settings]);

  const value = React.useMemo(() => ({ checks, setChecks }), [checks]);

  return (
    <div className="absolute flex bg-white dark:bg-black dark:text-white h-full w-full transition-colors duration-300">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute flex justify-between w-11/12 top-5 left-12"
      >
        <p className="transition-all duration-500 text-shadow-blur dark:text-shadow-blur-dark hover:text-shadow-none text-transparent dark:hover:text-white hover:text-black">
          18°C
        </p>
        <h3>New &rarr; Tab</h3>
        <SettingsContext.Provider value={val}>
          <Settings />
        </SettingsContext.Provider>
      </motion.header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="w-full h-full flex flex-col items-center justify-center space-y-12"
      >
        <Search />
        {settings.quotes && <Quotes />}
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
        className="absolute flex justify-between items-end w-11/12 bottom-5 left-12"
      >
        <CheckContext.Provider value={value}>
          <Checklist />
        </CheckContext.Provider>
        <Greeting />
      </motion.footer>
    </div>
  );
}

export default App;
