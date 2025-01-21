import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cotizacion } from './cotizacion.entity';
import { Producto } from '../../productos/entity';

@Entity('detalle_cotizaciones')
export class DetalleCotizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cotizacion, (cotizacion) => cotizacion.detalles)
  cotizacion: Cotizacion;

  @ManyToOne(() => Producto, { eager: true, onDelete: 'CASCADE' })
  producto: Producto;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
