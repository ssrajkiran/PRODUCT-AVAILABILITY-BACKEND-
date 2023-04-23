import { PartialType } from '@nestjs/swagger';
import { CreateShopnDto } from './create-auth-dto';

export class UpdateCampaignTypeDto extends PartialType(
    CreateShopnDto,
) {}
