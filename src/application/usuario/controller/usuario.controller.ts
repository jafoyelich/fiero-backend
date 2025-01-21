import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from '../service';
import { Usuario } from '../entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usuario: Partial<Usuario>,
  ): Promise<Usuario> {
    const updatedUsuario = await this.usuarioService.update(id, usuario);
    if (!updatedUsuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updatedUsuario;
  }
}
