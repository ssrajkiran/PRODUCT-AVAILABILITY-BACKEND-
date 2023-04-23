import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email_address: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // public country_code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public mobile_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
export class resetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email_address: string;
}
