import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsUUID } from 'class-validator';
export class filterOptions {
  limit: number;
  skip: number;
  where?: Object;
  include?: Object;
  select?: Object;
  order?: Object;
}

export class prismaFilterOptions {
  take: number;
  skip: number;
  where?: object;
  include?: object;
  select?: object;
  orderBy?: object;
}

//This Method can be used only in list all
const listParser = ({
  limit = Number.MAX_SAFE_INTEGER,
  skip = 0,
  where = {},
  include = {},
  select = {},
  order = { created_at: 'desc' },
}: filterOptions): prismaFilterOptions => {
  let finalData: prismaFilterOptions = {
    take: Number.MAX_SAFE_INTEGER,
    skip: 0,
    where: {},
    orderBy: { created_at: 'desc' },
  };
  finalData[`where`] = where;
  finalData.take = limit;
  finalData.skip = skip;
  finalData.orderBy = order;
  if (Object.keys(select).length !== 0) {
    finalData.select = select;
  }
  if (Object.keys(include).length !== 0) {
    finalData[`include`] = include;
  }
  return finalData;
};
export default listParser;

export class ListDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public skip: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public limit: number;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public order: Object;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public where: Object;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public select: Object;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public include: Object;
}

export class GetDto {
  @IsUUID()
  @ApiProperty()
  public uuid: string;
}
