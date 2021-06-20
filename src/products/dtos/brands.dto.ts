import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

export class UpdateBrandsDto extends PartialType(CreateBrandsDto) {}
