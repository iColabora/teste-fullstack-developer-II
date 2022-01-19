import { container } from 'tsyringe';

import IFieldsRepository from './IFieldsRepository';
import FieldsRepository from '../infra/typeorm/repositories/FieldsRepository';

container.registerSingleton<IFieldsRepository>(
  'FieldsRepository',
  FieldsRepository
);
