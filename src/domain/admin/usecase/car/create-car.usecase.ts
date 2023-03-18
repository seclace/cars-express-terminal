import { Car } from "@src/domain/common/car/domain/car/car";
import { CarBrand, CarName, CarYear, CarPrice } from "@src/domain/common/car/domain/car/types";
import { CarIdGenerator } from "@src/domain/common/car/domain/car/car-id";
import { CarPersister } from "@src/domain/common/car/usecase/car-persister";
import { CreateCar } from "./create-car";

export class CreateCarUseCase implements CreateCar {
  constructor(
    private readonly carIdGenerator: CarIdGenerator,
    private readonly carPersister: CarPersister,
  ) {}
  
  async execute(brand: CarBrand, name: CarName, year: CarYear, price: CarPrice): Promise<Car> {
    const car = await Car.create(this.carIdGenerator, brand, name, year, price);
    await this.carPersister.save(car);

    return car;
  }
}
