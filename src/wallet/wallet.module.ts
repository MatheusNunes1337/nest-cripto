import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Coin from './entities/coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Coin])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
