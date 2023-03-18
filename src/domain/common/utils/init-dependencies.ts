import { createMongoClient } from "@src/db/mongo";
import { CreateCarUseCase } from "@src/domain/admin/usecase/car/create-car.usecase";
import { DeleteCarUseCase } from "@src/domain/admin/usecase/car/delete-car.usecase";
import { UpdateCarUseCase } from "@src/domain/admin/usecase/car/update-car.usecase";
import { GetCarsByBrandUseCase } from "@src/domain/catalogue/usecase/car/get-cars-by-brand.usecase";
import { MongoCarIdGenerator } from "@src/domain/common/car/persistence/mongo-car-id-generator";
import { MongoCarRepository } from "@src/domain/common/car/persistence/mongo-car-repository";
import { EventPublisher } from "../types/domain-event";

export interface InitDeps {
  eventPub: EventPublisher;
  carRepo: MongoCarRepository;
  carIdGenerator: MongoCarIdGenerator;

  createCarUseCase: CreateCarUseCase;
  updateCarUseCase: UpdateCarUseCase;
  deleteCarUseCase: DeleteCarUseCase;
  getCarsByBrandUseCase: GetCarsByBrandUseCase;
}

export async function initDependencies(eventPub: EventPublisher): Promise<InitDeps> {
  const mongoClient = await createMongoClient();
  const carRepo = new MongoCarRepository(mongoClient, eventPub);
  const carIdGenerator = new MongoCarIdGenerator();

  const createCarUseCase = new CreateCarUseCase(carIdGenerator, carRepo);
  const updateCarUseCase = new UpdateCarUseCase(carRepo, carRepo);
  const deleteCarUseCase = new DeleteCarUseCase(carRepo, carRepo);
  const getCarsByBrandUseCase = new GetCarsByBrandUseCase(carRepo);

  return {
    eventPub,
    carRepo,
    carIdGenerator,

    createCarUseCase,
    updateCarUseCase,
    deleteCarUseCase,
    getCarsByBrandUseCase,
  };
}
