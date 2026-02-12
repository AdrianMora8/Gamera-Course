import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../adapters/jwt.adapter';
import { HandlerErrors } from '../helpers/handler-erros.helper';

export interface AuthenticatedRequest extends Request {
    uid?: string;
}

export const validateJWT = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.header('gamera-token');

        if (!token) {
            res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición',
                content: null
            });
            return;
        }

        const payload: Record<string, unknown> | null = await JwtAdapter.validateToken(token);
        if (!payload) {
            HandlerErrors.unauthorized('Token no válido');
        }
        req.uid= payload?.uid as string;


        next();
    } catch (e) {
        HandlerErrors.unauthorized('Token no válidoa');
    }
};