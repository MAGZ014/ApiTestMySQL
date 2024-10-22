import { BaseController } from "./baseController.js";
import { ClientModel } from "../models/clientModel.js";
import {
  validateClient,
  validatePartialClient,
} from "../schema/clientSchema.js";

export class ClientController extends BaseController {
  constructor() {
    super(ClientModel, validateClient, validatePartialClient);
  }
}
