import { Router } from 'express';

import * as CampoController from '../controllers/campoController';

const router = Router();



router.get('/campos', CampoController.mostraCampos);

router.post('/campoNovo',CampoController.newCampo);

export default router;