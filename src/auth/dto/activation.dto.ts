import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ActivationDto {
  @ApiProperty({
    description: 'Access key that was sent to the user.',
    example: '5989',
  })
  @IsNumber()
  @Min(4)
  activationKey: number;
}
