import {
  BadRequestException,
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
import { AddressDto } from './dto/address.dto';
import { convertCoin } from 'src/utils/convertCoin';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

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

  async findAll(
    options: IPaginationOptions,
    filter: SearchWalletDto,
  ): Promise<Pagination<Wallet>> {
    return await paginate<Wallet>(this.walletRepository, options, {
      where: filter,
    });
  }

  async findByAddress(address: AddressDto): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(address);
    if (!wallet) throw new NotFoundException('Wallet not found');

    return wallet;
  }

  async update(address: AddressDto, coinDto: CoinDto[]) {
    const result = await this.findByAddress(address);
    if (!result) throw new NotFoundException('Wallet not found');

    await Promise.all(
      coinDto.map(async (coin) => {
        const wallet = await this.coinRepository.findOne({
          where: { wallet: address, coin: coin.quoteTo },
        });

        const response = await convertCoin(coin.quoteTo, coin.currentCoin);
        const coinFullname = response.name.split('/')[1];

        const payload = {
          coin: response.codein,
          fullname: coinFullname,
          amount: null,
          wallet: result,
        };

        if (wallet) {
          payload.amount = wallet.amount + response.ask * coin.value;
          if (payload.amount < 0)
            throw new BadRequestException(
              'It seems like you do not have enough balance',
            );
          return this.coinRepository.update(wallet.id, payload);
        } else {
          if (coin.value < 0)
            throw new BadRequestException(
              'You cannot add a coin into your wallet with negative amount',
            );
          payload.amount = response.ask * coin.value;
          return this.coinRepository.save(payload);
        }
      }),
    );
  }

  async remove(address: AddressDto): Promise<Record<never, string>> {
    const wallet = await this.walletRepository.findOne(address);
    if (!wallet) throw new NotFoundException('Wallet not found');

    return this.walletRepository.delete(address);
  }
}
