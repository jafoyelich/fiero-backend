import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacion } from './entity';
import { DetalleCotizacion } from './entity';
import { CotizacionController } from './controller';
import { CotizacionService } from './service';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cotizacion, DetalleCotizacion]),
    ProductosModule,
  ],
  controllers: [CotizacionController],
  providers: [CotizacionService],
})
export class CotizacionModule {}
