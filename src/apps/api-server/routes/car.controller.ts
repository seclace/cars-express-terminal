import HttpStatusCodes from '@api-server/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';
import { CarService } from '../services/car.service';
import { CreateCarDto } from '@src/domain/common/car/domain/car/dto/create-car.dto';
import { UpdateCarDto } from '@src/domain/common/car/domain/car/dto/update-car.dto';


// **** CarController **** //

export class CarController {
  constructor(private readonly carService: CarService) {}

  /**
   * Get all cars.
   */
  async getAll(req: IReq, res: IRes) {
    const { brand } = req.query;
    const cars = await this.carService.getCarsByBrand(brand as string);
    return res.status(HttpStatusCodes.OK).json({ cars });
  }

  /**
   * Create a car.
   */
  async add(req: IReq<CreateCarDto>, res: IRes) {
    console.log({ body: req.body })
    await this.carService.createCar(req.body);
    return res.status(HttpStatusCodes.CREATED).end();
  }

  /**
   * Update a car.
   */
  async update(req: IReq<UpdateCarDto>, res: IRes) {
    const id = req.params.id;
    const body = req.body;
    console.log({ id, body })
    await this.carService.updateCar(id, body);
    return res.status(HttpStatusCodes.OK).end();
  }

  /**
   * Delete a car.
   */
  async delete(req: IReq, res: IRes) {
    const id = req.params.id;
    await this.carService.deleteCar(id);
    return res.status(HttpStatusCodes.OK).end();
  }
}
