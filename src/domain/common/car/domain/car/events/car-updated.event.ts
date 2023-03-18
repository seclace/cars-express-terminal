import { CarId } from "@src/domain/common/car/domain/car/car-id";
import { DomainEvent } from "@src/domain/common/types/domain-event";

export class CarUpdatedEvent extends DomainEvent {
  constructor(readonly carId: CarId) {
    super();
  }
}
