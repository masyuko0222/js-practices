#! /usr/bin/env node
"use strict";

import minimist from "minimist";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport.js";
dayjs.extend(objectSupport);

const args = minimist(process.argv);
const year = args.y ?? dayjs().year();
const month = args.m ? args.m - 1 : dayjs().month();

let dayjsObj = dayjs({ year: year, month: month });

function main() {
  printMonthYear(dayjsObj.month(), dayjsObj.year());
  printDaysOfWeek();
  printDates();
}

function printMonthYear(month, year) {
  process.stdout.write(`     ${month + 1}月 ${year}年\n`);
}

function printDaysOfWeek() {
  process.stdout.write("日 月 火 水 木 金 土\n");
}

function printDates() {
  fillBlanks(dayjsObj);

  const last_date = dayjsObj.daysInMonth();
  let currentDayjsObj = dayjsObj;
  let week = [];

  for (let i = 1; i <= last_date; i++) {
    week.push(currentDayjsObj.date().toString().padStart(2));

    if (currentDayjsObj.day() === 6 || i === last_date) {
      process.stdout.write(week.join(" "));
      process.stdout.write(`\n`);
      week.splice(0); // array reset
    }
    currentDayjsObj = currentDayjsObj.add(1, "day");
  }
}

function fillBlanks(dayjsObj) {
  const blanksCount = dayjsObj.day();

  let blanksArray = new Array(blanksCount).fill("  ");
  let blanksFormat = blanksArray.join(" ");
  if (blanksCount !== 0) {
    blanksFormat = blanksFormat + " ";
  }

  process.stdout.write(blanksFormat);
}

main();
