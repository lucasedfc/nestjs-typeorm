import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ description: 'The role of user' })
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty({ description: 'The password of user' })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;

  @ApiProperty({ description: 'The email of user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The customerId' })
  @IsOptional()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
