import { ObjectId } from "mongodb";
import { CarId, CarIdGenerator } from "../domain/car/car-id";

export class MongoCarIdGenerator implements CarIdGenerator {
  async exec(): Promise<CarId> {
    return new ObjectId().toString();
  }
}
