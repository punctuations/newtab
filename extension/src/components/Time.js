import React from "react";
import { SettingsContext } from "../App";

export function Time() {
  const { settings } = React.useContext(SettingsContext);

  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [browser, setBrowser] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 500);

    return () => clearInterval(interval);
  }, [time]);

  React.useEffect(() => {
    setBrowser(true);
  }, []);

  return (
    <>
      {browser ? (
        settings.time ? (
          <p className="transition-all duration-500 text-shadow-none">{time}</p>
        ) : (
          <p className="transition-all duration-500 text-shadow-blur dark:text-shadow-blur-dark hover:text-shadow-none text-transparent dark:hover:text-white hover:text-black">
            {time}
          </p>
        )
      ) : (
        <p className="transition-all duration-500 text-shadow-blur dark:text-shadow-blur-dark hover:text-shadow-none text-transparent dark:hover:text-white hover:text-black">
          {time}
        </p>
      )}
    </>
  );
}
