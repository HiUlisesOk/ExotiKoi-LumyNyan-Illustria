import { Router } from "express";
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import userRoute from "../routes/user-routes";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(userRoute);

export default router;
