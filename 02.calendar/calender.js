#! /usr/bin/env node
"use strict";

import minimist from "minimist";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport.js";
dayjs.extend(objectSupport);

const ARGS = minimist(process.argv);
const YEAR = ARGS.y ?? dayjs().year();
const MONTH = ARGS.m ? ARGS.m - 1 : dayjs().month();

const DAYJS = dayjs({ year: YEAR, month: MONTH });

function main() {
  printMonthYear(DAYJS.month(), DAYJS.year());
  printDaysOfWeek();
  //  ptintDates();
}

function printMonthYear(month, year) {
  process.stdout.write(`     ${month + 1}月 ${year}年\n`);
}

function printDaysOfWeek() {
  process.stdout.write("日 月 火 水 木 金 土\n");
}

main();
