import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, deviceId } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Create device (not verified yet)
    await this.prisma.device.create({
      data: {
        deviceId,
        userId: user.id,
        isVerified: false,
      },
    });

    return {
      message: 'Registration successful. Please wait for admin verification.',
      userId: user.id,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password, deviceId } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { devices: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if device is verified
    const device = user.devices.find(d => d.deviceId === deviceId);
    if (!device || !device.isVerified) {
      throw new UnauthorizedException('Device not verified. Please contact admin.');
    }

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
      },
    };
  }

  async verifyDevice(userId: string, deviceId: string) {
    const device = await this.prisma.device.findFirst({
      where: { userId, deviceId },
    });

    if (!device) {
      throw new ConflictException('Device not found');
    }

    await this.prisma.device.update({
      where: { id: device.id },
      data: { isVerified: true },
    });

    return { message: 'Device verified successfully' };
  }
}