import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

export type RoleName = 'player' | 'admin' | 'tester';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  name!: RoleName;
}
