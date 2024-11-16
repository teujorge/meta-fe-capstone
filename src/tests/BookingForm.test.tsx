import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { BookingForm } from "../components/booking/BookingForm";
import {
  initializeTimes,
  availableTimesReducer,
  TimeSlot,
} from "../components/booking/availableTimesReducer";
/* eslint-disable testing-library/no-unnecessary-act */

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

    expect(screen.getByText(/Date and Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByText(/Special Requests/i)).toBeInTheDocument();
  });

  it("shows email input when Email is selected", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    await act(async () => {
      const emailRadio = screen.getByRole("radio", { name: /Email/i });
      await userEvent.click(emailRadio);
    });

    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
  });

  it("shows SMS input when SMS is selected", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    await act(async () => {
      const smsRadio = screen.getByRole("radio", { name: /SMS/i });
      await userEvent.click(smsRadio);
    });

    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    );

    await act(async () => {
      // 1. Select Email as the contact method
      const emailRadio = screen.getByRole("radio", { name: /Email/i });
      await userEvent.click(emailRadio);

      // 2. Fill in the Email Address field
      const emailInput = screen.getByPlaceholderText(
        /e\.g\., user@example\.com/i
      );
      await userEvent.type(emailInput, "test@example.com");

      // 3. Fill in the Number of People field
      const numberOfPeopleInput = screen.getByLabelText(/Number of People/i);
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, "4");

      // 4. Fill in the Special Requests field
      const specialRequestsInput = screen.getByPlaceholderText(
        /Enter any special requests here.../i
      );
      await userEvent.type(specialRequestsInput, "Window seat please");

      // 5. Submit the form
      const submitButton = screen.getByRole("button", { name: /Submit/i });
      await userEvent.click(submitButton);

      // 6. Verify that console.log was called with the correct data
      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(
          "Form Submitted:",
          expect.objectContaining({
            contactMethod: "Email",
            contactInfo: "test@example.com",
            numberOfPeople: 4,
            occasion: "Other",
            specialRequests: "Window seat please",
            dateTime: expect.any(String), // ISO string
          })
        );
      });
    });
  });
});

describe("initializeTimes", () => {
  it("should return the correct initial times", () => {
    const expectedTimes: TimeSlot[] = [
      // Breakfast (9 AM - 11 AM)
      { value: "9", label: "9 AM" },
      { value: "10", label: "10 AM" },
      { value: "11", label: "11 AM" },

      // Lunch (12 PM - 3 PM)
      { value: "12", label: "12 PM" },
      { value: "13", label: "1 PM" },
      { value: "14", label: "2 PM" },
      { value: "15", label: "3 PM" },

      // Dinner (5 PM - 10 PM)
      { value: "17", label: "5 PM" },
      { value: "18", label: "6 PM" },
      { value: "19", label: "7 PM" },
      { value: "20", label: "8 PM" },
      { value: "21", label: "9 PM" },
      { value: "22", label: "10 PM" },
    ];

    const actualTimes = initializeTimes();

    expect(actualTimes).toEqual(expectedTimes);
  });
});

describe("availableTimesReducer", () => {
  it("should return the same state when action type is unknown", () => {
    const initialState: TimeSlot[] = [{ value: "10", label: "10 AM" }];
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = availableTimesReducer(initialState, action);

    expect(newState).toBe(initialState);
  });

  it("should return all times on Saturday", () => {
    const date = new Date(2024, 10, 16);
    const newState = availableTimesReducer([], {
      type: "UPDATE_TIMES",
      payload: date,
    });

    const expectedTimes = initializeTimes();

    expect(newState).toEqual(expectedTimes);
  });

  it("should return limited hours (12 PM - 8 PM) on Sunday", () => {
    const date = new Date(2024, 10, 17);
    const newState = availableTimesReducer([], {
      type: "UPDATE_TIMES",
      payload: date,
    });

    const expectedTimes = initializeTimes().filter((slot) => {
      const hour = parseInt(slot.value, 10);
      return hour >= 12 && hour <= 20;
    });

    expect(newState).toEqual(expectedTimes);
  });

  it("should return regular hours (11 AM onwards) on a weekday", () => {
    const date = new Date(2024, 10, 18);
    const newState = availableTimesReducer([], {
      type: "UPDATE_TIMES",
      payload: date,
    });

    const expectedTimes = initializeTimes().filter((slot) => {
      const hour = parseInt(slot.value, 10);
      return hour >= 11;
    });

    expect(newState).toEqual(expectedTimes);
  });
});
