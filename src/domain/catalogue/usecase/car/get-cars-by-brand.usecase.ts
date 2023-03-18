import { Car } from "@src/domain/common/car/domain/car/car";
import { CarBrand } from "@src/domain/common/car/domain/car/types";
import { CarExtractor } from "@src/domain/common/car/usecase/car-extractor";
import { GetCarsByBrand } from "./get-cars-by-brand";

export class GetCarsByBrandUseCase implements GetCarsByBrand {
  constructor(
    private readonly carExtractor: CarExtractor,
  ) {}

  async execute(brand: CarBrand): Promise<Car[]> {
    return this.carExtractor.getByBrand(brand);
  }
}
