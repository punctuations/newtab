import React from "react";
import { CheckContext } from "../App";

export function Checklist() {
  const { checks, setChecks } = React.useContext(CheckContext);

  function updateStorage(local) {
    const t = checks.data;
    t[local.index].completed = true;

    setChecks({ visible: checks.visible, data: t });

    setTimeout(() => {
      deleteCheck({ index: local.index });
    }, 1000);
  }
  function deleteCheck(check) {
    const t = checks.data;

    t.splice(check.index, 1);

    setChecks({ visible: checks.visible, data: t });

    localStorage.setItem("checks", JSON.stringify(t));
  }

  return (
    <div className="flex space-x-4 items-end justify-start">
      <div className="flex flex-col space-y-3 mb-10">
        {checks.data.map((c, i) => {
          return (
            <div
              key={`${c.name} #${i}`}
              className={`${
                c.default && "blur hover:blur-none transition-all duration-500"
              } flex items-center`}
            >
              {c.completed ? (
                <input
                  name={c.name}
                  type="checkbox"
                  checked
                  onChange={(e) =>
                    updateStorage({
                      completed: e.target.value,
                      index: i,
                    })
                  }
                  className="appearance-none form-checkbox h-4 w-4 checked:text-black focus:text-black hover:text-black checked:ring-2 ring-white checked:border-transparent focus:border-transparent border rounded"
                />
              ) : (
                <input
                  name={c.name}
                  type="checkbox"
                  onChange={(e) =>
                    updateStorage({
                      completed: e.target.value,
                      index: i,
                    })
                  }
                  className="appearance-none form-checkbox h-4 w-4 text-white focus:ring-0 checked:border-transparent focus:border-transparent rounded"
                />
              )}

              {c.completed ? (
                <label
                  htmlFor={c.name}
                  className="relative inline-block ml-2 block text-sm"
                >
                  <span className="absolute inline-block top-1/2 border-t border-black dark:border-white animate-strikethrough" />
                  {c.name}
                </label>
              ) : (
                <label htmlFor={c.name} className="ml-2 block text-sm">
                  {c.name}
                </label>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setChecks({ visible: true, data: checks.data })}
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
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
}
