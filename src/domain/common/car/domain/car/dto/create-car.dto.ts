import { CarBrand, CarName, CarPrice, CarYear } from "../types";

export interface CreateCarDto {
  brand: CarBrand;
  name: CarName;
  year: CarYear;
  price: CarPrice;
}
