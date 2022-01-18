import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CoinDto } from './coin.dto';
import { WalletDto } from './wallet.dto';

export class UpdateWalletDto extends PartialType(WalletDto) {
  @ApiProperty({
    description: 'Coins of wallet',
    required: true,
  })
  coins: CoinDto[];
}
