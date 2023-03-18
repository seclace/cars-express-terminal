import { Car } from "@src/domain/common/car/domain/car/car";
import { CarBrand } from "@src/domain/common/car/domain/car/types";
import { CarId } from "@src/domain/common/car/domain/car/car-id";

export interface CarExtractor {
  getOneById(id: CarId): Promise<Car | undefined>;
  getByBrand(brand: CarBrand): Promise<Car[]>;
}
