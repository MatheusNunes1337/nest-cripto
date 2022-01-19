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
  NotFoundException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { JoiPipe } from 'nestjs-joi';
import { AddressDto } from './dto/address.dto';
import { CoinDto } from './dto/coin.dto';
import { Wallet } from './entities/wallet.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { WalletSerialize, IPaginatedWallet } from './wallet.serialize';

@Controller('/api/v1/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService, 
    private readonly walletSerialize: WalletSerialize) {}

  @Post()
  @ApiCreatedResponse({ type: Wallet })
  @ApiBadRequestResponse()
  @HttpCode(201)
  async create(@Body() createWalletDto: WalletDto) : Promise<Wallet> {
    const response = await this.walletService.create(createWalletDto);
    return this.walletSerialize.serialize(response)
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(
    @Query('limit') limit = 100,
    @Query('page') page = 1,
    @Query(JoiPipe) query: SearchWalletDto,
  ): Promise<IPaginatedWallet> {
    const response = await this.walletService.findAll({ limit, page }, query);
    return this.walletSerialize.paginateSerialize(response)
  }

  @Get(':address')
  @ApiOkResponse({ type: Wallet })
  async findOne(@Param(JoiPipe) address: AddressDto): Promise<Wallet> {
    const response = await this.walletService.findByAddress(address);
    return this.walletSerialize.serialize(response)
  }

  @Put(':address')
  @ApiNotFoundResponse({
    description: 'Wallet not found.',
    type: NotFoundException,
    isArray: true,
  })
  async update(
    @Param(JoiPipe) address: AddressDto,
    @Body() CoinDto: Array<CoinDto>,
  ) {
    return await this.walletService.update(address, CoinDto);
  }

  @Delete(':address')
  @ApiNotFoundResponse({
    description: 'Wallet not found.',
    type: NotFoundException,
    isArray: true,
  })
  @HttpCode(204)
  async remove(@Param(JoiPipe) address: AddressDto) {
    return await this.walletService.remove(address);
  }
}
