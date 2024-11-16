import { fetchAPI } from "src/api";

export type AvailableTimesAction =
  | { type: "UPDATE_TIMES"; payload: string[] }
  | { type: "FETCH_TIMES"; payload: Date };

export async function initializeTimes(): Promise<string[]> {
  try {
    const times = await fetchAPI(new Date());
    return times;
  } catch (error) {
    console.error("Failed to initialize times:", error);
    return []; // Return an empty array as a fallback
  }
}

export function availableTimesReducer(
  state: string[],
  action: AvailableTimesAction
): string[] {
  switch (action.type) {
    case "UPDATE_TIMES": {
      return action.payload;
    }
    case "FETCH_TIMES": {
      return state;
    }
    default:
      return state;
  }
}
