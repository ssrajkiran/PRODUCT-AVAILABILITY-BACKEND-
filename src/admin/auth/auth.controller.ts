import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import * as _ from 'lodash';
import response from 'src/helpers/response';
import { STATUS_CODE } from 'src/helpers/statusCode';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from 'src/helpers/jwt/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiCreatedResponse({ description: 'User Created Successfully!' })
  @Post('signUp')
  async signUp(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      console.log(createAuthDto);

      const user = await this.authService.signUp(createAuthDto);
      return res
        .status(STATUS_CODE.created)
        .json(
          await response(`User Created Successfully!`, { user }, 201, true, ''),
        );
    } catch (error) {
      console.log(error);

      return res
        .status(
          _.has(error, 'code') ? error?.code : STATUS_CODE.internalServerError,
        )
        .json(
          await response(
            `user creation Failed`,
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

  @ApiOkResponse({ description: 'User Logged In Successfully!' })
  @Post('signIn')
  async signIn(
    @Body() createAuthDto: LoginAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.authService.signIn(createAuthDto);
      return res
        .status(STATUS_CODE.success)
        .json(
          await response(
            `User Logged In Successfully!`,
            { data },
            200,
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
            `Login Failed`,
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
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.authService.findOne(id);
      return res
        .status(STATUS_CODE.created)
        .json(response(`Get user by Id`, { user }, 201, true, ''));
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS_CODE.badRequest)
        .json(
          await response(
            `fetching  User Failed`,
            {},
            400,
            false,
            error.message,
          ),
        );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  // @Post('forget')
  // async forgotPassword(
  //   @Body() resetPassword: resetPasswordDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     this.authService.resetPassword(resetPassword);
  //   } catch (error) {
  //     Logger.error(error);
  //     return res
  //       .status(STATUS_CODE.internalServerError)
  //       .json(
  //         await response(
  //           `Reset Password Failed`,
  //           {},
  //           STATUS_CODE.internalServerError,
  //           false,
  //           error.message,
  //         ),
  //       );
  //   }

  // }
}
