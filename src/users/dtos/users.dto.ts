import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ description: 'The name of user' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'The username of user' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty({ description: 'The email of user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
