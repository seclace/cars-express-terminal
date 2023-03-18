import { Request, Response, Router } from 'express';
import { body as validateBody, param as validateParam } from 'express-validator';

import adminMw from './middleware/adminMw';
import Paths from './constants/Paths';
import User from '@api-server/models/User';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { CarController } from './car.controller';


interface RouterDeps {
  authController: AuthController;
  userController: UserController;
  carController: CarController;
}

// **** Variables **** //

export function configureRouter({ authController, carController, userController }: RouterDeps): Router {

  const apiRouter = Router({ strict: true });


  // **** Setup **** //

  const authRouter = Router();

  // Login user
  authRouter.post(
    Paths.Auth.Login,
    validateBody('email').isString().isEmail().notEmpty(),
    validateBody('password').isString().notEmpty(),
    (req: Request, res: Response) => authController.login(req, res),
  );

  // Logout user
  authRouter.get(
    Paths.Auth.Logout,
    (req: Request, res: Response) => authController.logout(req, res),
  );

  // Add AuthRouter
  apiRouter.use(Paths.Auth.Base, authRouter);


  // ** Add UserRouter ** //

  const userRouter = Router();

  // Get all users
  userRouter.get(
    Paths.Users.Get,
    (req: Request, res: Response) => userController.getAll(req, res),
  );

  // Add one user
  userRouter.post(
    Paths.Users.Add,
    validateBody().custom(User.isUser),
    (req: Request, res: Response) => userController.add(req, res),
  );

  // Update one user
  userRouter.put(
    Paths.Users.Update,
    validateBody().custom(User.isUser),
    (req: Request, res: Response) => userController.update(req, res),
  );

  // Delete one user
  userRouter.delete(
    Paths.Users.Delete,
    validateParam('id').isNumeric(),
    (req: Request, res: Response) => userController.delete(req, res),
  );

  // Add UserRouter
  apiRouter.use(Paths.Users.Base, adminMw, userRouter);


  // ** Add CarsRouter ** //

  const carsRouter = Router();

  // Get all cars
  carsRouter.get(
    Paths.Cars.Get,
    validateBody('brand').isString().notEmpty(),
    (req: Request, res: Response) => carController.getAll(req, res),
  );

  // Add one car
  carsRouter.post(
    Paths.Cars.Add,
    // adminMw,
    validateBody('brand').isString().notEmpty(),
    validateBody('name').isString().notEmpty(),
    validateBody('year').isNumeric(),
    validateBody('price').isNumeric(),
    (req: Request, res: Response) => carController.add(req, res),
  );

  // Update one car
  carsRouter.patch(
    Paths.Cars.Update,
    // adminMw,
    validateParam('id').isString(),
    validateBody('brand').isString().optional().notEmpty(),
    validateBody('name').isString().optional().notEmpty(),
    validateBody('year').isNumeric().optional(),
    validateBody('price').isNumeric().optional(),
    (req: Request, res: Response) => carController.update(req, res),
  );

  // Delete one car
  carsRouter.delete(
    Paths.Cars.Delete,
    // adminMw,
    validateParam('id').isString(),
    (req: Request, res: Response) => carController.delete(req, res),
  );

  // Add UserRouter
  apiRouter.use(Paths.Cars.Base, carsRouter);

  return apiRouter;
}


/*
Promise.resolve()
  .then(() => console.log('Promise 1'));
 
Promise.resolve()
  .then(() => console.log('Promise 2'));
 
window.requestAnimationFrame(() => {
  console.log('rAF 1');
 
  Promise.resolve()
    .then(() => console.log('Promise 3'))
    .then(() => console.log('Promise 4'));
});
 
window.requestAnimationFrame(() => {
  console.log('rAF 2');
 
  Promise.resolve()
    .then(() => console.log('Promise 5'));
});
*/