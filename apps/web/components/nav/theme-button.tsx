"use client";

import { Button } from "@workspace/ui/components/button";
import { Loader, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="animate-pulse rounded-[6px] opacity-50 transition-colors duration-200 hover:bg-accent dark:hover:bg-accent/60"
        disabled
      >
        <Loader className="size-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-[6px] text-muted-foreground transition-all duration-200 hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-neutral-700"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
};
