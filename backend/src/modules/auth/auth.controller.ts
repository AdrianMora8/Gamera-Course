import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HandlerErrors } from "../../helpers/handler-erros.helper";

export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  register = async (req: Request, res: Response) => {
    const userData = req.body;
    const data = await this.authService.register(userData);

    res.status(200).json({
      ok: true,
      msg: 'registro exitoso',
      content: data

    })
    return;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await this.authService.login({ email, password });
    res.status(200).json({
      ok: true,
      msg: 'login exitoso',
      content: data 
    })
    }

  renewToken = async (req: Request, res: Response) => {
    const token = req.header('gamera-token');
    if (!token) HandlerErrors.unauthorized('No hay token en la petición');
    
    const data = await this.authService.renewToken(token!);
    res.status(200).json({
      ok: true,
      msg: 'token renovado exitosamente',
      content: data 
    })
  }
}
  
