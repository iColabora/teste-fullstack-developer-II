import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FieldsController from '../controllers/FieldsController';

const router = Router();
const controller = new FieldsController();

router.get('/', controller.index);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      label: Joi.string().required(),
      type: Joi.string().valid('text', 'bigtext', 'combo'),
      order: Joi.number().required(),
      options: Joi.array().items(Joi.string()).optional(),
    },
  }),
  controller.create
);

router.get(
  '/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().required(),
    },
  }),
  controller.show
);

router.put(
  '/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().required(),
    },
    [Segments.BODY]: {
      id: Joi.string().required(),
      label: Joi.string().required(),
      type: Joi.string().valid('text', 'bigtext', 'combo'),
      order: Joi.number().required(),
      options: Joi.array().items(Joi.string()).optional(),
    },
  }),
  controller.update
);

router.delete(
  '/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().required(),
    },
  }),
  controller.delete
);

export default router;
