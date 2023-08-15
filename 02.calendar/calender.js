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

  let tmp_arry = new Array(tmp_dayjs.day());
  let aaa = [...tmp_arry.fill('  ')].join(' ') + ' ';
  process.stdout.write(aaa);
  let week = [];

  for (let i = 1; i <= LAST_DATE; i++) {
    week.push(tmp_dayjs.date().toString().padStart(2));

    if (tmp_dayjs.day() === 6 || i === LAST_DATE){
      process.stdout.write(week.join(' '));
      process.stdout.write(`\n`);
      week.splice(0);
    }

    tmp_dayjs = tmp_dayjs.add(1, "day");
  }
}

main();
