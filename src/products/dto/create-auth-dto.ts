
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,

} from 'class-validator';
import { GetDto, ListDto } from 'src/helpers/objectParser';

export class CreateProductnDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public product_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public brand_name: string;
}

export class ProductListDto extends ListDto {}
export class ProductGetDto extends GetDto {}
