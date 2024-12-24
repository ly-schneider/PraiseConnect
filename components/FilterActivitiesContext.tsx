"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterActivitiesContextType = {
  selectedActivities: string[];
  toggleActivity: (activity: string) => void;
};

const FilterActivitiesContext = createContext<FilterActivitiesContextType | undefined>(
  undefined
);

export const FilterActivitiesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(() => {
    const storedActivities = window.localStorage.getItem("filterActivities");
    return storedActivities ? storedActivities.split(",").filter(Boolean) : [];
  });

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prevSelected) => {
      const updatedActivities = prevSelected.includes(activity)
        ? prevSelected.filter((item) => item !== activity)
        : [...prevSelected, activity];

      try {
        window.localStorage.setItem(
          "filterActivities",
          updatedActivities.join(",")
        );
      } catch (err) {
        console.error("Error updating localStorage:", err);
      }

      return updatedActivities;
    });
  };

  return (
    <FilterActivitiesContext.Provider value={{ selectedActivities, toggleActivity }}>
      {children}
    </FilterActivitiesContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(FilterActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};
