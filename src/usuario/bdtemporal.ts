export class Temporal {
  id: number;
  nombre: string;
  edad: number;

  constructor(id: number, nombre: string, edad: number) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
  }
}

export const usuarios: Temporal[] = [
  new Temporal(1, 'Juan', 20),
  new Temporal(2, 'Maria', 22),
  new Temporal(3, 'Pedro', 19),
];