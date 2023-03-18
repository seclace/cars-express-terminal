export type CarId = string;

export interface CarIdGenerator {
  exec(): Promise<CarId>;
}
