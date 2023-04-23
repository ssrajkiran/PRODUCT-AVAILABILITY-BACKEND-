import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from 'src/database/prisma.service';
import { prismaFilterOptions } from 'src/helpers/objectParser';
import { STATUS_CODE } from 'src/helpers/statusCode';

@Injectable()
export class ShopsService {
  constructor(private prismaClient: PrismaService) {}

  async create(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let shop = await this.prismaClient.shop.create({
          data: payload,
        });

        return resolve(shop);
      } catch (error) {
        reject(`${error.message}`);
      }
    });
  }

  findAll(payload: prismaFilterOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        let shop = await this.prismaClient.shop.findMany(payload);
        if (!shop) {
          return reject('Error While retriving Shops');
        }
        return resolve(shop);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes(
            '`include` or `select`, but not both at the same time',
          )
        ) {
          return reject('Use either select or include');
        }
        return reject(`${error.message}`);
      }
    });
  }

  findOne(uuid: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let shop = await this.prismaClient.shop.findFirst({
          where: { uuid },
        });
        if (!shop) {
          return reject('Error While retriving Shop');
        }
        return resolve(shop);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes(
            '`include` or `select`, but not both at the same time',
          )
        ) {
          return reject('Use either select or include');
        }

        return reject(`${error.message}`);
      }
    });
  }
  update(uuid: string, payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let shop = await this.prismaClient.shop.update({
          where: { uuid },
          data: payload,
        });
        // console.log(kycDocumentType);

        if (!shop) {
          return reject('Shop Sucessfully Updated');
        }
        return resolve(shop);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes('Shop to update not found')
        ) {
          return reject('No Record Found');
        }

        return reject(`${error.message}`);
      }
    });
  }

  remove(uuid: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let shop = await this.prismaClient.shop.update({
          where: { uuid },
          data: { status: false, deleted_at: new Date().toISOString() },
        });
        // console.log(kycDocumentType);

        if (!shop) {
          return reject('No Shop Found');
        }
        return resolve(shop);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes('Record to update not found')
        ) {
          return reject('No Record Found');
        }

        return reject(`${error.message}`);
      }
    });
  }
}
