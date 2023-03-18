export interface ListCarsOpts {
  brand: string;
}

export interface CreateCarOpts {
  brand: string;
  name: string;
  year: number;
  price: number;
}

export interface UpdateCarOpts {
  brand?: string;
  name?: string;
  year?: number;
  price?: number;
}
