import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Temporal, usuarios } from './bdtemporal';

@Injectable()
export class UsuarioService {
  // El id nunca se reutiliza, aunque se eliminen usuarios.
  private siguienteId = Math.max(0, ...usuarios.map((u) => u.id)) + 1;

  create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = new Temporal(
      this.siguienteId++,
      createUsuarioDto.nombre,
      createUsuarioDto.edad,
    );
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  findAll() {
    return usuarios;
  }

  findOne(id: number) {
    return this.buscar(id);
  }

  // PUT: reemplaza el usuario completo (nombre y edad obligatorios).
  replace(id: number, createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.buscar(id);
    usuario.nombre = createUsuarioDto.nombre;
    usuario.edad = createUsuarioDto.edad;
    return usuario;
  }

  // PATCH: actualiza solo los campos enviados.
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.buscar(id);
    if (updateUsuarioDto.nombre !== undefined) {
      usuario.nombre = updateUsuarioDto.nombre;
    }
    if (updateUsuarioDto.edad !== undefined) {
      usuario.edad = updateUsuarioDto.edad;
    }
    return usuario;
  }

  remove(id: number) {
    const usuario = this.buscar(id);
    usuarios.splice(usuarios.indexOf(usuario), 1);
    return usuario;
  }

  private buscar(id: number): Temporal {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }
}
