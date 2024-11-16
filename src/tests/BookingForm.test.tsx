import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import * as api from "../api";
import { BookingForm } from "../components/booking/BookingForm";
import {
  initializeTimes,
  availableTimesReducer,
} from "../components/booking/availableTimesReducer";
/* eslint-disable testing-library/no-unnecessary-act */

const mockAvailableTimes: string[] = ["10:00", "14:00", "18:00"];

const mockDateChange = jest.fn();
const mockSubmitSuccess = jest.fn();

describe("BookingForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    mockDateChange.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
      />
    );

    expect(screen.getByText(/Date and Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByText(/Special Requests/i)).toBeInTheDocument();
  });

  it("shows email error when email is invalid", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
      />
    );

    await act(async () => {
      const emailRadio = screen.getByRole("radio", { name: /Email/i });
      await userEvent.click(emailRadio);

      const emailInput = screen.getByPlaceholderText(
        /e\.g\., user@example\.com/i
      );
      await userEvent.type(emailInput, "invalid-email");

      const submitButton = screen.getByRole("button", { name: /Submit/i });
      await userEvent.click(submitButton);
    });

    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it("shows number of people error when number is invalid", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
      />
    );

    await act(async () => {
      const numberOfPeopleInput = screen.getByLabelText(/Number of People/i);
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, "0");

      const submitButton = screen.getByRole("button", { name: /Submit/i });
      await userEvent.click(submitButton);
    });

    expect(
      screen.getByText(/At least one person is required/i)
    ).toBeInTheDocument();
  });

  it("shows email input when Email is selected", async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
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
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
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
        onDateChange={mockDateChange}
        onSubmitSuccess={mockSubmitSuccess}
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
            date: expect.any(Date),
            time: expect.any(String),
          })
        );
      });
    });
  });
});

// Mock the API module
jest.mock("../api", () => ({
  fetchAPI: jest.fn(),
}));

describe("initializeTimes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize times successfully", async () => {
    const mockTimes = ["17:00", "18:00", "19:00"];
    (api.fetchAPI as jest.Mock).mockResolvedValueOnce(mockTimes);

    const result = await initializeTimes();

    expect(api.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
    expect(result).toEqual(mockTimes);
  });

  it("should handle API errors gracefully", async () => {
    (api.fetchAPI as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const result = await initializeTimes();

    expect(api.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
    expect(result).toEqual([]);
  });
});

describe("availableTimesReducer", () => {
  const initialState: string[] = ["5:00", "6:00 PM"];

  it("should handle UPDATE_TIMES action", () => {
    const newTimes: string[] = ["19:00", "20:00"];

    const result = availableTimesReducer(initialState, {
      type: "UPDATE_TIMES",
      payload: newTimes,
    });

    expect(result).toEqual(newTimes);
  });

  it("should return current state for FETCH_TIMES action", () => {
    const result = availableTimesReducer(initialState, {
      type: "FETCH_TIMES",
      payload: new Date(),
    });

    expect(result).toEqual(initialState);
  });

  it("should return current state for unknown action", () => {
    const result = availableTimesReducer(initialState, {
      type: "UNKNOWN" as any,
      payload: [],
    });

    expect(result).toEqual(initialState);
  });
});
