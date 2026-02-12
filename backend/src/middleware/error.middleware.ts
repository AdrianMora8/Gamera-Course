import type { Request, Response, NextFunction } from "express";

export function errorMiddleware(
    err: any,
    _: Request,
    res: Response,
    _next: NextFunction
) {

    let error;

    try {
        // Intentar parsear el mensaje del error como JSON
        error = JSON.parse(err.message);
    } catch {
        // Si no se puede parsear, usar el error original
        error = {
            status: 500,
            message: err.message || "Internal Server Error"
        };
    }


    res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Internal Server Error",
        content: null,
    });
}
