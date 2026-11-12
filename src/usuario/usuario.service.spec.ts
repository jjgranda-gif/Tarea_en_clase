import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('lista los usuarios iniciales', () => {
    expect(service.findAll().length).toBeGreaterThanOrEqual(3);
  });

  it('crea un usuario con id nuevo', () => {
    const ana = service.create({ nombre: 'Ana', edad: 21 });
    expect(service.findOne(ana.id)).toEqual(ana);
  });

  it('no repite ids después de eliminar', () => {
    const a = service.create({ nombre: 'A', edad: 20 });
    service.remove(a.id);
    const b = service.create({ nombre: 'B', edad: 20 });
    expect(b.id).not.toBe(a.id);
  });

  it('actualiza solo el campo enviado', () => {
    const u = service.create({ nombre: 'Luis', edad: 30 });
    const r = service.update(u.id, { edad: 31 });
    expect(r).toMatchObject({ nombre: 'Luis', edad: 31 });
  });

  it('lanza 404 si el usuario no existe', () => {
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
    expect(() => service.remove(9999)).toThrow(NotFoundException);
  });

  it('PUT reemplaza nombre y edad', () => {
    const u = service.create({ nombre: 'Eva', edad: 25 });
    const r = service.replace(u.id, { nombre: 'Eva Maria', edad: 26 });
    expect(r).toMatchObject({ id: u.id, nombre: 'Eva Maria', edad: 26 });
  });

  it('PUT lanza 404 si el usuario no existe', () => {
    expect(() => service.replace(9999, { nombre: 'X', edad: 1 })).toThrow(
      NotFoundException,
    );
  });
});
