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
import { ShopEntity } from './shop.entity';
import { CommodityTranslationEntity } from './commodity-translation.entity';

@Entity('commodity')
export class CommodityEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'uuid', default: () => 'gen_random_uuid()' })
  @Index()
  uuid!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  introduction?: string;

  @Column({ type: 'varchar', length: 20, default: 'TWD' })
  currency!: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: '0.00' })
  price!: string;

  @Column({ type: 'int', default: 99, name: 'sort_order' })
  sortOrder!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => ShopEntity, { nullable: false })
  @JoinColumn({ name: 'shop_id' })
  shop!: ShopEntity;

  @OneToMany(() => CommodityTranslationEntity, (translation) => translation.commodity)
  translations!: CommodityTranslationEntity[];
}
