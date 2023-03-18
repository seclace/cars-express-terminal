import { Command } from 'commander';
import { CarsManagerApiService } from './services/cars-manager-api.service';
import { CreateCarOpts, ListCarsOpts, UpdateCarOpts } from './types';

export class TerminalApiClient {
  private program: Command;

  constructor() {
    this.program = new Command()
      .name('cars-manager')
      .description('Terminal Client for Cars Manager')
      .version('0.1.0')
      .option('-h, --host [string]', 'API Host', 'http://localhost:3000')
      .option('-t, --token [string]', 'API Auth Token')
      .showHelpAfterError()
      .passThroughOptions();
    this.setupCommands();
  }

  private setupCommands(): TerminalApiClient {
    const listCars = new Command('list')
      .description('Get cars by brand')
      .showHelpAfterError()
      .passThroughOptions()
      .requiredOption('-b, --brand <string>', 'Car brand to get by')
      .action(async (opts: ListCarsOpts, cmd: Command) => {
        const { host } = cmd.parent?.opts() as { host: string };
        const carsApi = new CarsManagerApiService(host);
        const cars = await carsApi.listCars(opts.brand);
        console.log(cars);
      });
    this.program.addCommand(listCars);

    const createCar = new Command('create')
      .description('Create a car')
      .showHelpAfterError()
      .requiredOption('-b, --brand <string>', 'Car brand')
      .requiredOption('-n, --name <string>', 'Car name')
      .requiredOption('-y, --year <number>', 'Car production year', Number)
      .requiredOption('-p, --price <number>', 'Car price', Number)
      .action(async (opts: CreateCarOpts, cmd: Command) => {
        const { host } = cmd.parent?.opts() as { host: string };
        const carsApi = new CarsManagerApiService(host);
        await carsApi.createCar(opts);
        console.log('car created!', { opts });
      });
    this.program.addCommand(createCar);

    const updateCar = new Command('update')
      .description('Update a car')
      .showHelpAfterError()
      .argument('<car_id>', 'Car ID')
      .option('-b, --brand [string]', 'Car brand')
      .option('-n, --name [string]', 'Car name')
      .option('-y, --year [number]', 'Car production year', Number)
      .option('-p, --price [number]', 'Car price', Number)
      .action(async (id: string, opts: UpdateCarOpts, cmd: Command) => {
        console.log({ opts, id })
        const { host } = cmd.parent?.opts() as { host: string };
        const carsApi = new CarsManagerApiService(host);
        await carsApi.updateCar(id, opts);
        console.log('car updated!', { id, opts });
      });
    this.program.addCommand(updateCar);

    const deleteCar = new Command('delete')
      .description('Delete a car')
      .showHelpAfterError()
      .argument('<car_id>', 'Car ID')
      .action(async (id: string, _, cmd: Command) => {
        console.log({ id })
        const { host } = cmd.parent?.opts() as { host: string };
        const carsApi = new CarsManagerApiService(host);
        await carsApi.deleteCar(id);
        console.log('car deleted!', { id });
      });
    this.program.addCommand(deleteCar);

    return this;
  }

  async start() {
    await this.program.parseAsync();
  }
}
