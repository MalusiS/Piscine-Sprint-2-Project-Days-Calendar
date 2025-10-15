import { MONTHS } from "./common.mjs";

// Helper function to get number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper function to get day of week for first day of month
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // returns index
}

// State
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// DOM elements
let calendarGrid, monthYearDisplay, prevButton, nextButton;

document.addEventListener("DOMContentLoaded", initCalendar);

function initCalendar() {
  createCalendarStructure();
  setupEventListeners();
  renderCalendar(currentYear, currentMonth);
}

// Setup event listeners for both button
function setupEventListeners() {
  prevButton.addEventListener("click", () => navigateMonth(-1));
  nextButton.addEventListener("click", () => navigateMonth(1));
}

function navigateMonth(direction) {
  currentMonth += direction;

  // Handle next/previous year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar(currentYear, currentMonth);
}

// Calendar display and buttons
function createCalendarStructure() {
  const body = document.body;

  // Create header with buttons
  const header = document.createElement("header");
  header.className = "calendar-header";

  // Previous button
  prevButton = document.createElement("button");
  prevButton.className = "nav-button";
  prevButton.textContent = "< Previous";
  prevButton.id = "prev-month";

  // Month/Year display
  monthYearDisplay = document.createElement("h2");
  monthYearDisplay.className = "month-year-display";
  monthYearDisplay.id = "month-year-display";
  //   monthYearDisplay.textContent = "Month Year"; // TODO -- Add month/year dynamically from inputs

  // Next button
  nextButton = document.createElement("button");
  nextButton.className = "nav-button";
  nextButton.textContent = "Next >";
  nextButton.id = "next-month";

  // Add elements to header
  header.appendChild(prevButton);
  header.appendChild(monthYearDisplay);
  header.appendChild(nextButton);

  // Create calendar grid container
  const calendarContainer = document.createElement("div");
  calendarContainer.className = "calendar-container";
  calendarContainer.id = "calendar-container";

  // Create weekday headers
  const weekdaysHeader = document.createElement("div");
  weekdaysHeader.className = "weekdays-header";

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "weekday";
    dayElement.textContent = day;
    weekdaysHeader.appendChild(dayElement);
  });

  // Create calendar grid
  calendarGrid = document.createElement("div");
  calendarGrid.className = "calendar-grid";
  calendarGrid.id = "calendar-grid";
  //   calendarGrid.textContent = "1";

  // Add elements to container
  calendarContainer.appendChild(weekdaysHeader);
  calendarContainer.appendChild(calendarGrid);

  // Add to body
  body.appendChild(header);
  body.appendChild(calendarContainer);
}

// Render days on calendar
function renderCalendar(year, month) {
  // Update month/year display
  const monthName = Object.keys(MONTHS)[month]; // Covert month index to month name
  monthYearDisplay.textContent = `${monthName} ${year}`;
  console.log(monthName);

  // Clear previous calendar
  calendarGrid.innerHTML = "";

  // Get calendar data
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // Convert from Sunday-first (Sunday = 0) to Monday-first (Monday = 0) for rendering
  let firstDayMonday = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < daysInMonth + firstDayMonday; i++) {
    // TODO Update for loop to reduce method
    const dayElement = document.createElement("div");
    dayElement.className = "day-cell";
    const dayNumber = i - firstDayMonday + 1;

    dayNumber <= 0
      ? (dayElement.textContent = "")
      : (dayElement.textContent = dayNumber);

    calendarGrid.appendChild(dayElement);
  }
}

// Create event listeners for buttons and logic for moving months

/* 
TODOS
* Add Month/Year -- DONE
* Logic for buttons
* Generate day numbers on grid -- STARTED; Need to figure how to shift 1st to start day
* Styling -- STARTED
* renderCalender needs to render based on the current date
* Todays date needs to be indicated
* global variables -- some variables need to be moved out of their function

*/
