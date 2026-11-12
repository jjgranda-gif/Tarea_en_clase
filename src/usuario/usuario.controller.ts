import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  HttpCode,
  Options,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  // HEAD /usuario: solo cabeceras y estado, sin cuerpo.
  @Head()
  @Header('X-Recurso', 'usuario')
  @HttpCode(200)
  headUsuarios() {
    return;
  }

  // OPTIONS /usuario: métodos permitidos en la colección.
  @Options()
  @Header('Allow', 'GET, POST, HEAD, OPTIONS')
  @HttpCode(204)
  optionsUsuarios() {
    return;
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // HEAD /usuario/:id: 200 si existe, 404 si no (sin cuerpo en ambos casos).
  @Head(':id')
  @HttpCode(200)
  headUsuario(@Param('id', ParseIntPipe) id: number) {
    this.usuarioService.findOne(id);
    return;
  }

  // OPTIONS /usuario/:id: métodos permitidos sobre un usuario.
  @Options(':id')
  @Header('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS')
  @HttpCode(204)
  optionsUsuario() {
    return;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id);
  }

  // PUT: reemplaza el usuario completo (nombre y edad obligatorios).
  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuarioService.replace(id, createUsuarioDto);
  }

  // PATCH: actualiza solo los campos enviados.
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
  }
}
