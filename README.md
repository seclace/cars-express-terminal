## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).


## How to use

### `npm run build` to make js cli available
### `npm link` to make `cars-manager` available in env
### `npm run dev` to run the server
### `cars-manager command [options]` to interact with cli

## `cars-manager` commands
### Display cli's help and available commands `cars-manager -h`
### List cars by brand `cars-manager list -b Bugatti`
### Create a car `cars-manager create -b Bugatti -n Veyron -y 2022 -price 150000`
### Update a car `cars-manager update 6415df62c8dc3871abdebf3c -n Chiron -y 2023 -price 250000`
### Delete a car `cars-manager delete 6415df62c8dc3871abdebf3c`

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
