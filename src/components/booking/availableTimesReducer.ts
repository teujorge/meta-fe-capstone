export type TimeSlot = {
  value: string;
  label: string;
};

type AvailableTimesAction = {
  type: "UPDATE_TIMES";
  payload: Date;
};

export const initializeTimes = (): TimeSlot[] => [
  // Breakfast (9 AM - 11 AM)
  ...Array.from({ length: 3 }, (_, i) => {
    const hour = 9 + i; // 9, 10, 11
    return {
      value: hour.toString(),
      label: `${hour} AM`,
    };
  }),

  // Lunch (12 PM - 3 PM)
  ...Array.from({ length: 4 }, (_, i) => {
    const hour = 12 + i; // 12, 13, 14, 15
    const displayHour = hour === 12 ? 12 : hour - 12; // Converts to 12, 1, 2, 3
    return {
      value: hour.toString(),
      label: `${displayHour} PM`,
    };
  }),

  // Dinner (5 PM - 10 PM)
  ...Array.from({ length: 6 }, (_, i) => {
    const hour = 17 + i; // 17, 18, 19, 20, 21, 22
    const displayHour = hour - 12; // Converts to 5, 6, 7, 8, 9, 10
    return {
      value: hour.toString(),
      label: `${displayHour} PM`,
    };
  }),
];

// Helper to find nearest available time
export const findNearestTime = (
  current: number,
  available: TimeSlot[]
): string => {
  if (available.length === 0) return "18"; // Default to 6 PM if no times available

  const availableHours = available.map((slot) => parseInt(slot.value, 10));
  return availableHours
    .reduce((prev, curr) => {
      return Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev;
    })
    .toString();
};

export const availableTimesReducer = (
  state: TimeSlot[],
  action: AvailableTimesAction
): TimeSlot[] => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const date = action.payload;
      const day = date.getDay();

      // Re-initialize times to avoid accumulation
      const initialTimes = initializeTimes();

      // Adjust availability based on the day
      switch (day) {
        case 0: // Sunday - Limited hours (12 PM - 8 PM)
          return initialTimes.filter((slot) => {
            const hour = parseInt(slot.value, 10);
            return hour >= 12 && hour <= 20;
          });
        case 6: // Saturday - Extended hours (All times available)
          return initialTimes;
        default: // Weekdays - Regular hours (from 11 AM onwards)
          return initialTimes.filter((slot) => {
            const hour = parseInt(slot.value, 10);
            return hour >= 11;
          });
      }
    }
    default:
      return state;
  }
};
