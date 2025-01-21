import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Cliente } from '../../cliente/entity';
import { DetalleCotizacion } from './detalle-cotizacion.entity';

@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.cotizaciones, { eager: true })
  cliente: Cliente;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  descuento: number;

  @Column({ type: 'timestamp' })
  fechaVencimiento: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @OneToMany(() => DetalleCotizacion, (detalle) => detalle.cotizacion, {
    cascade: true,
    eager: true,
  })
  detalles: DetalleCotizacion[];
}
