import React from "react";
import { CheckContext } from "../App";

export function Menu() {
  const { checkVisibility, setCheckVisibility } =
    React.useContext(CheckContext);

  const [checkName, setCheckName] = React.useState(null);
  const [checks] = React.useState(JSON.parse(localStorage.getItem("checks")));

  function createCheck(event) {
    if (event.key === "Enter" && checkName) {
      checks.push({
        name:
          checkName.length > 86
            ? `${checkName.substring(0, 120)}...`
            : checkName,
        completed: false,
      });

      localStorage.setItem("checks", JSON.stringify(checks));

      setCheckVisibility(false);
    }
  }

  return (
    <>
      {checkVisibility && (
        <>
          <div
            onClick={() => setCheckVisibility(false)}
            className="z-10 absolute opacity-50 bg-black w-full h-full"
          />

          <div className="z-20 bg-black absolute top-3/4 left-24 flex items-center justify-center space-x-3 border border-gray-700 backdrop-blur-3xl rounded-md px-5 py-6">
            <input
              name="create"
              className="ml-2 focus:outline-none bg-transparent border-b border-white"
              onChange={(e) => setCheckName(e.target.value)}
              onKeyDown={(e) => createCheck(e)}
            />
            <button
              onClick={() => createCheck({ key: "Enter" })}
              className="p-1 rounded-md bg-gray-800 hover:bg-gray-900 transition-colors duration-200"
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
        </>
      )}
    </>
  );
}
