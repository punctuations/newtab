import React from "react";
import { CheckContext, SettingsContext } from "../pages/tab";
import { AnimatePresence, motion } from "framer-motion";

export function Menu() {
  const { checks, setChecks } = React.useContext(CheckContext);
  const { settings, setSettings } = React.useContext(SettingsContext);

  const [checkName, setCheckName] = React.useState("");
  const [bg, setBG] = React.useState<string | null>(null);

  function createCheck(event: { key: string }) {
    if (event.key === "Enter" && checkName !== "") {
      checks.data.push({
        default: false,
        name:
          checkName.length > 86
            ? `${checkName.substring(0, 120)}...`
            : checkName,
        completed: false,
      });

      localStorage.setItem("checks", JSON.stringify(checks.data));

      setChecks({ visible: false, data: checks.data });
    }
  }

  function handleBG(e: { key: string }) {
    if (e.key === "Enter") {
      localStorage.setItem("bg", (bg as unknown) as string);

      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: bg,
        time: settings.time,
        quotes: settings.quotes,
        blur: settings.blur,
        theme: settings.theme,
      });
    }
  }

  return (
    <AnimatePresence initial={false}>
      {settings.visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: settings.theme === "dark" ? 0.5 : 0.2 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSettings({
                visible: false,
                engine: settings.engine,
                background: settings.background,
                time: settings.time,
                quotes: settings.quotes,
                blur: settings.blur,
                theme: settings.theme,
              })
            }
            className="z-30 absolute bg-black w-full h-full"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="z-40 bg-white dark:bg-black absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 flex flex-col items-start space-y-4 shadow-2xl dark:shadow-none dark:border border-gray-700 rounded-md px-5 py-6"
          >
            <div className="flex w-full justify-between">
              <p className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-bold">
                Settings
              </p>
              <button
                onClick={() =>
                  setSettings({
                    visible: false,
                    engine: settings.engine,
                    background: settings.background,
                    time: settings.time,
                    quotes: settings.quotes,
                    blur: settings.blur,
                    theme: settings.theme,
                  })
                }
                className="text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr className="border-gray-700 w-full" />
            <div className="py-4 flex flex-col space-y-3">
              <div className="flex items-center justify-center space-x-4">
                <p>background image</p>
                <input
                  onChange={(e) => setBG(e.target.value)}
                  onKeyDown={(e) => handleBG(e)}
                  placeholder="URL"
                  className="ml-2 focus:outline-none bg-transparent border-b border-black dark:border-white"
                />
                <button
                  onClick={() => handleBG({ key: "Enter" })}
                  className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p>search engine</p>
                <select
                  id="links"
                  name="links"
                  onChange={(e) =>
                    setSettings({
                      visible: settings.visible,
                      engine: e.target.value,
                      background: settings.background,
                      time: settings.time,
                      quotes: settings.quotes,
                      blur: settings.blur,
                      theme: settings.theme,
                    })
                  }
                  className="duration-150 transition-colors dark:bg-black bg-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white block py-1 sm:text-sm border border-gray-400 rounded-md"
                >
                  <option
                    selected={
                      settings.engine === "https://google.com/search?q={q}"
                    }
                    key="google"
                    value="https://google.com/search?q={q}"
                  >
                    google
                  </option>
                  <option
                    selected={
                      settings.engine === "https://duckduckgo.com?q={q}"
                    }
                    key="duckduckgo"
                    value="https://duckduckgo.com?q={q}"
                  >
                    duckduckgo
                  </option>
                  <option
                    selected={
                      settings.engine === "https://www.ecosia.org/search?q={q}"
                    }
                    key="ecosia"
                    value="https://www.ecosia.org/search?q={q}"
                  >
                    ecosia
                  </option>
                  <option
                    selected={
                      settings.engine === "https://www.bing.com/search?q={q}"
                    }
                    key="bing"
                    value="https://www.bing.com/search?q={q}"
                  >
                    bing
                  </option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <p>time</p>
                <div className="flex space-x-4 justify-center items-center">
                  <kbd className="py-1 w-8 text-center rounded bg-gray-200 dark:bg-gray-800 text-gray-400">
                    C
                  </kbd>
                  {settings.time ? (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: false,
                          quotes: settings.quotes,
                          blur: settings.blur,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: true,
                          quotes: settings.quotes,
                          blur: settings.blur,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>quotes</p>
                <div className="flex space-x-4 justify-center items-center">
                  <kbd className="py-1 w-8 text-center rounded bg-gray-200 dark:bg-gray-800 text-gray-400">
                    Q
                  </kbd>
                  {settings.quotes ? (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: false,
                          blur: settings.blur,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: true,
                          blur: settings.blur,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>blur quotes</p>
                <div className="flex space-x-4 justify-center items-center">
                  <kbd className="py-1 w-8 text-center rounded bg-gray-200 dark:bg-gray-800 text-gray-400">
                    B
                  </kbd>
                  {settings.blur ? (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: settings.quotes,
                          blur: false,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: settings.quotes,
                          blur: true,
                          theme: settings.theme,
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>theme</p>{" "}
                <div className="flex space-x-4 justify-center items-center">
                  <kbd className="py-1 w-8 text-center rounded bg-gray-200 dark:bg-gray-800 text-gray-400">
                    T
                  </kbd>
                  {settings.theme === "dark" ? (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: settings.quotes,
                          blur: settings.blur,
                          theme: "light",
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setSettings({
                          visible: settings.visible,
                          engine: settings.engine,
                          background: settings.background,
                          time: settings.time,
                          quotes: settings.quotes,
                          blur: settings.blur,
                          theme: "dark",
                        })
                      }
                      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {checks.visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: settings.theme === "dark" ? 0.5 : 0.2 }}
            exit={{ opacity: 0 }}
            onClick={() => setChecks({ visible: false, data: checks.data })}
            className="z-30 absolute opacity-50 bg-black w-full h-full"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="z-40 bg-white dark:bg-black absolute top-3/4 left-24 flex flex-col space-y-1 items-start shadow-2xl dark:shadow-none dark:border border-gray-700 rounded-md px-5 py-6"
          >
            <p className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-bold">
              Create New
            </p>
            <div className="flex space-x-3">
              <input
                name="create"
                className="ml-2 focus:outline-none bg-transparent border-b border-black dark:border-white"
                onChange={(e) => setCheckName(e.target.value)}
                onKeyDown={(e) => createCheck(e)}
              />
              <button
                onClick={() => createCheck({ key: "Enter" })}
                className="p-1 rounded-md bg-gray-200 dark:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Settings() {
  const { settings, setSettings } = React.useContext(SettingsContext);

  return (
    <button
      onClick={() =>
        setSettings({
          visible: true,
          engine: settings.engine,
          background: settings.background,
          time: settings.time,
          quotes: settings.quotes,
          blur: settings.blur,
          theme: settings.theme,
        })
      }
      className="p-2 rounded-md transition-colors duration-500 border dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-500 dark:hover:text-white hover:text-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  );
}
