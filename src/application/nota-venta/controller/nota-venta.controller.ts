import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotaVentaService } from '../service/nota-venta.service';

@Controller('nota-venta')
export class NotaVentaController {
  constructor(private readonly notaVentaService: NotaVentaService) {}

  @Get()
  findall() {
    return this.notaVentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notaVentaService.findOne(id);
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: number) {
    return this.notaVentaService.findByCliente(clienteId);
  }

  @Post()
  create(@Body() data: any) {
    return this.notaVentaService.create(data);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: number, @Body() body: { estado: string }) {
    return this.notaVentaService.updateEstado(id, body.estado);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notaVentaService.delete(id);
  }
}
