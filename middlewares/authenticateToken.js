import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ?? "587049cf-e776-461c-a7e2-b5d1602037d2";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; // Leer token de cookies
  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
};
