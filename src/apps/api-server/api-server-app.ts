/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction, Express, Router } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import { configureRouter } from '@src/apps/api-server/routes/api-router';
import Paths from '@src/apps/api-server/routes/constants/Paths';

import EnvVars from '@src/apps/api-server/constants/EnvVars';
import HttpStatusCodes from '@src/apps/api-server/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/apps/api-server/constants/misc';
import { RouteError } from './other/classes';
import { initDependencies, InitDeps } from '@src/domain/common/utils/init-dependencies';
import { ApiServerEventBus } from './api-server-event-bus';
import { AuthController } from './routes/auth.controller';
import { UserController } from './routes/user.controller';
import { UserService } from './services/user.service';
import { CarController } from './routes/car.controller';
import { CarService } from './services/car.service';


// **** Export class ApiServer **** //

export class ApiServerApp {
  private app!: Express;
  private apiRouter!: Router;
  private coreDeps!: InitDeps;
  private deps!: any;

  async setup() {
    const { authController, carController, userController } = await this.initDependencies();
    // next you need to init api server dependencies
    // and only then configure express with AuthService, UserService, CarService
    this.apiRouter = configureRouter({ authController, carController, userController });
    this.app = this.configureExpress();
    return this;
  }

  private async initDependencies() {
    const eventBus = new ApiServerEventBus();
    const coreDeps = await initDependencies(eventBus);
    this.coreDeps = coreDeps;
    const authController = new AuthController();
    const userService = new UserService();
    const userController = new UserController(userService);
    const { getCarsByBrandUseCase, createCarUseCase, updateCarUseCase, deleteCarUseCase } = coreDeps;
    const carService = new CarService(getCarsByBrandUseCase, createCarUseCase, updateCarUseCase, deleteCarUseCase);
    const carController = new CarController(carService);
    this.deps = {
      authController,
      carService,
      carController,
      userService,
      userController,
    };
    return this.deps;
  }

  private configureExpress(): Express {
    // **** Variables **** //
    const app = express();

    // **** Setup **** //

    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(EnvVars.CookieProps.Secret));

    // Show routes called in console during development
    if (EnvVars.NodeEnv === NodeEnvs.Dev) {
      app.use(morgan('dev'));
    }

    // Security
    if (EnvVars.NodeEnv === NodeEnvs.Production) {
      app.use(helmet());
    }

    // Add APIs, must be after middleware
    app.use(Paths.Base, this.apiRouter);

    // Add error handler
    app.use((
      err: Error,
      _: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction,
    ) => {
      if (EnvVars.NodeEnv !== NodeEnvs.Test) {
        logger.err(err, true);
      }
      let status = HttpStatusCodes.BAD_REQUEST;
      if (err instanceof RouteError) {
        status = err.status;
      }
      return res.status(status).json({ error: err.message });
    });


    // ** Front-End Content ** //

    // Set views directory (html)
    const viewsDir = path.join(__dirname, 'views');
    app.set('views', viewsDir);

    // Set static directory (js and css).
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));

    // Nav to login pg by default
    app.get('/', (_: Request, res: Response) => {
      res.sendFile('login.html', { root: viewsDir });
    });

    // Redirect to login if not logged in.
    app.get('/users', (req: Request, res: Response) => {
      const jwt = req.signedCookies[EnvVars.CookieProps.Key];
      if (!jwt) {
        res.redirect('/');
      } else {
        res.sendFile('users.html', { root: viewsDir });
      }
    });

    return app;
  }

  start(): void {
    // **** Run **** //
    const SERVER_START_MSG = ('Express server started on port: ' +
      EnvVars.Port.toString());
    this.app.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
  }
}
