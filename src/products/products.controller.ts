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

import { ProductsService } from './products.service';
import { ProductGetDto } from './dto/create-auth-dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private prismaClient: PrismaService,
  ) {}
  @ApiCreatedResponse({ description: 'Campaign Created Successfully!' })
  @Post('/create')
  async create(@Body() payload: any, @Res() res: Response): Promise<Response> {
    try {
      const product = await this.productService.create(payload);
      return res
        .status(STATUS_CODE.created)
        .json(
          await response(
            `Product Created Successfully!`,
            { product },
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
            `Product creation Failed`,
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
    @Body() listproduct: any,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const count = await this.prismaClient.product.count({
        where: listproduct.where,
      });
      let payload: prismaFilterOptions = listParser(listproduct);
      this.productService
        .findAll(payload)
        .then(async (Products) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Product List Successfully`,
                { count, Products },
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
                `Product List Failed`,
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
            `Product List Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Get(':uuid')
  async findOne(@Param() uuid: ProductGetDto, @Res() res: Response) {
    try {
      return this.productService
        .findOne(uuid.uuid)
        .then(async (kycDocumentType) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Product Fetched Successfully`,
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
                `Product Fetching Failed`,
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
            `Product List Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Delete(':uuid')
  async remove(@Param() uuid: ProductGetDto, @Res() res: Response) {
    try {
      return this.productService
        .remove(uuid.uuid)
        .then(async (product) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Product Deleted Successfully`,
                { product },
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
      const data = await this.productService.update(id, payload);
      return res
        .status(STATUS_CODE.success)
        .json(
          await response(
            `Campaign Product Successfully`,
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
            `Update Product failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
}
