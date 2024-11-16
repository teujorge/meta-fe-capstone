import { BookingForm } from "./BookingForm";

export function Reservations() {
  return (
    <main className="flex flex-col gap-28 limit-width p-8">
      <h1 className="text-primary pb-20">Book a table</h1>
      <img
        src="/assets/about/locale.png"
        alt="restaurant interior"
        className="absolute inset-0 w-full h-72 object-cover -z-10 brightness-50"
      />

      <BookingForm />
    </main>
  );
}
