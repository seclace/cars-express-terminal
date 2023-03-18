import { EventPublisher } from "../../types/domain-event";
import { Car } from "../domain/car/car";
import { CarId } from "../domain/car/car-id";
import { CarBrand } from "../domain/car/types";
import { CarExtractor } from "../usecase/car-extractor";
import { CarPersister } from "../usecase/car-persister";
import { Db as MongoDB, ObjectId } from 'mongodb';
import { MongoTable } from "@src/db/constants";

export class MongoCarRepository implements CarExtractor, CarPersister {
  constructor(
    private readonly mongo: MongoDB,
    private readonly eventPub: EventPublisher,
  ) { }

  async getOneById(id: CarId): Promise<Car | undefined> {
    const item = await this.mongo.collection(MongoTable.Cars).findOne<Car & { _id: ObjectId }>({ _id: new ObjectId(id) });
    if (!item) {
      return;
    }
    return Car.from(item._id.toString(), item.brand, item.name, item.year, item.price);
  }

  async getByBrand(brand: CarBrand): Promise<Car[]> {
    const items = await this.mongo.collection(MongoTable.Cars).find<Car & { _id: ObjectId }>({ brand }).toArray();
    return items.map(item => Car.from(item._id.toString(), item.brand, item.name, item.year, item.price));
  }

  async save(car: Car): Promise<void> {
    const collection = this.mongo.collection(MongoTable.Cars);
    const id = new ObjectId(car.id);
    const item = await collection.findOne<Car & { _id: ObjectId }>({ _id: id });

    if (car.deletedAt) {
      await collection.deleteOne({ _id: id });
    } else if (!item) {
      await collection.insertOne({ _id: id, brand: car.brand, name: car.name, year: car.year, price: car.price });
    } else {
      await collection.updateOne({ _id: id }, { $set: { brand: car.brand, name: car.name, year: car.year, price: car.price } });
    }

    const events = car.popEvents();
    await this.eventPub.publish(events);
  }
}
