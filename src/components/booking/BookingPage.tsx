import { useEffect, useReducer } from "react";
import { fetchAPI } from "src/api";
import { BookingForm } from "./BookingForm";

import {
  availableTimesReducer,
  initializeTimes,
} from "./availableTimesReducer";

export function BookingPage() {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);

  useEffect(() => {
    async function fetchInitialTimes() {
      const times = await initializeTimes();
      dispatch({ type: "UPDATE_TIMES", payload: times });
    }

    fetchInitialTimes();
  }, []);

  async function handleDateChange(date: Date) {
    dispatch({ type: "FETCH_TIMES", payload: date });
    const response = await fetchAPI(date);
    dispatch({ type: "UPDATE_TIMES", payload: response });
  }

  return (
    <main className="flex flex-col gap-28 limit-width p-8">
      <h1 className="text-primary pb-20">Book a table</h1>
      <img
        src="/assets/about/locale.png"
        alt="restaurant interior"
        className="absolute inset-0 w-full h-72 object-cover -z-10 brightness-50"
      />

      <BookingForm
        availableTimes={availableTimes}
        onDateChange={handleDateChange}
      />
    </main>
  );
}
