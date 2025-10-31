import { IsNumber, IsPositive, Min } from 'class-validator';

export class WithdrawDto {
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}