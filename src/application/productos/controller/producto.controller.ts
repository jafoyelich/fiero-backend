import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductosService } from '../service/producto.service';
import { Producto } from '../entity/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Producto> {
    return this.productosService.findOne(id);
  }

  @Get('nombre/:nombre')
  findByNombre(@Param('nombre') nombre: string): Promise<Producto> {
    return this.productosService.findByNombre(nombre);
  }

  @Get('marca/:marca')
  findByMarca(@Param('marca') marca: string): Promise<Producto[]> {
    return this.productosService.findByMarca(marca);
  }

  @Post()
  create(@Body() data: Partial<Producto>): Promise<Producto> {
    return this.productosService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Producto>,
  ): Promise<Producto> {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productosService.delete(id);
  }
}
