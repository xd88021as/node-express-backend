import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CommodityEntity } from './commodity.entity';

@Entity('commodity_translation')
@Index(['commodity', 'locale'], { unique: true })
export class CommodityTranslationEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 20 })
  @Index()
  locale!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  introduction?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => CommodityEntity, (commodity) => commodity.translations, { nullable: false })
  @JoinColumn({ name: 'commodity_id' })
  commodity!: CommodityEntity;
}
