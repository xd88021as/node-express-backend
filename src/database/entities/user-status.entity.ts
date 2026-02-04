import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('user_status')
export class UserStatusEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  name!: string;
}
