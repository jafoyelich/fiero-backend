import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cotizacion } from '../../cotizacion/entity/cotizacion.entity';
import { NotaVenta } from '../../nota-venta/entity/nota-venta.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  //unico y nullable
  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  direccion: string;

  @OneToMany(() => Cotizacion, (cotizacion) => cotizacion.cliente)
  cotizaciones: Cotizacion[];

  @OneToMany(() => NotaVenta, (notaVenta) => notaVenta.cliente)
  notasVenta: NotaVenta[];
}
