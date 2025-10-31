import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class SavingsService {
  constructor(private prisma: PrismaService) {}

  async deposit(userId: string, depositDto: DepositDto) {
    const { amount } = depositDto;

    // Update user balance
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // Create transaction record
    await this.prisma.transaction.create({
      data: {
        userId,
        type: 'DEPOSIT',
        amount,
        description: `Deposit of ${amount}`,
      },
    });

    return {
      message: 'Deposit successful',
      balance: user.balance,
    };
  }

  async withdraw(userId: string, withdrawDto: WithdrawDto) {
    const { amount } = withdrawDto;

    // Check current balance
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // Update user balance
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // Create transaction record
    await this.prisma.transaction.create({
      data: {
        userId,
        type: 'WITHDRAWAL',
        amount,
        description: `Withdrawal of ${amount}`,
      },
    });

    return {
      message: 'Withdrawal successful',
      balance: updatedUser.balance,
    };
  }

  async getBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return { balance: user.balance };
  }

  async getTransactionHistory(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return transactions;
  }
}