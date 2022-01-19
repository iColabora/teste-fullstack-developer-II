import { Router } from 'express';

import fieldsRoutes from '@modules/fields/infra/http/routes/fields.routes';

const routes = Router();

routes.post('/', (req, res) => res.status(401).send('Permission Denied'));
routes.get('/', (req, res) => res.status(401).send('Permission Denied'));
routes.get('/health', (req, res) => res.json({ up: true }));

routes.use('/fields', fieldsRoutes);

export default routes;
