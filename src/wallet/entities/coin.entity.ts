import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('coin')
export default class Coin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  quoteTo: string;

  @Column({ nullable: false })
  currentCoin: string;

  @Column({ nullable: false })
  value: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.address)
  wallet: Wallet;
}
