import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [UsuarioModule, AuthModule, ProductosModule],
})
export class ApplicationModule {}
