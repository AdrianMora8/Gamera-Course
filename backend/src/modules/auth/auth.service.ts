import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { LoginData, UserData } from "./auth.interface";
import { AuthRepository } from "./auth.repository";
import { HandlerErrors } from "../../helpers/handler-erros.helper";
import { JwtAdapter } from "../../adapters/jwt.adapter";

export class AuthService {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  register = async (data: UserData): Promise<UserData | void > => {
    const { password, email } = data;
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) HandlerErrors.badRequest("El usuario ya existe");

    const salt = genSaltSync(5);
    const hashedPassword = hashSync(password, salt);
    const newUser = await this.authRepository.createUser({ 
      ...data, email, password: hashedPassword 
    });

    return newUser;
  }

  login = async (data: LoginData): Promise<Partial<UserData> & { token: string } | void>  => {

    const { email, password } = data;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) return HandlerErrors.unauthorized("Credenciales incorrectas");
 
    const isPasswordValid: boolean = compareSync(password, user.password);
    if (!isPasswordValid) return HandlerErrors.unauthorized("Credenciales incorrectas");

    const token = await JwtAdapter.generateToken({
      uid: user._id,
    });

    const dataUser = {
      id: user._id,
      completeName: `${user.name} ${user.lastName}`,
      email : user.email,
      token: token as string
    }

    return dataUser;
  }

  renewToken = async (token: string): Promise<{ token: string } | void> => {
    const payload: Record<string, unknown> | null = await JwtAdapter.validateToken(token);
    const user = await this.authRepository.findUserById((payload as any).uid);
    if (!user) return HandlerErrors.unauthorized("Usuario no encontrado");

    const newToken = await JwtAdapter.generateToken({
      uid: user._id,
    });

        const dataUser = {
      id: user._id,
      completeName: `${user.name} ${user.lastName}`,
      email : user.email,
      token: newToken as string
    }

    return dataUser;
  }
}
