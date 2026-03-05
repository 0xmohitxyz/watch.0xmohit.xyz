import { useCallback, useEffect, useState } from "react";
import { useCommandMenuStore } from "@/utils/stores";
import { ClockIcon } from "./icons/clock";
import { FullscreenIcon } from "./icons/fullscreen";
import { SettingsGearIcon } from "./icons/settings";

function Header() {
  const { setOpen } = useCommandMenuStore();
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleOpenSettings = () => {
    setOpen(true);
  };

  return (
    <header className="flex justify-between items-center absolute top-0 left-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
      <h1 className="text-2xl font-bold cursor-pointer relative">
        <ClockIcon size={16} className="p-2" />
      </h1>
      <div className="flex items-center gap-1">
        <button
          onClick={toggleFullscreen}
          className="overflow-hidden rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer backdrop-blur-md"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <FullscreenIcon className="p-2" size={16} isFullscreen={isFullscreen} />
        </button>
        <button
          onClick={handleOpenSettings}
          className="overflow-hidden rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer backdrop-blur-md"
          aria-label={"Open Settings"}
        >
          <SettingsGearIcon className="p-2" size={16} />
        </button>
      </div>
    </header>
  );
}

export default Header;
