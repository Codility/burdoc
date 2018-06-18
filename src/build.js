'use strict';

const { default: build } = require('next/dist/build');
const { printAndExit } = require('next/dist/lib/utils');

build(__dirname).catch(err => {
  printAndExit(err);
});
