import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

// PATCH: los campos son opcionales, pero si llegan se validan igual.
export class UpdateUsuarioDto {
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El nombre debe ser texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre?: string;

  @IsOptional()
  @IsInt({ message: 'La edad debe ser un número entero.' })
  @Min(0, { message: 'La edad no puede ser negativa.' })
  edad?: number;
}
