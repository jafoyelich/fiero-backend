import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotaVenta } from '../entity/nota-venta.entity';
import { DetalleNotaVenta } from '../entity/detalle-nota-venta.entity';
import { Producto } from '../../productos/entity';

@Injectable()
export class NotaVentaService {
  constructor(
    @InjectRepository(NotaVenta)
    private readonly notaVentaRepository: Repository<NotaVenta>,
    @InjectRepository(DetalleNotaVenta)
    private readonly detalleRepository: Repository<DetalleNotaVenta>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<NotaVenta[]> {
    return this.notaVentaRepository.find({
      relations: ['detalles', 'detalles.producto'],
    });
  }

  async findOne(id: number): Promise<NotaVenta> {
    const notaVenta = await this.notaVentaRepository.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto'],
    });
    if (!notaVenta) {
      throw new NotFoundException(`Nota de venta #${id} not found`);
    }
    return notaVenta;
  }

  async create(data: any): Promise<NotaVenta> {
    const { cliente, detalles } = data;

    const notaVenta = this.notaVentaRepository.create({
      cliente,
      subtotal: 0,
      descuento: 0,
      total: 0,
    });

    const savedNotaVenta = await this.notaVentaRepository.save(notaVenta);

    let subtotal = 0;
    const detalleEntities = [];

    for (const detalle of detalles) {
      const producto = await this.productoRepository.findOne({
        where: { id: detalle.producto },
      });
      if (!producto) {
        throw new NotFoundException(`Product #${detalle.producto} not found`);
      }

      const precioUnitario = producto.precio;
      const total = detalle.cantidad * precioUnitario;
      subtotal += total;

      const detalleEntity = this.detalleRepository.create({
        notaVenta: savedNotaVenta,
        producto,
        cantidad: detalle.cantidad,
        precioUnitario,
        total,
      });
      detalleEntities.push(detalleEntity);
    }

    await this.detalleRepository.save(detalleEntities);

    const descuento = 0;
    const total = subtotal - descuento;

    savedNotaVenta.subtotal = subtotal;
    savedNotaVenta.descuento = descuento;
    savedNotaVenta.total = total;

    return this.notaVentaRepository.save(savedNotaVenta);
  }

  async updateEstado(id: number, estado: string): Promise<NotaVenta> {
    const notaVenta = await this.findOne(id);
    notaVenta.estado = estado;
    return this.notaVentaRepository.save(notaVenta);
  }

  async delete(id: number): Promise<void> {
    const notaVenta = await this.findOne(id);
    await this.notaVentaRepository.remove(notaVenta);
  }

  async findByCliente(cliente: number): Promise<NotaVenta[]> {
    return this.notaVentaRepository.find({
      where: { cliente: { id: cliente } },
      relations: ['detalles', 'detalles.producto'],
    });
  }
}
