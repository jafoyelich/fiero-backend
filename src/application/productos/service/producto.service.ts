import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entity/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async create(data: Partial<Producto>): Promise<Producto> {
    const nuevoProducto = this.productoRepository.create(data);
    return this.productoRepository.save(nuevoProducto);
  }

  async update(id: number, data: Partial<Producto>): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.productoRepository.save(producto);
  }

  async delete(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }

  async findByNombre(nombre: string): Promise<Producto> {
    return this.productoRepository.findOne({ where: { nombre } });
  }

  async findByMarca(marca: string): Promise<Producto[]> {
    return this.productoRepository.find({ where: { marca } });
  }
}
