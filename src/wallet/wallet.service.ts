import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

import  {Wallet}  from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(@InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>) {}

  async create(createWalletDto: CreateWalletDto) : Promise <CreateWalletDto> {
    return this.walletRepository.save(createWalletDto)
  }
  
  findAll() : Promise<Wallet[]>  {
    return this.walletRepository.find()
  }

  findOne(id: string)  {
    return this.walletRepository.findOne({address: id})
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: string): Promise<{}> {
    return this.walletRepository.delete(id)
  }
}
