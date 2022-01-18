import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('coin')
export default class Coin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  coin: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false, type: 'float' })
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.coins, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  wallet: Wallet;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', select: false })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt: Date;
}
