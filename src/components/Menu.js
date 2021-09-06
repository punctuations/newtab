import React from "react";
import { CheckContext, SettingsContext } from "../App";

export function Menu() {
  const { checks, setChecks } = React.useContext(CheckContext);
  const { settings, setSettings } = React.useContext(SettingsContext);

  const [checkName, setCheckName] = React.useState(null);

  function createCheck(event) {
    if (event.key === "Enter" && checkName) {
      checks.data.push({
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

  return (
    <>
      {settings.visible && (
        <>
          <div
            onClick={() =>
              setSettings({
                visible: false,
                background: settings.background,
                quotes: settings.quotes,
                theme: settings.theme,
              })
            }
            className="z-10 absolute opacity-20 dark:opacity-50 bg-black w-full h-full"
          />

          <div className="-translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-black absolute top-1/2 left-1/2 flex flex-col items-start space-y-4 shadow-3xl dark:shadow-none dark:border border-gray-700 rounded-md px-5 py-6">
            <div className="flex w-full justify-between">
              <p className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-bold">
                Settings
              </p>
              <button
                onClick={() =>
                  setSettings({
                    visible: false,
                    background: settings.background,
                    quotes: settings.quotes,
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
                  placeholder="URL"
                  className="ml-2 focus:outline-none bg-transparent border-b border-black dark:border-white"
                />
                <button className="p-2 rounded bg-gray-200 dark:bg-gray-800">
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
                <p>quotes</p>
                {settings.quotes ? (
                  <button
                    onClick={() =>
                      setSettings({
                        visible: settings.visible,
                        background: settings.background,
                        quotes: false,
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
                        background: settings.background,
                        quotes: true,
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
              <div className="flex items-center justify-between">
                <p>theme</p>{" "}
                {settings.theme === "dark" ? (
                  <button
                    onClick={() =>
                      setSettings({
                        visible: settings.visible,
                        background: settings.background,
                        quotes: settings.quotes,
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
                        background: settings.background,
                        quotes: settings.quotes,
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
        </>
      )}
      {checks.visible && (
        <>
          <div
            onClick={() => setChecks({ visible: false, data: checks.data })}
            className="z-10 absolute opacity-50 bg-black w-full h-full"
          />

          <div className="z-20 bg-white dark:bg-black absolute top-3/4 left-24 flex flex-col space-y-1 items-start shadow-3xl dark:shadow-none dark:border border-gray-700 rounded-md px-5 py-6">
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
          </div>
        </>
      )}
    </>
  );
}

export function Settings() {
  const { settings, setSettings } = React.useContext(SettingsContext);

  return (
    <button
      onClick={() =>
        setSettings({
          visible: true,
          background: settings.background,
          quotes: settings.quotes,
          theme: settings.theme,
        })
      }
      className="p-2 text-gray-400 rounded-md w-12 bg-gray-200 dark:bg-gray-800 backdrop-blur-xl backdrop-hue-rotate-60 flex items-center justify-center transition-transform duration-500 hover:scale-110 bg-opacity-60"
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
