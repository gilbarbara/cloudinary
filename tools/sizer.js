/* eslint-disable no-console */
const { existsSync, readdirSync } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const { fileSync } = require('gzip-size');
const ps = require('prettysize');

const limit = 1024 * 4;

function getSizes(path, regex = /\.js$/) {
  if (!existsSync(path)) {
    return 0;
  }

  return readdirSync(path)
    .filter(file => regex.test(file))
    .reduce((acc, file) => acc + fileSync(resolve(path, file)), 0);
}

function getTotals(path) {
  const totalSize = getSizes(`./${path}`, /.*\.js/);

  console.log(chalk.magenta(`>>> ${path}`));

  if (!totalSize) {
    console.log([chalk.bgRed(' FAIL '), chalk.red('Nothing to measure')].join(' '));
    process.exit(1);
  }

  if (totalSize > limit) {
    console.log(
      [chalk.bgRed(' FAIL '), chalk.red(`${ps(totalSize)} > ${ps(limit)} (gzip)`)].join(' '),
    );
    process.exit(1);
  }

  console.log(
    [chalk.bgGreen(' PASS '), chalk.green(`${ps(totalSize)} < ${ps(limit)} (gzip)`)].join(' '),
  );
  console.log('');
}

['es', 'lib'].map(getTotals);
