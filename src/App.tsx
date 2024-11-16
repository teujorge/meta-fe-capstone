import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./components/home/Home";
import { Reservations } from "./components/reservation/Reservations";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
