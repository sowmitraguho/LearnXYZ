import { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ThemeToggle({ theme, setTheme }) {
  const [enabled, setEnabled] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = enabled ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 flex items-center rounded-full transition duration-500 ${
        enabled ? "bg-purple-600" : "bg-gray-300"
      }`}
    >
      {/* Sliding knob */}
      <span
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition duration-500 ${
          enabled ? "translate-x-10" : "translate-x-0"
        }`}
      ></span>

      {/* Icons inside toggle */}
      <span className="absolute left-1 text-yellow-500 text-sm">
        <BsSun />
      </span>
      <span className="absolute right-1 text-gray-900 text-sm">
        <BsMoon />
      </span>
    </button>
  );
}
