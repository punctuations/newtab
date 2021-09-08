import React from "react";
import { SettingsContext } from "../App";

export function Quotes() {
  const { settings } = React.useContext(SettingsContext);

  const quotes = [
    "〝Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.〞 ⸺ Ferris Bueller.",
    "〝When you have exhausted all possibilities, remember this - you haven't.〞 ⸺ Thomas Edison.",
    "〝It takes time to create excellence. If it could be done quickly, more people would do it.〞 ⸺ John Wooden.",
    "〝Care about what other people think and you will always be their prisoner.〞 ⸺ Lao Tzu.",
    "〝Opportunities multiply as they are seized.〞 ⸺ Sun Tzu.",
    "〝Failure is a bend in the road, not the end of the road. Learn from failure and keep moving forward.〞 ⸺ Roy T. Bennett.",
    "〝It's only after you've stepped outside your comfort zone that you begin to change, grow, and transform.〞 ⸺ Roy T. Bennett.",
    "〝You can't build a reputation on what you are going to do.〞 ⸺ Henry Ford.",
  ];

  const [quote] = React.useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  return (
    <pre
      className={`z-20 text-xs ${
        settings.blur
          ? "transition-all duration-500 text-shadow-blur dark:text-shadow-blur-dark hover:text-shadow-none text-transparent dark:hover:text-white hover:text-black"
          : ""
      } text-center px-32`}
    >
      {quote}
    </pre>
  );
}
