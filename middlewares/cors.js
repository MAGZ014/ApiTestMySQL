// corsConfig.js
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:8081/",
  "http://localhost:8081",
  "https://3507-189-128-182-21.ngrok-free.app",
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true, // Permite el uso de credenciales (cookies, Authorization headers, TLS client certificates)
};
