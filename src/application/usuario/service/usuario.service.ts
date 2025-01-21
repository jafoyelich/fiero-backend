import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    usuario.password = await bcrypt.hash(usuario.password, salt);
    const nuevoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }
}
