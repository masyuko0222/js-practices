#! /usr/bin/env node
"use strict";

import minimist from "minimist";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport.js";
dayjs.extend(objectSupport);

const ARGS = minimist(process.argv);
const YEAR = ARGS.y ?? dayjs().year();
const MONTH = ARGS.m ? ARGS.m - 1 : dayjs().month();

let DAYJS = dayjs({ year: YEAR, month: MONTH });

function main() {
  printMonthYear(DAYJS.month(), DAYJS.year());
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
  const LAST_DATE = DAYJS.daysInMonth();
  let tmp_dayjs = DAYJS;

  for (let i = 1; i <= LAST_DATE; i++) {
    let date = `${tmp_dayjs.date()}`;
    let day_of_week = tmp_dayjs.day();
    process.stdout.write(date);
    if (day_of_week === 6) {
      process.stdout.write(`\n`);
    }
    tmp_dayjs = tmp_dayjs.add(1, "day");
  }
}

main();
