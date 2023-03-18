import { DomainEntity } from "@src/domain/common/types/domain-entity";
import { CarId, CarIdGenerator } from "./car-id";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CarCreatedEvent } from "./events/car-created.event";
import { CarDeletedEvent } from "./events/car-deleted.event";
import { CarUpdatedEvent } from "./events/car-updated.event";
import { CarBrand, CarDeletedAt, CarName, CarPrice, CarYear } from "./types";

export class Car extends DomainEntity<CarId> {
  constructor(
    public readonly id: CarId,
    public brand: CarBrand,
    public name: CarName,
    public year: CarYear,
    public price: CarPrice,
    public deletedAt?: CarDeletedAt,
  ) {
    super(id);
  }

  static from(id: CarId, brand: CarBrand, name: CarName, year: CarYear, price: CarPrice): Car {
    return new Car(id, brand, name, year, price);
  }

  static async create(idGenerator: CarIdGenerator, brand: CarBrand, name: CarName, year: CarYear, price: CarPrice): Promise<Car> {
    const id = await idGenerator.exec();
    const car = new Car(id, brand, name, year, price);
    car.addEvent(new CarCreatedEvent(id));
    return car;
  }

  update(dto: UpdateCarDto) {
    this.brand = dto.brand ? dto.brand : this.brand;
    this.name = dto.name ? dto.name : this.name;
    this.year = dto.year ? dto.year : this.year;
    this.price = dto.price ? dto.price : this.price;
    this.addEvent(new CarUpdatedEvent(this.id));
  }

  delete() {
    this.deletedAt = new Date().getUTCMilliseconds();
    this.addEvent(new CarDeletedEvent(this.id));
  }
}
