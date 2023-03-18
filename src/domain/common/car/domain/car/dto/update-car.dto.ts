import { CarBrand, CarName, CarPrice, CarYear } from "../types";

export interface UpdateCarDto {
  brand?: CarBrand;
  name?: CarName;
  year?: CarYear;
  price?: CarPrice;
}
