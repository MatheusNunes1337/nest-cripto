import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { getAddressPattern } from '../../utils/getPatterns';

export class AddressDto {
  @ApiProperty({
    description: 'Wallet id',
  })
  @JoiSchema(Joi.string().regex(getAddressPattern()).required())
  address: string;
}
