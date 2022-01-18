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
import { Wallet } from './entities/wallet.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';

@Controller('/api/v1/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createWalletDto: WalletDto) {
    return await this.walletService.create(createWalletDto);
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(
    @Query('limit') limit = 100,
    @Query('page') page = 1,
    @Query() query: SearchWalletDto,
  ): Promise<Pagination<Wallet>> {
    return await this.walletService.findAll({ limit, page }, query);
  }

  @Get(':address')
  async findOne(@Param(JoiPipe) address: AddressDto) {
    return await this.walletService.findByAddress(address);
  }

  @Put(':address')
  async update(
    @Param(JoiPipe) address: AddressDto,
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
