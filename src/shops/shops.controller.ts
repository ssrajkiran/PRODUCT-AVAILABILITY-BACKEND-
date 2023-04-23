import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import response from 'src/helpers/response';
import { Response } from 'express';
import _ from 'lodash';
import { STATUS_CODE } from 'src/helpers/statusCode';

import listParser, { prismaFilterOptions } from 'src/helpers/objectParser';
import { PrismaService } from 'src/database/prisma.service';
import { ShopsService } from './shops.service';
import { ShopGetDto } from './dto/create-auth-dto';

@Controller('shop')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private prismaClient: PrismaService,
  ) {}
  @ApiCreatedResponse({ description: 'Campaign Created Successfully!' })
  @Post('/create')
  async create(
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const shop = await this.shopsService.create(payload);
      return res
        .status(STATUS_CODE.created)
        .json(
          await response(
            `Shop Created Successfully!`,
            { shop },
            201,
            true,
            '',
          ),
        );
    } catch (error) {
      console.log(error);

      return res
        .status(
          _.has(error, 'code') ? error?.code : STATUS_CODE.internalServerError,
        )
        .json(
          await response(
            `Shop creation Failed`,
            {},
            _.has(error, 'code')
              ? error?.code
              : STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Post('list')
  async findAll(
    @Body() listshop: any,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const count = await this.prismaClient.shop.count({
        where: listshop.where,
      });
      let payload: prismaFilterOptions = listParser(listshop);
      this.shopsService
        .findAll(payload)
        .then(async (CampaignList) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Shop List Successfully`,
                { count, CampaignList },
                STATUS_CODE.success,
                true,
                '',
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `Shop List Failed`,
                {},
                STATUS_CODE.badRequest,
                false,
                err,
              ),
            );
        });
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `Campaign List Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Get(':uuid')
  async findOne(@Param() uuid: ShopGetDto, @Res() res: Response) {
    try {
      return this.shopsService
        .findOne(uuid.uuid)
        .then(async (kycDocumentType) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Campaign Fetched Successfully`,
                { kycDocumentType },
                STATUS_CODE.success,
                true,
                '',
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `Campaign Fetching Failed`,
                {},
                STATUS_CODE.badRequest,
                false,
                err,
              ),
            );
        });
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `KYC Document Type List Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Delete(':uuid')
  async remove(@Param() uuid: ShopGetDto, @Res() res: Response) {
    try {
      return this.shopsService
        .remove(uuid.uuid)
        .then(async (campaign) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Campaign Deleted Successfully`,
                { campaign },
                STATUS_CODE.success,
                true,
                '',
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `Campaign deletion Failed`,
                {},
                STATUS_CODE.badRequest,
                false,
                err,
              ),
            );
        });
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `Campaign deletion Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.shopsService.update(id, payload);
      return res
        .status(STATUS_CODE.success)
        .json(
          await response(
            `Campaign updated Successfully`,
            { data },
            STATUS_CODE.success,
            true,
            '',
          ),
        );
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `Update Campaign failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
}
