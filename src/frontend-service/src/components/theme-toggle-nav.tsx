"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function ThemeToggleNav() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <DropdownMenuItem
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex flex-row gap-4 items-center"
    >
      {!isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Light" : "Dark"} Mode
    </DropdownMenuItem>
  );
}
