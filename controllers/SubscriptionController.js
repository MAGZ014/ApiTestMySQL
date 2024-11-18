import { BaseController } from "./BaseController.js"; // Ruta a tu controlador base
import webPush from "../config/webPush.config.js"; // Configuración de web-push
import { SubscriptionModel } from "../models/SubscriptionModel.js";
import { validateSubscription } from "../schema/subscriptionSchema.js";

export class SubscriptionController extends BaseController {
  constructor() {
    // Pasa el modelo y las validaciones al controlador base
    super(SubscriptionModel, validateSubscription);
  }

  // Método para enviar notificaciones
  async sendNotification(req, res) {
    try {
      const { userId, message } = req.body;

      // Obtener suscripciones del usuario
      const subscriptions = await this.model.getByUserId(userId);
      if (!subscriptions || subscriptions.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay suscripciones para este usuario." });
      }

      const payload = JSON.stringify({ title: "Notificación", message });

      // Enviar notificaciones a todas las suscripciones del usuario
      const results = await Promise.all(
        subscriptions.map(async (subscription) => {
          const { endpoint, p256dh, auth } = subscription;
          const pushSubscription = {
            endpoint,
            keys: { p256dh, auth },
          };

          try {
            await webPush.sendNotification(pushSubscription, payload);
            return { success: true };
          } catch (error) {
            console.error("Error enviando notificación:", error);
            return { success: false, error: error.message };
          }
        })
      );

      res.status(200).json({ message: "Notificaciones enviadas", results });
    } catch (error) {
      console.error("Error enviando notificaciones:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
