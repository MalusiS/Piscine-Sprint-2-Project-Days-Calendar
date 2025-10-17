// ===============================================
// Generate iCal (days.ics) file
// ===============================================

import fs from "fs";
import { getCommemorativeDaysForYear } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

// Helper to format dates for ICS (YYYYMMDD)
function formatDateForICS(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// Generate iCal content
function generateICS() {
  const lines = [];

  // ICS header
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//CodeYourFuture//Days Calendar//EN");
  lines.push("CALSCALE:GREGORIAN");

  // Loop years 2020–2030 inclusive
  for (let year = 2020; year <= 2030; year++) {
    const commemorativeDays = getCommemorativeDaysForYear(year, daysData);

    commemorativeDays.forEach((day) => {
      const formattedDate = formatDateForICS(day.date);
      const uid = `${formattedDate}-${day.name.replace(/\s+/g, "-")}@dayscalendar`;

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid}`);
      lines.push(`SUMMARY:${day.name}`);
      lines.push(`DTSTART;VALUE=DATE:${formattedDate}`);
      lines.push(`DTEND;VALUE=DATE:${formattedDate}`); // end same day, whole-day event
      lines.push(`DESCRIPTION:${day.name}`);
      lines.push("END:VEVENT");
    });
  }

  // ICS footer
  lines.push("END:VCALENDAR");

  // Write to file
  fs.writeFileSync("days.ics", lines.join("\r\n"), "utf8");
  console.log("✅ iCal file generated successfully: days.ics");
}

// Run the generator
generateICS();
