import daysData from "./days.json" with { type: "json" };

// Month name to index
const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

// Day name to index
const DAYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function calculateDate(year, monthName, dayName, occurrence) {
  // get month as an index
  const month = MONTHS[monthName];
  if (month === undefined) throw new Error(`Invalid month name: ${monthName}`);

  //Get the day of the week as an index
  const targetDay = DAYS[dayName];
  if (targetDay === undefined) throw new Error(`Invalid day name: ${dayName}`);

  // Find the first occurrence of the target day in the month
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // Calculate days from first of month to first target day
  let daysUntilFirstTarget = (targetDay - firstDayOfWeek + 7) % 7;

  let targetDate;

  switch (occurrence) {
    case "first":
      targetDate = new Date(year, month, 1 + daysUntilFirstTarget);
      break;
    case "second":
      targetDate = new Date(year, month, 1 + daysUntilFirstTarget + 7);
      break;
    case "third":
      targetDate = new Date(year, month, 1 + daysUntilFirstTarget + 14);
      break;
    case "last":
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const lastDayOfWeek = lastDayOfMonth.getDay();
      let daysBackFromEnd = (lastDayOfWeek - targetDay + 7) % 7;
      targetDate = new Date(
        year,
        month,
        lastDayOfMonth.getDate() - daysBackFromEnd
      );
      break;
    default:
      throw new Error(
        `Invalid occurrence: ${occurrence}. Must be one of: first, second, third, last`
      );
  }
  return targetDate;
}

export function getCommemorativeDaysForYear(year, daysData) {
  return daysData.map((day) => {
    const date = calculateDate(year, day.monthName, day.dayName, day.occurrence);
    return {
      name: day.name,
      date: date,
      month: date.getMonth(),
      dayOfMonth: date.getDate()
    };
  });
}

export { MONTHS, DAYS };
