import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import Extension from '@joi/date';
import * as Joi from 'joi';

import { getCpfPattern } from '../../utils/getPatterns';

const JoiDate = Joi.extend(Extension);

@JoiSchemaOptions({
  allowUnknown: false,
})
export class SearchWalletDto {
  @ApiProperty({
    description: "Person's name",
    required: false,
  })
  @JoiSchema(Joi.string().min(7).optional())
  name?: string;

  @ApiProperty({
    description: "Person's name",
    required: false,
  })
  @JoiSchema(Joi.string().trim().regex(getCpfPattern()).optional())
  cpf?: string;

  @ApiProperty({
    description: "Person's birthdate",
    required: false,
  })
  @JoiSchema(JoiDate.date().format('DD/MM/YYYY'))
  birthdate?: string;
}
