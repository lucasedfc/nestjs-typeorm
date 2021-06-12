import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;
}
