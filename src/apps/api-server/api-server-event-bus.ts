import { DomainEvent, EventPublisher } from "@src/domain/common/types/domain-event";

export class ApiServerEventBus implements EventPublisher {
  async publish(events: DomainEvent[]): Promise<void> {
    console.log(events);
  }
}
