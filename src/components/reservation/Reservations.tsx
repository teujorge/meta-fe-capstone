import { BookingForm } from "./BookingForm";

export function Reservations() {
  return (
    <main className="flex flex-col gap-28 limit-width p-8">
      <h1>Book a table</h1>
      <BookingForm />
    </main>
  );
}
