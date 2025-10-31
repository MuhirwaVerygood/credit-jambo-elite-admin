import { IsNumber, IsPositive, Min } from 'class-validator';

export class DepositDto {
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}