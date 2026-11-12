import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUsuarioDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El nombre debe ser texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre!: string;

  @IsInt({ message: 'La edad debe ser un número entero.' })
  @Min(0, { message: 'La edad no puede ser negativa.' })
  edad!: number;
}
