import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';
export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email_address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
