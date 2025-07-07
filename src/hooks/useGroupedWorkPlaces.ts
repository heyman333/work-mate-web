import { useMemo } from "react";
import { type GetWorkplaceData } from "@/api/api";

export type WorkPlace = NonNullable<GetWorkplaceData["workPlaces"]>[0];

export type GroupedWorkPlace = {
  key: string;
  latitude: number;
  longitude: number;
  workplaces: (WorkPlace & { colorPalette: string })[];
};

export function useGroupedWorkPlaces(
  workPlaces?: WorkPlace[]
): GroupedWorkPlace[] {
  return useMemo(() => {
    if (!workPlaces) return [];

    const groups = new Map<string, WorkPlace[]>();

    workPlaces.forEach((workplace) => {
      const key = `${workplace.latitude}-${workplace.longitude}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(workplace);
    });

    const randomColorPalettes = Array.from({ length: 10 }, () => {
      const colorPalettes = [
        "blue",
        "green",
        "red",
        "purple",
        "orange",
        "yellow",
      ];
      return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    });

    return Array.from(groups.entries()).map(([key, workplaces], index) => ({
      key,
      latitude: workplaces[0].latitude ?? 0,
      longitude: workplaces[0].longitude ?? 0,
      workplaces: workplaces.map((workplace) => ({
        ...workplace,
        colorPalette: randomColorPalettes[index % randomColorPalettes.length],
      })),
    }));
  }, [workPlaces]);
}
