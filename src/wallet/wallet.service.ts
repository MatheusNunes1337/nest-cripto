import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletDto } from './dto/wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';

import { Wallet } from './entities/wallet.entity';
import Coin from './entities/coin.entity';
import { CoinDto } from './dto/coin.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Coin) private readonly coinRepository: Repository<Coin>,
  ) {}

  async create(createWalletDto: WalletDto): Promise<WalletDto> {
    const { cpf } = createWalletDto;
    const wallet = await this.walletRepository.findOne({ cpf });
    if (wallet) throw new ConflictException('This CPF is already in use');

    return this.walletRepository.save(createWalletDto);
  }

  findAll(filter: SearchWalletDto): Promise<Wallet[]> {
    return this.walletRepository.find(filter);
  }

  async findByAddress(address: string): Promise<WalletDto> {
    const wallet = await this.walletRepository.findOne({ address });
    if (!wallet) throw new NotFoundException('Wallet not found');

    return wallet;
  }

  async update(address: string, coinDto: Array<CoinDto>) {
    const result = await this.findByAddress(address);
    if (!result) throw new NotFoundException('Wallet not found');

    await Promise.all(
      coinDto.map(async (coin) => {
        const wallet = await this.coinRepository.findOne({
          where: { wallet: address, currentCoin: coin.currentCoin },
        });
        coin.wallet.address = address;
        if (wallet) return this.coinRepository.update(wallet.id, coin);
        else return this.coinRepository.save(coin);
      }),
    );
  }

  async remove(address: string): Promise<Record<never, string>> {
    console.log(address);
    const wallet = await this.findByAddress(address);
    if (!wallet) throw new NotFoundException('Wallet not found');

    return this.walletRepository.delete(address);
  }
}
