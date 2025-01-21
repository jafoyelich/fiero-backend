import { Controller, Post, Body,} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const usuario = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(usuario);
  }
}
