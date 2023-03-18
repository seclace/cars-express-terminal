import { CarId } from "@src/domain/common/car/domain/car/car-id";
import { CarNotFoundError } from "@src/domain/common/car/domain/car/errors/car-not-found.error";
import { CarExtractor } from "@src/domain/common/car/usecase/car-extractor";
import { CarPersister } from "@src/domain/common/car/usecase/car-persister";
import { DeleteCar } from "./delete-car";

export class DeleteCarUseCase implements DeleteCar {
  constructor(
    private readonly carExtractor: CarExtractor,
    private readonly carPersister: CarPersister,
  ) {}

  async execute(id: CarId): Promise<void> {
    const car = await this.carExtractor.getOneById(id);
    if (!car) {
      throw new CarNotFoundError(id);
    }

    car.delete();
    await this.carPersister.save(car);
  }
}
