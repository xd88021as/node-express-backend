import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommodityEntity } from './commodity.entity';

@Entity('shop')
export class ShopEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'uuid', default: () => 'gen_random_uuid()' })
  @Index()
  uuid!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'local_phone_number' })
  localPhoneNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'mobile_phone_number' })
  mobilePhoneNumber?: string;

  @Column({ type: 'text', nullable: true })
  introduction?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => CommodityEntity, (commodity) => commodity.shop)
  commodities!: CommodityEntity[];
}
