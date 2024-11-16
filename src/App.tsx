import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookingPage } from "./components/booking/BookingPage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
