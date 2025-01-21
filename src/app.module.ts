import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './application/auth/auth.module';
import { ClienteModule } from './application/cliente/cliente.module';
import { ProductosModule } from './application/productos/productos.module';
import { CotizacionModule } from './application/cotizacion/cotizacion.module';
import { NotaVentaModule } from './application/nota-venta/nota-venta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'fiero',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ApplicationModule,
    AuthModule,
    ClienteModule,
    ProductosModule,
    CotizacionModule,
    NotaVentaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
