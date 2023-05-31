// middleware/authentication.ts

import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    // El usuario está autenticado, permitir el acceso
    return next();
  }
  
  // El usuario no está autenticado, redirigir o enviar una respuesta de error
  res.status(401).json({ error: 'Usuario no autenticado' });
};
