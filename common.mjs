// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
  return "Hello";
}

// I was first going to create function to retrieve the index of the months and days
// but I figured using an object would be simpler

// Month name to number
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

// Day name to number
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
  // get month as a num
  const month = MONTHS[monthName];
  // habdle errors
  if (month === undefined) throw new Error(`Invalid month name: ${monthName}`);

  //get the day of the week I'm looking for as a number
  const targetDay = DAYS[dayName];
  // habdle errors
  if (targetDay === undefined) throw new Error(`Invalid day name: ${dayName}`);

  // Find the first occurence of the target day in a month
  const firstDay = new Date(year, month, 1); // create 1st of the month
  const firstDayOfWeek = firstDay.getDay(); //figure out the day on the 1st of the month

  // figure out how many days it will be from the first of the month to get to target day
  let daysUntilFirstTarget = (targetDay - firstDayOfWeek + 7) % 7;

  // figure out 1st, 2nd, 3rd and last occurrences

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
      throw new Error(`Invalid occurrence: ${occurrence}`);
  }
  //   return targetDate.toLocaleDateString();
  return targetDate;
}

console.log(calculateDate(2025, "October", "Friday", "first"));
console.log(calculateDate(2025, "October", "Friday", "second"));
console.log(calculateDate(2025, "October", "Friday", "third"));
console.log(calculateDate(2025, "October", "Friday", "last"));
