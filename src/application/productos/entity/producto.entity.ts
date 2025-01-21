import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleCotizacion } from '../../cotizacion/entity';
import { DetalleNotaVenta } from '../../nota-venta/entity/detalle-nota-venta.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  unidad: string;

  @Column()
  marca: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int', { default: 0 })
  stock: number;

  @OneToMany(() => DetalleCotizacion, (detalle) => detalle.producto)
  detalles: DetalleCotizacion[];

  @OneToMany(() => DetalleNotaVenta, (detalle) => detalle.producto)
  detallesNotaVenta: DetalleNotaVenta[];
}
