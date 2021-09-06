export function Greeting() {
  const greet =
    new Date().getHours() > 12 && new Date().getHours() < 17
      ? "Good afternoon"
      : new Date().getHours() < 12
      ? "Good Morning"
      : "Goodnight";

  return <pre className="text-2xl">{greet}</pre>;
}
