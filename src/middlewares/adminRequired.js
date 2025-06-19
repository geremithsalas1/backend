import { verifyToken } from "../utils/jwt.js";

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const payload = verifyToken(token);
    if (payload.role !== 3) { // Suponiendo que el rol admin es 1
      return res.status(403).json({ message: "Acceso denegado" });
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
}