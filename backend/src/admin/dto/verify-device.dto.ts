import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyDeviceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;
}