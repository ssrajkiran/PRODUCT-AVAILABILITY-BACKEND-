import { PartialType } from '@nestjs/swagger';
import { CreateProductnDto } from './create-auth-dto';

export class UpdateProductTypeDto extends PartialType(
    CreateProductnDto,
) {}
