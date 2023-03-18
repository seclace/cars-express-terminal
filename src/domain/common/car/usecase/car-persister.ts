import { Car } from "@src/domain/common/car/domain/car/car";

export interface CarPersister {
  save(car: Car): Promise<void>;
}
