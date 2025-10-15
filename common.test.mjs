import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { calculateDate, getCommemorativeDaysForYear } from "./common.mjs";

const daysData = JSON.parse(readFileSync(new URL("./days.json", import.meta.url), "utf-8"));

// ---- Test: calculateDate() ----
test("calculateDate correctly finds the 2nd Tuesday of October 2024 (Ada Lovelace Day)", () => {
  const date = calculateDate(2024, "October", "Tuesday", "second");
  assert.equal(date.getFullYear(), 2024);
  assert.equal(date.getMonth(), 9); // October (0-indexed)
  assert.equal(date.getDate(), 8); // Expected 8 Oct 2024
});

test("calculateDate correctly finds the 2nd Tuesday of October 2025 (Ada Lovelace Day)", () => {
  const date = calculateDate(2025, "October", "Tuesday", "second");
  assert.equal(date.getFullYear(), 2025);
  assert.equal(date.getMonth(), 9);
  assert.equal(date.getDate(), 14); // Expected 14 Oct 2025
});

test("calculateDate correctly finds the last Friday of October 2024 (World Lemur Day)", () => {
  const date = calculateDate(2024, "October", "Friday", "last");
  assert.equal(date.getFullYear(), 2024);
  assert.equal(date.getMonth(), 9);
  assert.equal(date.getDate(), 25); // Expected 25 Oct 2024
});

test("calculateDate throws an error for invalid month", () => {
  assert.throws(() => calculateDate(2025, "Octember", "Tuesday", "second"), /Invalid month name/);
});

test("calculateDate throws an error for invalid day", () => {
  assert.throws(() => calculateDate(2025, "October", "Caturday", "second"), /Invalid day name/);
});

test("calculateDate throws an error for invalid occurrence", () => {
  assert.throws(() => calculateDate(2025, "October", "Tuesday", "fifth"), /Invalid occurrence/);
});

// ---- Test: getCommemorativeDaysForYear() ----
test("getCommemorativeDaysForYear returns correct number of days", () => {
  const result = getCommemorativeDaysForYear(2024, daysData);
  assert.equal(result.length, daysData.length);
});

test("getCommemorativeDaysForYear includes Ada Lovelace Day 2024 with correct date", () => {
  const result = getCommemorativeDaysForYear(2024, daysData);
  const ada = result.find((d) => d.name === "Ada Lovelace Day");
  assert.ok(ada, "Ada Lovelace Day should be present");
  assert.equal(ada.date.getFullYear(), 2024);
  assert.equal(ada.date.getMonth(), 9); // October
  assert.equal(ada.date.getDate(), 8);
});

test("getCommemorativeDaysForYear includes World Lemur Day 2024 with correct date", () => {
  const result = getCommemorativeDaysForYear(2024, daysData);
  const lemur = result.find((d) => d.name === "World Lemur Day");
  assert.ok(lemur, "World Lemur Day should be present");
  assert.equal(lemur.date.getFullYear(), 2024);
  assert.equal(lemur.date.getMonth(), 9); // October
  assert.equal(lemur.date.getDate(), 25);
});
