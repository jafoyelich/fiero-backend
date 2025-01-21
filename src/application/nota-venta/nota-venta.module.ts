import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaVenta } from './entity/nota-venta.entity';
import { DetalleNotaVenta } from './entity/detalle-nota-venta.entity';
import { NotaVentaService } from './service/nota-venta.service';
import { NotaVentaController } from './controller/nota-venta.controller';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotaVenta, DetalleNotaVenta]),
    ProductosModule,
  ],
  providers: [NotaVentaService],
  controllers: [NotaVentaController],
})
export class NotaVentaModule {}
