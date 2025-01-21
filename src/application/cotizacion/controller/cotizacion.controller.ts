import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CotizacionService } from '../service';
import { Cotizacion } from '../entity';

@Controller('cotizacion')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  @Get()
  async findAll(): Promise<Cotizacion[]> {
    return this.cotizacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cotizacion> {
    return this.cotizacionService.findOne(+id);
  }

  @Get('cliente/:cleinteId')
  async findByCliente(@Param('clienteId') clienteId: number) {
    return this.cotizacionService.findByCliente(clienteId);
  }

  @Post()
  async create(@Body() data: any): Promise<Cotizacion> {
    return this.cotizacionService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.cotizacionService.delete(id);
  }
}
