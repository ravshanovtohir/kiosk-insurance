import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Transaction Service')
@Controller({
  version: '1',
  path: 'transactions',
})
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Get()
  findAll(@Query() query: any) {
    return this.transactionService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id)
  }
}
