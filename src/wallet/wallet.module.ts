import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Coin from './entities/coin.entity';
import { WalletSerialize } from './wallet.serialize';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Coin])],
  controllers: [WalletController],
  providers: [WalletService, WalletSerialize],
})
export class WalletModule {}
