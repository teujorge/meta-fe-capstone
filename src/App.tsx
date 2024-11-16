import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookingPage } from "./components/booking/BookingPage";
import { ConfirmedBookingPage } from "./components/booking/ConfirmedBooking.tsx";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-svh flex flex-col justify-between">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmed-booking" element={<ConfirmedBookingPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
