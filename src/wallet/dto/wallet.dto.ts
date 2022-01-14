import { ApiProperty } from '@nestjs/swagger';
import {JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import Extension from '@joi/date'
import * as Joi from 'joi'
import * as moment from 'moment';


import {getCpfPattern} from '../../utils/getPatterns'

const JoiDate = Joi.extend(Extension)

@JoiSchemaOptions({
    allowUnknown: false,
})

export class WalletDto {
    
    @ApiProperty({
        description: 'Wallet id',
        required: false,
        readOnly: true
    })
    address: string

    @ApiProperty({
        description: 'Wallet owner name',
        required: true
    })
    @JoiSchema(Joi.string().min(7).required())
    name: string

    @ApiProperty({
        description: 'Wallet owner cpf',
        required: true
    })
    @JoiSchema(Joi.string().trim().regex(getCpfPattern()).required())
    cpf: string

    @ApiProperty({
        description: 'Wallet owner birthdate',
        required: true
    })
    @JoiSchema(JoiDate.date().max(moment().subtract(18, 'years').format('MM-DD-YYYY')).format('DD/MM/YYYY'))
    birthdate: Date

    @ApiProperty({
        description: 'The Wallet creation Date',
        example: '11/02/2020',
        required: false
    })
    createdAt: Date;
    
    @ApiProperty({
        description: 'The Wallet update Date',
        example: '15/04/2020',
        required: false
    })
    updatedAt: Date;
}
