#! /usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const ARGS = minimist(process.argv.slice(2));

const NOW = dayjs();
const MONTH = ARGS.m ?? NOW.month() + 1;
const YEAR = ARGS.y ?? NOW.year();
const LAST_DAY = dayjs().year(YEAR).month(MONTH).date(0).date();

function main() {
  printMonthYear(MONTH, YEAR);
  printDaysOfWeek();

  for (let day = 1; day <= LAST_DAY; day++) {
    let dayOfweek = calculateNumberOfTheDayOfWeek(YEAR, MONTH, day);

    switch (dayOfweek) {
      case 0:
        process.stdout.write(`${day}`.padStart(2));
        break;
      case 6:
        if (day == 1) {
          process.stdout.write(formatTheFirstDay(dayOfweek, day) + `\n`);
        } else {
          process.stdout.write(formatDay(day) + `\n`);
        }
        break;
      default:
        if (day == 1) {
          process.stdout.write(formatTheFirstDay(dayOfweek, day));
        } else {
          process.stdout.write(formatDay(day));
        }
        break;
    }
  }
}

function printMonthYear(month, year) {
  process.stdout.write(`     ${month}月 ${year}年\n`);
}

function printDaysOfWeek() {
  process.stdout.write("日 月 火 水 木 金 土\n");
}

function calculateNumberOfTheDayOfWeek(year, month, day) {
  return dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .day();
}

function formatTheFirstDay(dayOfweek, day) {
  return "  " + "   ".repeat(dayOfweek - 1) + formatDay(day);
}

function formatDay(day) {
  return " " + `${day}`.padStart(2);
}

main();
