import { CarId } from "@src/domain/common/car/domain/car/car-id";

export class CarNotFoundError extends Error {
  constructor(id: CarId) {
    super(`Car with id="${id}" not found`);
  }
}
