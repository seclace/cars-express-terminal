#!/usr/bin/env node

import { TerminalApiClient } from "./terminal-api-client";

import { Command } from "commander";

console.log('started')
const terminalApi = new TerminalApiClient();
terminalApi.start().then(() => {});

// const program = new Command()
//   .name('cars-manager')
//   .description('Terminal Client for Cars Manager')
//   .version('0.1.0')
//   .showHelpAfterError();

// const listCars = new Command('list')
//   .description('Get cars by brand')
//   .option('-b', '--brand <string>')
//   // .action(async (opts, cmd) => {
//   //   console.log({ opts, cmd });
//   // });
// program.addCommand(listCars);

// const createCar = program.command('create')
//   .description('Create a car')
//   .requiredOption('-b, --brand <string>', 'Car brand')
//   .requiredOption('-n, --name <string>', 'Car name')
//   .requiredOption('-y, --year <number>', 'Car production year', Number)
//   .requiredOption('-p, --price <number>', 'Car price', Number)
//   .action(async (args) => {
//     // console.log({ opts, cmd });
//     // @ts-ignore
//     console.log({ args })
//     // console.log('brand', options.brand)
//     // console.log('name', options.name)
//   });
// program.addCommand(createCar);


// program.parse(process.argv);

// const opts = program.opts();
// console.log({ opts })

console.log('finished')
