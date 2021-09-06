import React from "react";

export function Checklist() {
  const [checks, setChecks] = React.useState([
    { name: "Todo", completed: false },
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
    checks[local.index].completed = local.completed === "on";

    localStorage.setItem("checks", JSON.stringify(checks));

    if (local.completed === "on") {
      setTimeout(() => {
        deleteCheck({ index: local.index });
      }, 1000);
    }
  }
  function deleteCheck(check) {
    checks.splice(check.index, 1);
    console.log(checks);

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
                className="appearance-none form-checkbox h-4 w-4 checked:text-black focus:text-black hover:text-black checked:ring-2 ring-white checked:border-transparent focus:border-transparent rounded"
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
                <span className="absolute inline-block top-1/2 border-t border-white animate-strikethrough" />
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
