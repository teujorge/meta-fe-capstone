import { render, screen } from "@testing-library/react";
import { BookingPage } from "../components/booking/BookingPage";

describe("BookingForm", () => {
  it("renders the page heading", () => {
    render(<BookingPage />);
    expect(screen.getByText(/Book a table/i)).toBeInTheDocument();
  });

  it("renders the restaurant image", () => {
    render(<BookingPage />);
    expect(screen.getByAltText(/restaurant interior/i)).toBeInTheDocument();
  });
});
