
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,

} from 'class-validator';
import { GetDto, ListDto } from 'src/helpers/objectParser';

export class CreateShopnDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public website: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public email_address: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  public coords: any;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public mobile_number: number;

}
export class resetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email_address: string;
}
export class ShopListDto extends ListDto {}
export class ShopGetDto extends GetDto {}
