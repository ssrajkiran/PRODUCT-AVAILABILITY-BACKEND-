import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from 'src/database/prisma.service';
import { prismaFilterOptions } from 'src/helpers/objectParser';
import { STATUS_CODE } from 'src/helpers/statusCode';

@Injectable()
export class ProductsService {
  constructor(private prismaClient: PrismaService) {}

  async create(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await this.prismaClient.product.create({
          data: payload,
        });

        return resolve(products);
      } catch (error) {
        reject(`${error.message}`);
      }
    });
  }

  findAll(payload: prismaFilterOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await this.prismaClient.product.findMany(payload);
        if (!product) {
          return reject('Error While retriving Product');
        }
        return resolve(product);
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
        let product = await this.prismaClient.product.findFirst({
          where: { uuid },
        });
        if (!product) {
          return reject('Error While retriving Product');
        }
        return resolve(product);
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
        let Product = await this.prismaClient.product.update({
          where: { uuid },
          data: payload,
        });
        // console.log(kycDocumentType);

        if (!Product) {
          return reject('Product Sucessfully Updated');
        }
        return resolve(Product);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes('Product to update not found')
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
        let products = await this.prismaClient.product.update({
          where: { uuid },
          data: { status: false, deleted_at: new Date().toISOString() },
        });
        // console.log(kycDocumentType);

        if (!products) {
          return reject('No Product Found');
        }
        return resolve(products);
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
