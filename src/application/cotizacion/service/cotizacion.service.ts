import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cotizacion } from '../entity';
import { DetalleCotizacion } from '../entity';
import { Producto } from '../../productos/entity';

@Injectable()
export class CotizacionService {
  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepository: Repository<Cotizacion>,
    @InjectRepository(DetalleCotizacion)
    private readonly detalleCotizacionRepository: Repository<DetalleCotizacion>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Cotizacion[]> {
    return this.cotizacionRepository.find();
  }

  async findOne(id: number): Promise<Cotizacion> {
    const cotizacion = await this.cotizacionRepository.findOne({
      where: { id },
    });
    if (!cotizacion) {
      throw new NotFoundException(`Cotizacion #${id} not found`);
    }
    return cotizacion;
  }

  async create(data: any): Promise<Cotizacion> {
    const { cliente, detalles, diasValidez } = data;
    const now = new Date();

    const fechaVencimiento = new Date();
    const dias = diasValidez || 2;
    fechaVencimiento.setDate(now.getDate() + dias);

    const cotizacion = this.cotizacionRepository.create({
      cliente,
      fecha: now,
      fechaVencimiento,
      subtotal: 0,
      descuento: 0,
      total: 0,
    });

    const savedCotizacion = await this.cotizacionRepository.save(cotizacion);

    let subtotal = 0;
    const detalleEntities = [];

    for (const detalle of detalles) {
      const producto = await this.productoRepository.findOne({
        where: { id: detalle.producto },
      });

      if (!producto) {
        throw new NotFoundException(`Producto #${detalle.producto} not found`);
      }

      const precioUnitario = producto.precio;
      const total = precioUnitario * detalle.cantidad;
      subtotal += total;

      const detalleEntity = this.detalleCotizacionRepository.create({
        cotizacion: savedCotizacion,
        producto,
        cantidad: detalle.cantidad,
        precioUnitario,
        total,
      });

      detalleEntities.push(detalleEntity);
    }

    await this.detalleCotizacionRepository.save(detalleEntities);

    const descuento = 0;
    const total = subtotal - descuento;

    savedCotizacion.subtotal = subtotal;
    savedCotizacion.descuento = descuento;
    savedCotizacion.total = total;

    return await this.cotizacionRepository.save(savedCotizacion);
  }

  async delete(id: number): Promise<void> {
    const cotizacion = await this.findOne(id);
    await this.cotizacionRepository.remove(cotizacion);
  }

  async findByCliente(clienteId: number): Promise<Cotizacion[]> {
    return this.cotizacionRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['detalles', 'detalles.producto'],
    });
  }
}
