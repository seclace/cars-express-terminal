import { Car } from "@src/domain/common/car/domain/car/car";
import { CarId } from "@src/domain/common/car/domain/car/car-id";
import { CarNotFoundError } from "@src/domain/common/car/domain/car/errors/car-not-found.error";
import { CarExtractor } from "@src/domain/common/car/usecase/car-extractor";
import { CarPersister } from "@src/domain/common/car/usecase/car-persister";
import { UpdateCar } from "./update-car";
import { UpdateCarDto } from "@src/domain/common/car/domain/car/dto/update-car.dto";

export class UpdateCarUseCase implements UpdateCar {
  constructor(
    private readonly carExtractor: CarExtractor,
    private readonly carPersister: CarPersister,
  ) {}
  
  async execute(id: CarId, dto: UpdateCarDto): Promise<Car> {
    const car = await this.carExtractor.getOneById(id);
    if (!car) {
      throw new CarNotFoundError(id);
    }

    car.update(dto);
    await this.carPersister.save(car);
    return car;
  }
}
