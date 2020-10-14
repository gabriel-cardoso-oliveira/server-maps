import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import LocationController from './app/controllers/LocationController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/locations', LocationController.locations);
routes.post('/sync', LocationController.sync);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.put('/users-status', UserController.updateStatus);
routes.get('/users', UserController.index);
routes.get('/users-locations', LocationController.index);
routes.post('/users-locations', LocationController.show);

export default routes;
