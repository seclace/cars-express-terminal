import { Axios } from "axios";
import { CreateCarOpts, UpdateCarOpts } from "../types";

export class CarsManagerApiService {
  private axios: Axios;

  constructor(baseURL: string) {
    this.axios = new Axios({ baseURL, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
  }

  async listCars(brand: string) {
    try {
      const { data } = await this.axios.get(`api/cars?brand=${brand}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async createCar(params: CreateCarOpts) {
    try {
      await this.axios.post(`api/cars`, JSON.stringify(params));
    } catch (err) {
      console.log(err);
    }
  }

  async updateCar(id: string, params: UpdateCarOpts) {
    try {
      await this.axios.patch(`api/cars/${id}`, JSON.stringify(params));
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCar(id: string) {
    try {
      await this.axios.delete(`api/cars/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}
