import { useState } from "react";

export function useResizablePanel(initialHeight = 250) {
  const [height, setHeight] = useState(initialHeight);

  const handleDragStart = (startY: number) => {
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      setHeight(Math.max(100, startHeight + (e.clientY - startY)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      setHeight(Math.max(100, startHeight + (e.touches[0].clientY - startY)));
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("touchcancel", handleUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleUp);
    document.addEventListener("touchcancel", handleUp);
  };

  return { height, handleDragStart };
}
