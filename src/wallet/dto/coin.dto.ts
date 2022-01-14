import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { Wallet } from '../entities/wallet.entity';

export class CoinDto {
  @ApiProperty({
    description: 'Coin type',
  })
  @JoiSchema(Joi.string().trim().required())
  quoteTo: string;

  @ApiProperty({
    description: 'Current type',
  })
  @JoiSchema(Joi.string().trim().required())
  currentCoin: string;

  @ApiProperty({
    description: 'Value',
  })
  @JoiSchema(Joi.number().required())
  value: number;

  @ApiProperty({
    description: 'The wallet it belongs',
  })
  @JoiSchema(Joi.string().required())
  wallet: Wallet;
}
