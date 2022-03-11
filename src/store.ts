import { writable, derived, Writable, Readable } from "svelte/store";
import type { Activity } from "./models/activity";
import type { Analysis } from "./models/analysis";

export const loading: Writable<boolean> = writable(false);

export const activities: Writable<Activity[]> = writable([]);
export const currentAnalysis: Writable<Analysis | null> = writable(null);
  
/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const activitiesNames: Readable<String[]> = derived(
  activities,
  ($apiData) => {
    if ($apiData) {
      return $apiData.map((activity) => activity.name);
    }
    return [];
  }
);
