/* eslint-disable import/no-cycle */
import React from "react";
import { useTheme } from "next-themes";
import { Button } from ".";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-around bg-purple-50 dark:bg-slate-700 border-b p-4 w-screen">
      <div className="text-purple-500">
        <h1 className="font-bold">Spirituality Store</h1>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
      </div>
      <Button />
    </div>
  );
};

export default Navbar;
