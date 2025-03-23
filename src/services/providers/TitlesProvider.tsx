"use client";
import { TitleType, UniverseType } from "@/lib/types";
import { filterTitles } from "@/utils/filterTitles";
import { getTitleFilters } from "@/utils/getTitleFilters";
import { sortTitlesByRelease } from "@/utils/sortTitlesByRelease";
import React, { createContext, useEffect, useState } from "react";

type ContextProps = {
  universe: UniverseType | null;
  titles: TitleType[];
  branchFilters: string[];
  typeFilters: string[];
  filteredTitles: TitleType[];
  completed: string[];
  checkTitle: (id: string) => void;
  resetTitles: () => void;
  bannedBranchFilters: string[];
  bannedTypeFilters: string[];
  switchAllFilters: (active: boolean) => void;
  checkFilter: (filter: string, kind: "branch" | "type") => void;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  currentTitle: string;
  canShow: boolean;
};

export const TitlesContext = createContext<ContextProps>({
  universe: null,
  titles: [],
  branchFilters: [],
  typeFilters: [],
  filteredTitles: [],
  completed: [],
  checkTitle: () => {},
  resetTitles: () => {},
  bannedBranchFilters: [],
  bannedTypeFilters: [],
  switchAllFilters: () => {},
  checkFilter: () => {},
  isHidden: false,
  setIsHidden: () => {},
  currentTitle: "",
  canShow: false,
});

export default function TitlesProvider({
  children,
  universe,
  titles,
}: {
  children: React.ReactNode;
  universe: UniverseType | null;
  titles: TitleType[];
}) {
  const [filteredTitles, setFilteredTitles] = useState<TitleType[]>([]);

  const [branchFilters, setBranchFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  const [bannedBranchFilters, setBannedBranchFilters] = useState<string[]>([]);
  const [bannedTypeFilters, setBannedTypeFilters] = useState<string[]>([]);

  const [completed, setCompleted] = useState<string[]>([]);
  const [completedLoaded, setCompletedLoaded] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [bannedFiltersLoaded, setBannedFiltersLoaded] = useState(false);

  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {
    const savedCompleted = localStorage.getItem(`completed ${universe?.id}`);
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
    setCompletedLoaded(true);
  }, [universe]);

  // Obtain filters from the link
  useEffect(() => {
    if (!filtersLoaded || !completedLoaded) return; // Wait until filters are loaded

    const params = new URLSearchParams(window.location.search);

    // Get selected filters from URL (those that are NOT banned)
    const allowedBranches = params.get("branches")?.split(",") || [];
    const allowedTypes = params.get("types")?.split(",") || [];

    // Banned filters are those in the full list but NOT in the URL
    // If there are no filters in the URL, do not modify the banned filters
    if (allowedBranches.length > 0) {
      setBannedBranchFilters(
        branchFilters.filter((b) => !allowedBranches.includes(b))
      );
    }

    if (allowedTypes.length > 0) {
      setBannedTypeFilters(
        typeFilters.filter((t) => !allowedTypes.includes(t))
      );
    }

    setIsHidden(params.get("hidden") !== "false"); // Default to true if missing

    setBannedFiltersLoaded(true);
  }, [filtersLoaded, completedLoaded, branchFilters, typeFilters]);

  useEffect(() => {
    setFilteredTitles(
      filterTitles(titles, bannedBranchFilters, bannedTypeFilters)
    );
  }, [titles, bannedBranchFilters, bannedTypeFilters]);

  // Update the link from filters
  useEffect(() => {
    if (!bannedFiltersLoaded) return;

    const params = new URLSearchParams();

    // Filter out banned filters
    const allowedBranches = branchFilters.filter(
      (branch) => !bannedBranchFilters.includes(branch)
    );
    const allowedTypes = typeFilters.filter(
      (type) => !bannedTypeFilters.includes(type)
    );

    params.set("branches", allowedBranches.join(","));
    params.set("types", allowedTypes.join(","));
    params.set("hidden", isHidden.toString());

    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [
    branchFilters,
    typeFilters,
    bannedBranchFilters,
    bannedTypeFilters,
    isHidden,
    bannedFiltersLoaded,
  ]);

  useEffect(() => {
    const branchFilterSet = new Set<string>();
    titles.forEach((title) => {
      const currentFilters = getTitleFilters(title);
      currentFilters.forEach((filter) => branchFilterSet.add(filter));
    });
    setBranchFilters(Array.from(branchFilterSet).sort());

    const typeFilterSet = new Set<string>();
    titles.forEach((title) => {
      typeFilterSet.add(title.type);
    });
    setTypeFilters(Array.from(typeFilterSet).sort());

    setFiltersLoaded(true);
  }, [titles]);

  useEffect(() => {
    if (!universe || !completedLoaded) return;
    localStorage.setItem(
      `completed ${universe?.id}`,
      JSON.stringify(completed)
    );
  }, [completed, universe, completedLoaded]);

  useEffect(() => {
    const sorted = sortTitlesByRelease(filteredTitles);
    for (let i = 0; i < sorted.length; i++) {
      const title = sorted[i];
      if (completed.includes(title.id)) continue;
      setCurrentTitle(title.id);
      break;
    }
  }, [filteredTitles, completed]);

  function checkTitle(id: string) {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((currentId) => currentId != id));
    } else if (!completed.includes(id)) {
      setCompleted((prev) => [...prev, id]);
    }
  }

  function resetTitles() {
    setCompleted([]);
  }

  function switchAllFilters(active: boolean) {
    if (active) {
      setBannedBranchFilters([]);
    } else {
      setBannedBranchFilters(branchFilters);
    }
  }

  function checkFilter(filter: string, kind: "branch" | "type") {
    if (kind === "branch") {
      if (bannedBranchFilters.includes(filter)) {
        setBannedBranchFilters((prev) =>
          prev.filter((currentFilter) => currentFilter !== filter)
        );
      } else if (!bannedBranchFilters.includes(filter)) {
        setBannedBranchFilters((prev) => [...prev, filter]);
      }
    } else {
      if (bannedTypeFilters.includes(filter)) {
        setBannedTypeFilters((prev) =>
          prev.filter((currentFilter) => currentFilter !== filter)
        );
      } else if (!bannedTypeFilters.includes(filter)) {
        setBannedTypeFilters((prev) => [...prev, filter]);
      }
    }
  }

  return (
    <TitlesContext.Provider
      value={{
        universe,
        titles,
        branchFilters,
        typeFilters,
        filteredTitles,
        completed,
        checkTitle,
        resetTitles,
        bannedBranchFilters,
        bannedTypeFilters,
        switchAllFilters,
        checkFilter,
        isHidden,
        setIsHidden,
        currentTitle,
        canShow: bannedFiltersLoaded,
      }}
    >
      {children}
    </TitlesContext.Provider>
  );
}
