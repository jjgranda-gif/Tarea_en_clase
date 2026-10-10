import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { usuarios, Temporal } from './bdtemporal';

@Injectable()
export class UsuarioService {

  create(createUsuarioDto: CreateUsuarioDto) {

    const nuevoUsuario = new Temporal(
      usuarios.length + 1,
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
    return usuarios.find(usuario => usuario.id === id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
      return `Usuario con ID ${id} no encontrado`;
    }

    if (updateUsuarioDto.nombre !== undefined) {
      usuario.nombre = updateUsuarioDto.nombre;
    }

    if (updateUsuarioDto.edad !== undefined) {
      usuario.edad = updateUsuarioDto.edad;
    }

    return usuario;
  }

  remove(id: number) {

    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
      return `Usuario con ID ${id} no encontrado`;
    }

    const usuarioEliminado = usuarios.splice(indice, 1);

    return usuarioEliminado[0];
  }
}