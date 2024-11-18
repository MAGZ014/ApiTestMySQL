import { Router } from "express";
import { SubscriptionController } from "../../controllers/SubscriptionController.js";

export const subscriptionRouter = Router();
const subscriptionController = new SubscriptionController();

subscriptionRouter.get(
  "/",
  subscriptionController.getAll.bind(subscriptionController)
);
subscriptionRouter.post(
  "/subscribe",
  subscriptionController.create.bind(subscriptionController)
);
subscriptionRouter.post(
  "/send",
  subscriptionController.sendNotification.bind(subscriptionController)
);
