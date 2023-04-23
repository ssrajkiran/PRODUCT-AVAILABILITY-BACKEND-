import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { FilesUploadDto } from './dto/appDto';
import { JwtRefreshGuard } from './helpers/jwt/jwt-refresh.auth.guard';
import response, { responseDto } from './helpers/response';
import { STATUS_CODE } from './helpers/statusCode';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkServer(): Promise<responseDto> {
    return this.appService.checkServer();
  }
  @ApiTags('upload')
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async uploadFile(
    @Body() body: FilesUploadDto,
    @UploadedFiles()
    files: {
      files?: Express.Multer.File[];
    },
  ) {
    let data = await this.appService.uploadS3(files.files);
    return data;
  }
  @ApiTags('upload')
  @Delete('upload')
  async deleteFile(@Query('key') Param: string) {
    console.log(Param);

    let del = await this.appService.deleteS3(Param);
    return del;
  }
  @ApiTags('refresh')
  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshTokens(@Req() refreshTokenDto: Request, @Res() res: Response) {
    try {
      let data: any = refreshTokenDto.headers.authorization.split(' ')[1];
      let token = await this.appService.refreshTokens({ refreshToken: data });
      return res
        .status(STATUS_CODE.success)
        .json(await response(`Access Token`, { token }, 200, true, ''));
    } catch (error) {
      // console.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `Invalid user`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
}
