import React from "react";
import { SettingsContext } from "../App";
import axios from "axios";

export function Temp() {
  const { settings } = React.useContext(SettingsContext);

  if (settings.temp) {
    axios.get();
  }

  return (
    <>
      {settings.temp ? (
        <p>18°C</p>
      ) : (
        <p className="transition-all duration-500 text-shadow-blur dark:text-shadow-blur-dark hover:text-shadow-none text-transparent dark:hover:text-white hover:text-black">
          18°C
        </p>
      )}
    </>
  );
}
