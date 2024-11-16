import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "src/api";
import { BookingForm, BookingFormData } from "./BookingForm";

import {
  availableTimesReducer,
  initializeTimes,
} from "./availableTimesReducer";

export function BookingPage() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);

  useEffect(() => {
    async function fetchInitialTimes() {
      const times = await initializeTimes();
      dispatch({ type: "UPDATE_TIMES", payload: times });
    }

    fetchInitialTimes();
  }, []);

  function handleSubmitSuccess(data: BookingFormData) {
    navigate("/confirmed-booking");

    // save data to local storage (add if doesn't exist, append if it does exist)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(data);
    console.log(bookings);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

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
        onSubmitSuccess={handleSubmitSuccess}
      />
    </main>
  );
}
