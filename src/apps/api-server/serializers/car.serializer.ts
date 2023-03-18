import { Car } from "@src/domain/common/car/domain/car/car";
import { CarResponse } from "../response/car.response";

export class CarSerializer {
  static toJson(car: Car): CarResponse {
    return {
      id: car.id,
      brand: car.brand,
      name: car.name,
      year: car.year,
      price: car.price,
    };
  }
}
