import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeSlot } from "../components/booking/availableTimesReducer";
import { BookingForm } from "../components/booking/BookingForm";

const mockAvailableTimes: TimeSlot[] = [
  { value: "10", label: "10:00 AM" },
  { value: "14", label: "2:00 PM" },
  { value: "18", label: "6:00 PM" },
];

const mockDispatch = jest.fn();

describe("BookingForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    mockDispatch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    expect(screen.getByLabelText(/date and time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  it("shows email input when Email is selected", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    const emailRadio = screen.getByLabelText(/email/i);
    await userEvent.click(emailRadio);

    expect(
      screen.getByPlaceholderText(/e\.g\., user@example\.com/i)
    ).toBeInTheDocument();
  });

  it("shows SMS input when SMS is selected", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    const smsRadio = screen.getByLabelText(/sms/i);
    userEvent.click(smsRadio);

    expect(
      screen.getByPlaceholderText(/e\.g\., \+1234567890/i)
    ).toBeInTheDocument();
  });

  it("displays available time slots", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    // Open the select dropdown
    const selectTrigger = screen.getByRole("button", { name: /select time/i });
    userEvent.click(selectTrigger);

    // Check that all options are displayed
    mockAvailableTimes.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    // Fill form with valid data
    userEvent.click(screen.getByLabelText(/email/i));
    userEvent.type(
      screen.getByPlaceholderText(/e\.g\., user@example\.com/i),
      "test@example.com"
    );

    // Select time
    const selectTrigger = screen.getByRole("button", { name: /select time/i });
    userEvent.click(selectTrigger);
    const option = screen.getByText(/6:00 PM/i);
    userEvent.click(option);

    // Verify that the selection was made
    expect(selectTrigger).toHaveTextContent("6:00 PM");

    // Fill other fields
    const numberOfPeopleInput = screen.getByLabelText(/number of people/i);
    userEvent.clear(numberOfPeopleInput);
    userEvent.type(numberOfPeopleInput, "4");

    const specialRequestsInput = screen.getByLabelText(/special requests/i);
    userEvent.type(specialRequestsInput, "Window seat please");

    // Submit form
    userEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        "Form Submitted:",
        expect.objectContaining({
          contactMethod: "Email",
          contactInfo: "test@example.com",
          numberOfPeople: 4,
          specialRequests: "Window seat please",
        })
      );
    });
  });
});
