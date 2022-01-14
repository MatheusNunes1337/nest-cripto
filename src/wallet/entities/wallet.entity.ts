import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Coin from './coin.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  address: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @OneToMany(() => Coin, (coins) => coins.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  coins: Coin[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', select: false })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt: Date;
}
