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
  monthYearDisplay.textContent = "Month Year" // TODO -- Add month/year dynamically from inputs

  // Next button
  const nextButton = document.createElement("button");
  nextButton.className = "nav-button";
  nextButton.textContent = "Next >";
  nextButton.id = "next-month";

  header.appendChild(prevButton);
  header.appendChild(monthYearDisplay);
  header.appendChild(nextButton);


  // Add to body
  body.appendChild(header);
}

createCalendarStructure();


// Create event listeners for buttons and logic for moving moths

// Render days on calendar


/* 
TODOS
* Add Month/Year
* Logic for buttons
* Generate day numbers on grid
* Styling

*/