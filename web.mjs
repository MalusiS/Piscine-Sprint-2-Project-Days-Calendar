// Helper function to get number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper function to get day of week for first day of month
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // returns index
}

console.log(getDaysInMonth(2025, 9));
console.log(getFirstDayOfMonth(2025, 9));

// Create DOM elements and structure -- Calendar display and buttons

let calendarGrid;

function createCalendarStructure() {
  const body = document.body;

  // Create header with buttons
  const header = document.createElement("header");
  header.className = "calendar-header";

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.className = "nav-button";
  prevButton.textContent = "< Previous";
  prevButton.id = "prev-month";

  // Month/Year display
  const monthYearDisplay = document.createElement("h2");
  monthYearDisplay.className = "month-year-display";
  monthYearDisplay.id = "month-year-display";
  monthYearDisplay.textContent = "Month Year"; // TODO -- Add month/year dynamically from inputs

  // Next button
  const nextButton = document.createElement("button");
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

createCalendarStructure();

// Render days on calendar

function renderCalendar(year, month) {
  // Get calendar data
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  for (let i = 0; i < daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day-cell";
    const dayNumber = i + 1;
    dayElement.textContent = dayNumber;
    calendarGrid.appendChild(dayElement);
    
  }
}

renderCalendar(2025, 9)

// Create event listeners for buttons and logic for moving months

/* 
TODOS
* Add Month/Year
* Logic for buttons
* Generate day numbers on grid
* Styling

*/
