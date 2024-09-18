import { ApiProperty } from '@nestjs/swagger';

export class PresenterUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class PresenterLoginDto {
  @ApiProperty({ description: 'Access token to API services' })
  accessToken: string;

  @ApiProperty({ description: 'Access token to stay logged in to the API' })
  refreshToken: string;
}
