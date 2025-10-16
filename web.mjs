import { MONTHS } from "./common.mjs";

// --- Helper functions ---
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// --- State ---
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// --- DOM Elements ---
let calendarGrid, monthYearDisplay, prevButton, nextButton, monthSelect, yearSelect;

// Initialize calendar on page load
document.addEventListener("DOMContentLoaded", initCalendar);

function initCalendar() {
  createCalendarStructure();
  setupEventListeners();
  renderCalendar(currentYear, currentMonth);
}

function setupEventListeners() {
  prevButton.addEventListener("click", () => navigateMonth(-1));
  nextButton.addEventListener("click", () => navigateMonth(1));

  // Jump controls
  monthSelect.addEventListener("change", jumpToSelectedDate);
  yearSelect.addEventListener("change", jumpToSelectedDate);
}

function navigateMonth(direction) {
  currentMonth += direction;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  updateJumpSelectors();
  renderCalendar(currentYear, currentMonth);
}

function jumpToSelectedDate() {
  currentMonth = parseInt(monthSelect.value);
  currentYear = parseInt(yearSelect.value);
  renderCalendar(currentYear, currentMonth);
}

// --- Build DOM Structure ---
function createCalendarStructure() {
  const body = document.body;

  const header = document.createElement("header");
  header.className = "calendar-header";

  prevButton = document.createElement("button");
  prevButton.className = "nav-button";
  prevButton.textContent = "< Previous";
  prevButton.id = "prev-month";

  nextButton = document.createElement("button");
  nextButton.className = "nav-button";
  nextButton.textContent = "Next >";
  nextButton.id = "next-month";

  monthYearDisplay = document.createElement("h2");
  monthYearDisplay.className = "month-year-display";
  monthYearDisplay.id = "month-year-display";

  // --- Jump controls ---
  const jumpControls = document.createElement("div");
  jumpControls.className = "jump-controls";

  monthSelect = document.createElement("select");
  monthSelect.id = "month-select";
  Object.keys(MONTHS).forEach((monthName, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = monthName;
    monthSelect.appendChild(option);
  });

  yearSelect = document.createElement("select");
  yearSelect.id = "year-select";
  for (let y = 1900; y <= 2100; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  jumpControls.appendChild(monthSelect);
  jumpControls.appendChild(yearSelect);

  header.appendChild(prevButton);
  header.appendChild(monthYearDisplay);
  header.appendChild(nextButton);
  header.appendChild(jumpControls);

  const calendarContainer = document.createElement("div");
  calendarContainer.className = "calendar-container";

  const weekdaysHeader = document.createElement("div");
  weekdaysHeader.className = "weekdays-header";
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekdays.forEach((day) => {
    const el = document.createElement("div");
    el.className = "weekday";
    el.textContent = day;
    weekdaysHeader.appendChild(el);
  });

  calendarGrid = document.createElement("div");
  calendarGrid.className = "calendar-grid";
  calendarGrid.id = "calendar-grid";

  calendarContainer.appendChild(weekdaysHeader);
  calendarContainer.appendChild(calendarGrid);

  body.appendChild(header);
  body.appendChild(calendarContainer);
}

// --- Render calendar days ---
function renderCalendar(year, month) {
  const monthName = Object.keys(MONTHS)[month];
  monthYearDisplay.textContent = `${monthName} ${year}`;
  calendarGrid.innerHTML = "";

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const firstDayMonday = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const today = new Date();

  // Adjust grid height depending on number of weeks
  if (
    (firstDayMonday === 5 && daysInMonth === 31) ||
    (firstDayMonday === 6 && daysInMonth >= 30)
  ) {
    calendarGrid.style.gridTemplateRows = `repeat(6, 80px)`;
  } else {
    calendarGrid.style.gridTemplateRows = `repeat(5, 80px)`;
  }

  for (let i = 0; i < daysInMonth + firstDayMonday; i++) {
    const cell = document.createElement("div");
    cell.className = "day-cell";
    const dayNumber = i - firstDayMonday + 1;

    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      cell.textContent = dayNumber;
      cell.classList.add("day-cell-filled");

      // Restore border styling (Rashaad's original)
      cell.style.border = "1px solid #cbd5e0";

      // Highlight today's date (Rashaad's original)
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        dayNumber === today.getDate()
      ) {
        cell.classList.add("today");
      }
    } else {
      cell.textContent = "";
    }

    calendarGrid.appendChild(cell);
  }

  updateJumpSelectors();
}

// --- Sync dropdowns with displayed month/year ---
function updateJumpSelectors() {
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
}
