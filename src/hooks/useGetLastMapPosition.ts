import { useState, useEffect } from "react";

interface MapPosition {
  lat: number;
  lng: number;
  level?: number;
}

const STORAGE_KEY = "lastMapPosition";

export const useGetLastMapPosition = () => {
  const [lastPosition, setLastPosition] = useState<MapPosition | null>(null);

  const savePosition = (position: MapPosition) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      setLastPosition(position);
    } catch (error) {
      console.error("Failed to save map position:", error);
    }
  };

  const getPosition = (): MapPosition | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to get map position:", error);
      return null;
    }
  };

  const clearPosition = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastPosition(null);
    } catch (error) {
      console.error("Failed to clear map position:", error);
    }
  };

  useEffect(() => {
    const position = getPosition();
    setLastPosition(position);
  }, []);

  return {
    lastPosition,
    savePosition,
    getPosition,
    clearPosition,
  };
};
