import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserStatusEntity } from './user-status.entity';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'uuid', default: () => 'gen_random_uuid()' })
  @Index()
  uuid!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  account!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nickname?: string;

  @Column({ type: 'text', nullable: true })
  introduction?: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: '0.00' })
  balance!: string;

  @Column({ type: 'varchar', length: 20, default: 'TWD' })
  currency!: string;

  @Column({ type: 'varchar', length: 20, default: 'zh-TW' })
  language!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => UserStatusEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'status_id' })
  status!: UserStatusEntity;

  @ManyToOne(() => RoleEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity;
}
