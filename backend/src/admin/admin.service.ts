import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        devices: true,
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Last 5 transactions
        },
      },
    });

    return users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: user.balance,
      createdAt: user.createdAt,
      devices: user.devices,
      recentTransactions: user.transactions,
    }));
  }

  async getAllTransactions() {
    return this.prisma.transaction.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async verifyDevice(userId: string, deviceId: string) {
    return this.authService.verifyDevice(userId, deviceId);
  }

  async getDashboardStats() {
    const [totalUsers, totalTransactions, totalBalance] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.transaction.count(),
      this.prisma.user.aggregate({
        _sum: {
          balance: true,
        },
      }),
    ]);

    const unverifiedDevices = await this.prisma.device.count({
      where: { isVerified: false },
    });

    return {
      totalUsers,
      totalTransactions,
      totalBalance: totalBalance._sum.balance || 0,
      unverifiedDevices,
    };
  }
}