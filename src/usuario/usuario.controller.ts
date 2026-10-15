import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Head,     // NUEVO: decorador para el método HTTP HEAD
  Options,  // NUEVO: decorador para el método HTTP OPTIONS
  Header,   // NUEVO: permite agregar headers personalizados a la respuesta
  HttpCode, // NUEVO: permite definir el código de estado de la respuesta
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

  // NUEVO - HEAD /usuario
  // Sirve para obtener solo los headers y el código de estado de la colección,
  // sin recibir el body. Útil para comprobar que el recurso existe y responde,
  // ahorrando ancho de banda.
  @Head()
  // Header personalizado de ejemplo, para ver en Postman que la respuesta

  // llega con cabeceras pero sin cuerpo.
  @Header('X-Recurso', 'usuario')
  // 200 OK: el recurso está disponible.
  @HttpCode(200)
  headUsuarios() {
    // No se devuelve nada: HEAD nunca lleva body.
    return;
  }

  // NUEVO - OPTIONS /usuario
  // Sirve para que el cliente consulte qué métodos HTTP acepta la colección.
  // También lo usan los navegadores en el preflight de CORS.
  @Options()
  // El header "Allow" lista los métodos permitidos en esta ruta.
  @Header('Allow', 'GET, POST, HEAD, OPTIONS')
  // 204 No Content: la petición fue exitosa pero no hay body que devolver.
  @HttpCode(204)
  optionsUsuarios() {
    return;
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // NUEVO - HEAD /usuario/:id
  // Sirve para verificar que un usuario específico responde, sin descargar
  // sus datos. Va ANTES del @Get(':id') porque Express usa el primer handler
  // que coincide, y un GET también atiende HEAD si no hay uno definido antes.
  @Head(':id')
  @HttpCode(200)

  headUsuario(@Param('id') id: string) {
    return;
  }

  // NUEVO - OPTIONS /usuario/:id
  // Informa los métodos permitidos sobre un usuario individual
  // (aquí sí se permiten PATCH y DELETE, pero no POST).
  @Options(':id')
  @Header('Allow', 'GET, PATCH, DELETE, HEAD, OPTIONS')
  @HttpCode(204)
  optionsUsuario() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

// CAMBIO ADICIONAL: se eliminó la línea
// /// <reference types="jest" />

// que estaba al inicio del archivo. Solo se usa en archivos de pruebas
// (.spec.ts) y no cumple ninguna función en un controlador.