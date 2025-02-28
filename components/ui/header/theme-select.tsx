"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, SunMoonIcon } from "lucide-react";
import {
  MouseEventHandler,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

const themes = {
  light: { label: "Light", icon: <SunIcon /> },
  dark: { label: "Dark", icon: <MoonIcon /> },
  system: { label: "System", icon: <SunMoonIcon /> },
} as const;

const ThemeSelect = () => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();

  const themeChangeHandler = useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const value = target?.getAttribute?.("data-value");
      if (!value) {
        console.error("ThemeSelect: data-value not found");
        return;
      }

      setTheme(value);
    },
    [setTheme]
  );

  if (!mounted || !theme) return null;
  const activeTheme = themes[theme as keyof typeof themes];
  if (!activeTheme) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{activeTheme.icon}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(themes).map(([name, themeOption]) => (
          <DropdownMenuCheckboxItem
            key={name}
            data-value={name}
            checked={name === theme}
            onClick={themeChangeHandler}
          >
            {themeOption.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelect;
