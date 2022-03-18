import {writable, Writable} from "svelte/store";
import type {Activity} from "./models/activity";
import type {DetailedAnalysis} from "./models/analysis";

export const loading: Writable<boolean> = writable(false);

export const activities: Writable<Activity[]> = writable([]);
export const currentAnalysisDetails: Writable<DetailedAnalysis | null> = writable(null);

