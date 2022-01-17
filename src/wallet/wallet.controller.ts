import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { JoiPipe } from 'nestjs-joi';
import { AddressDto } from './dto/address.dto';
import { CoinDto } from './dto/coin.dto';

@Controller('/api/v1/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createWalletDto: WalletDto) {
    return await this.walletService.create(createWalletDto);
  }

  @Get()
  async findAll(@Query() query: SearchWalletDto) {
    return await this.walletService.findAll(query);
  }

  @Get(':address')
  async findOne(@Param(JoiPipe) address: AddressDto) {
    return await this.walletService.findByAddress(address);
  }

  @Put(':address')
  async update(
    @Param('id') address: AddressDto,
    @Body() CoinDto: Array<CoinDto>,
  ) {
    return await this.walletService.update(address, CoinDto);
  }

  @Delete(':address')
  @HttpCode(204)
  async remove(@Param(JoiPipe) address: AddressDto) {
    return await this.walletService.remove(address);
  }
}
