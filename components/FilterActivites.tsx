"use client";

import { Activities } from "@/utils/Activities";
import { useActivities } from "./FilterActivitiesContext";

type FilterActivitiesProps = {
  style: "big" | "small";
};

export default function FilterActivities({ style }: FilterActivitiesProps) {
  const { selectedActivities, toggleActivity } = useActivities();

  const isActivitySelected = (activity: string) =>
    selectedActivities.includes(activity);

  return (
    <ul
      className={`flex flex-wrap ${style === "big" ? "gap-3" : "gap-2"}`}
    >
      {style === "big" ? (
        Object.values(Activities).map((activity) => (
          <li key={activity}>
            <button
              className={`btn ${
                isActivitySelected(activity) ? "btn-attention" : "btn-primary"
              }`}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </button>
          </li>
        ))
      ) : (
        selectedActivities.map((activity) => (
          <li key={activity}>
            <button
              className={`btn ${
                isActivitySelected(activity) ? "btn-attention" : "btn-primary"
              } py-2 px-4 text-xs`}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
