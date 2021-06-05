import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ description: 'The name of user' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'The lastname of user' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
