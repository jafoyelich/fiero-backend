import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../../usuario/service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const { password, ...result } = usuario;
      return result;
    }
    throw new UnauthorizedException('Correo o contraseña incorrectos');
  }

  async login(usuario: any) {
    const payload = { email: usuario.email, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
