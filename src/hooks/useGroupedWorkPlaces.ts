import { useMemo } from "react";
import { type GetWorkplaceData } from "@/api/api";

export type WorkPlace = NonNullable<GetWorkplaceData["workPlaces"]>[0];

export type GroupedWorkPlace = {
  key: string;
  latitude: number;
  longitude: number;
  workplaces: WorkPlace[];
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

    return Array.from(groups.entries()).map(([key, workplaces]) => ({
      key,
      latitude: workplaces[0].latitude ?? 0,
      longitude: workplaces[0].longitude ?? 0,
      workplaces,
    }));
  }, [workPlaces]);
}
