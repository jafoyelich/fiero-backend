import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return cliente;
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    const nuevoCliente = this.clienteRepository.create(data);
    return this.clienteRepository.save(nuevoCliente);
  }

  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    const Cliente = await this.findOne(id);
    Object.assign(Cliente, data);
    return this.clienteRepository.save(Cliente);
  }

  async delete(id: number): Promise<void> {
    const Cliente = await this.findOne(id);
    await this.clienteRepository.remove(Cliente);
  }
}
