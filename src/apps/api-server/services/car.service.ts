import { CreateCar } from "@src/domain/admin/usecase/car/create-car";
import { DeleteCar } from "@src/domain/admin/usecase/car/delete-car";
import { UpdateCar } from "@src/domain/admin/usecase/car/update-car";
import { GetCarsByBrand } from "@src/domain/catalogue/usecase/car/get-cars-by-brand";
import { CarId } from "@src/domain/common/car/domain/car/car-id";
import { CreateCarDto } from "@src/domain/common/car/domain/car/dto/create-car.dto";
import { UpdateCarDto } from "@src/domain/common/car/domain/car/dto/update-car.dto";
import { CarBrand } from "@src/domain/common/car/domain/car/types";
import { CarResponse } from "../response/car.response";
import { CarSerializer } from "../serializers/car.serializer";

export class CarService {
  constructor(
    private readonly getCarsByBrandUseCase: GetCarsByBrand,
    private readonly createCarUseCase: CreateCar,
    private readonly updateCarUseCase: UpdateCar,
    private readonly deleteCarUseCase: DeleteCar,
  ) {}

  async getCarsByBrand(brand: CarBrand): Promise<CarResponse[]> {
    const cars = await this.getCarsByBrandUseCase.execute(brand);
    return cars.map(CarSerializer.toJson);
  }

  async createCar({ brand, name, year, price }: CreateCarDto): Promise<CarResponse> {
    const car = await this.createCarUseCase.execute(brand, name, year, price);
    return CarSerializer.toJson(car);
  }

  async updateCar(id: CarId, dto: UpdateCarDto): Promise<CarResponse> {
    const car = await this.updateCarUseCase.execute(id, dto);
    return CarSerializer.toJson(car);
  }

  async deleteCar(id: CarId): Promise<void> {
    return this.deleteCarUseCase.execute(id);
  }
}
