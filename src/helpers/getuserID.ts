import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as _ from 'lodash';

const prisma = new PrismaClient();
export const getUserIdformUUID = async (
  uuid: string,
  select?: object,
): Promise<Prisma.userUncheckedCreateInput> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        where: {
          uuid: uuid,
        },
      };

      if (!_.isEmpty(select)) {
        payload['select'] = select;
      }
      const user = await prisma.user.findFirst(payload);
      if (_.isEmpty(user)) {
        reject("user doesn't exists");
      }
      resolve(user);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};
