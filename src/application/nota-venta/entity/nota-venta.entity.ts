import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from '../../cliente/entity';
import { DetalleNotaVenta } from './detalle-nota-venta.entity';

@Entity('notas_venta')
export class NotaVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.notasVenta, { eager: true })
  cliente: Cliente;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  descuento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @OneToMany(() => DetalleNotaVenta, (detalle) => detalle.notaVenta, {
    cascade: true,
    eager: true,
  })
  detalles: DetalleNotaVenta[];
}
