import { Car } from "@src/domain/common/car/domain/car/car";
import { CarBrand } from "@src/domain/common/car/domain/car/types";

export interface GetCarsByBrand {
  execute(brand: CarBrand): Promise<Car[]>;
}
