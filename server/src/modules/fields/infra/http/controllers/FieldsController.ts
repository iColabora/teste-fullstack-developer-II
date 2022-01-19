import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFieldService from '../../../services/ListFieldService';
import CreateFieldService from '../../../services/CreateFieldService';
import ShowFieldService from '../../../services/ShowFieldService';
import UpdateFieldService from '../../../services/UpdateFieldService';
import DeleteFieldService from '../../../services/DeleteFieldService';

class FieldsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listService = container.resolve(ListFieldService);

    const list = await listService.execute();

    return res.json(list);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id, label, type, order, options } = req.body;

    const createService = container.resolve(CreateFieldService);

    const created = await createService.execute({
      id,
      label,
      type,
      order,
      options,
    });

    return res.json(created);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { uid } = req.params;

    const showService = container.resolve(ShowFieldService);

    const show = await showService.execute({
      uid,
    });

    return res.json(show);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { uid } = req.params;
    const { id, label, type, order, options } = req.body;

    const updateService = container.resolve(UpdateFieldService);

    const item = await updateService.execute({
      uid,
      id,
      label,
      type,
      order,
      options,
    });

    return res.json(item);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { uid } = req.params;

    const deleteService = container.resolve(DeleteFieldService);

    const response = await deleteService.execute({
      uid,
    });

    return res.json(response);
  }
}

export default FieldsController;
