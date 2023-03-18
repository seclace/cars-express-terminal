import { Car } from "@src/domain/common/car/domain/car/car";
import { CarBrand, CarName, CarYear, CarPrice } from "@src/domain/common/car/domain/car/types";

export interface CreateCar {
  execute(brand: CarBrand, name: CarName, year: CarYear, price: CarPrice): Promise<Car>;
}
