import { database } from "../config/database";

export default class Icolabora {
  static list(req, res) {
    res.json(database);
  }

  static create(req, res) {
    try {
      const fields = req.validatedData;

      database.push(fields);

      res.status(201).json(fields);
    } catch (e) {
      console.error(e);
    }
  }
}
