import { ClientModel } from "../models/clientModel.js";

import {
  validateClient,
  validatePartialClient,
} from "../schema/clientSchema.js";

export class ClientController {
  //Obtener todos los clientes
  static async getAll(req, res) {
    const clients = await ClientModel.getAll();
    res.json(clients);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const client = await ClientModel.getById({ id });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  }

  static async create(req, res) {
    const result = validateClient(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newclient = await ClientModel.create({ input: result.data });
    res.status(201).json(newclient);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await ClientModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.json({ message: "Client deleted" });
  }

  static async update(req, res) {
    const result = validatePartialClient(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedClient = await ClientModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedClient);
  }
}
