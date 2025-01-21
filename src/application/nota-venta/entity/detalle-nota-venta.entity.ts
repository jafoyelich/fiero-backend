import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { NotaVenta } from './nota-venta.entity';
import { Producto } from '../../productos/entity';

@Entity('detalle_notas_venta')
export class DetalleNotaVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NotaVenta, (notaVenta) => notaVenta.detalles)
  notaVenta: NotaVenta;

  @ManyToOne(() => Producto, { eager: true, onDelete: 'CASCADE' })
  producto: Producto;

  @Column('int')
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
}
