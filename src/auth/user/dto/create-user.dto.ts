import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Bruce Barack',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
  })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @ApiProperty({
    description:
      'Your password must contain at least a digit, a lowercase letter, a capital letter, a special character and 8 of the mentioned characters',
    example: 'P@s$W0rD',
  })
  password: string;
}
