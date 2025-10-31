import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('savings')
@UseGuards(JwtAuthGuard)
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post('deposit')
  async deposit(@Request() req, @Body() depositDto: DepositDto) {
    return this.savingsService.deposit(req.user.id, depositDto);
  }

  @Post('withdraw')
  async withdraw(@Request() req, @Body() withdrawDto: WithdrawDto) {
    return this.savingsService.withdraw(req.user.id, withdrawDto);
  }

  @Get('balance')
  async getBalance(@Request() req) {
    return this.savingsService.getBalance(req.user.id);
  }

  @Get('transactions')
  async getTransactionHistory(@Request() req) {
    return this.savingsService.getTransactionHistory(req.user.id);
  }
}