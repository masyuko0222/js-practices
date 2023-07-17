#! /usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

function main() {
  const args = minimist(process.argv.slice(2));

  const now = dayjs();
  const month = args.m ?? now.month() + 1;
  const year = args.y ?? now.year();

  process.stdout.write(`     ${month}月 ${year}年\n`);
  process.stdout.write("日 月 火 水 木 金 土\n");

  const lastDay = dayjs().year(year).month(month).date(0).date();

  for (let i = 1; i <= lastDay; i++) {
    let dayOfWeak = dayjs()
      .year(year)
      .month(month - 1)
      .date(i)
      .day();

    switch (dayOfWeak) {
      case 0:
        process.stdout.write(`${i}`.padStart(2));
        break;
      case 6:
        if (i == 1) {
          process.stdout.write(
            "  " + "   ".repeat(dayOfWeak - 1) + " " + `${i}`.padStart(2) + `\n`
          );
        } else {
          process.stdout.write(" " + `${i}`.padStart(2) + `\n`);
        }
        break;
      default:
        if (i == 1) {
          process.stdout.write(
            "  " + "   ".repeat(dayOfWeak - 1) + " " + `${i}`.padStart(2)
          );
        } else {
          process.stdout.write(" " + `${i}`.padStart(2));
        }
        break;
    }
  }
}

main();
