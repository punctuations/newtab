import { motion } from "framer-motion";
import "./App.css";
import React from "react";
import { Search } from "./components/Search";
import { Quotes } from "./components/Quotes";
import { Greeting } from "./components/Greeting";
import { Checklist } from "./components/Checklist";

function App() {
  const [quotes, setQuotes] = React.useState(true);

  React.useEffect(() => {
    const getQuotes = setInterval(() => {
      if (localStorage.getItem("quotes")) {
        setQuotes(parseInt(localStorage.getItem("quotes")) === 0);
      }
    }, 200);

    return () => clearInterval(getQuotes);
  });

  return (
    <div className="absolute flex bg-black text-white h-full w-full">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute flex justify-between w-11/12 top-5 left-12"
      >
        <p className="transition-all duration-500 text-shadow-blur hover:text-shadow-none text-transparent hover:text-white">
          18°C
        </p>
        <h3>New &rarr; Tab</h3>
      </motion.header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="w-full h-full flex flex-col items-center justify-center space-y-12"
      >
        <Search />
        {quotes && <Quotes />}
      </motion.main>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute flex justify-between items-end w-11/12 bottom-5 left-12"
      >
        <Checklist />
        <Greeting />
      </motion.footer>
    </div>
  );
}

export default App;
