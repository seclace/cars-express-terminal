import { Car } from "@src/domain/common/car/domain/car/car";
import { CarId } from "@src/domain/common/car/domain/car/car-id";
import { UpdateCarDto } from "@src/domain/common/car/domain/car/dto/update-car.dto";

export interface UpdateCar {
  execute(id: CarId, dto: UpdateCarDto): Promise<Car>;
}
