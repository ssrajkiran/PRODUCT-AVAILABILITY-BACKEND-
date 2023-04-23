import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { STATUS_CODE } from 'src/helpers/statusCode';
import generateToken from '../../helpers/jwt/generateToken';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private prismaClient: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // const { email_address,name,password,mobile_number,country_code } = createAuthDto;
        const { email_address } = createAuthDto;
        let user = await this.prismaClient.user.findFirst({
          where: { email_address: email_address },
        });
        if (user) {
          reject({
            message: 'User Already Exist!',
            code: STATUS_CODE.badRequest,
          });
        }
        // let userType = await this.prismaClient.user_type.findFirst({
        //   where: { type: 'admin' },
        // });
        // createAuthDto['user_type'] = userType.id;
        if (!user) {
          const newUser = this.prismaClient.user.create({
            data: createAuthDto,
          });

          return resolve(newUser);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  async signIn(createAuthDto: LoginAuthDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email_address, password } = createAuthDto;
        console.log(email_address);

        let prevuser = await this.prismaClient.user.findFirst({
          where: { email_address },
        });

        if (!prevuser) {
          return reject({
            message: 'Email not exist',
            code: STATUS_CODE.badRequest,
          });
        }

        const match = await bcrypt.compare(password, prevuser.password);

        if (!match) {
          return reject({
            message: 'Wrong Password',
            code: STATUS_CODE.badRequest,
          });
        }
        prevuser['password'] = null;
        
        let data = {
          token:await generateToken(prevuser),
          user:prevuser
        }
   
         
        

        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.prismaClient.user.findUnique({
          where: { id: id },
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return new Promise(async (resolve, reject) => {
      try {
        // const user = await this.prismaClient.user.update(id, updateAuthDto);
      } catch (error) {
        return reject(error);
      }
    });
  }
  // resetPassword(mail: resetPasswordDto) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let user: user = await this.prismaClient.user.findFirst({
  //         where:resetPasswordDto
  //       });
  //       if (!category) {
  //         return reject('Error While creating Category');
  //       }
  //       return resolve(category);
  //     } catch (error) {
  //       if (JSON.stringify(error.message).includes('Unique constraint')) {
  //         return reject('Category Already Exists');
  //       }

  //       return reject('Unknown Error Occurred');
  //     }
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
