import { Info } from "lucide-react";
import { useState, useEffect } from "react";

export function LabelWithTooltip({ labelText, tooltipText }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTooltipToggle = (e) => {
    if (isSmallScreen) {
      e.preventDefault();
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div className="flex items-center gap-2 relative group">
      <label className="text-sm font-medium">{labelText}</label>

      <div className="relative ">
        <button
          onClick={handleTooltipToggle}
          onMouseEnter={() => !isSmallScreen && setShowTooltip(true)}
          onMouseLeave={() => !isSmallScreen && setShowTooltip(false)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          type="button"
        >
          <Info className="w-3 h-3" />
        </button>

        {showTooltip && (
          <div className="absolute z-20 -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow-md ">
            {tooltipText}
            <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-black"></div>
          </div>
        )}
      </div>
    </div>
  );
}
