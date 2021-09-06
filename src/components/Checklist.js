import React from "react";

export function Checklist() {
  const [checks, setChecks] = React.useState([
    { name: "Todo", completed: "0" },
  ]);

  React.useEffect(() => {
    const getChecks = setInterval(() => {
      if (localStorage.getItem("checks")) {
        setChecks(JSON.parse(localStorage.getItem("checks")));
      }
    }, 200);

    return () => clearInterval(getChecks);
  });

  function updateStorage(local) {
    checks[local.index].completed = local.completed;

    localStorage.setItem("checks", JSON.stringify(checks));
  }

  return (
    <div className="flex flex-col space-y-3">
      {checks.map((c, i) => {
        return (
          <div key={`${c.name} #${i}`} className="flex items-center">
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            )}

            {c.completed ? (
              <label
                htmlFor={c.name}
                className="ml-2 block text-sm line-through"
              >
                <span />
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
  );
}
