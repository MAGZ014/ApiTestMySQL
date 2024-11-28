import { BaseController } from "./BaseController.js"; // Ruta a tu controlador base
import { SubscriptionModel } from "../models/SubscriptionModel.js";
import { validateSubscription } from "../schema/subscriptionSchema.js";

export class SubscriptionController extends BaseController {
  constructor() {
    // Pasa el modelo y las validaciones al controlador base
    super(SubscriptionModel, validateSubscription);
  }
}
