import { CarId } from "@src/domain/common/car/domain/car/car-id";

export interface DeleteCar {
  execute(id: CarId): Promise<void>;
}
