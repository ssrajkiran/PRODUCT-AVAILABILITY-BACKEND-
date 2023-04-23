import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { RefreshTokenDto } from './dto/appDto';
import generateToken from './helpers/jwt/generateToken';
import response, { responseDto } from './helpers/response';
import { STATUS_CODE } from './helpers/statusCode';
@Injectable()
export class AppService {
  bucketName = process.env.AWS_BUCKETNAME;
  region = process.env.AWS_BUCKETREGION;
  accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
  secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
  client = new S3Client({
    region: process.env.AWS_BUCKETREGION,
    credentials: {
      accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
    },
  });
  constructor(private jwtService: JwtService) {}
  checkServer(): Promise<responseDto> {
    return response(
      'Going Good',
      { message: 'Going Good' },
      STATUS_CODE.success,
    );
  }
  async uploadS3(files: Express.Multer.File[]) {
    const params = files.map((file: Express.Multer.File) => {
      return {
        Bucket: this.bucketName,
        Key: `${uuid.v4()}`,
        Body: file.buffer,
        ACL: 'public-read',
        CacheControl: 'max-age=6400',
        ContentType: file.mimetype,
      };
    });
    return await Promise.all(
      params.map(async (param) => {
        try {
          const parallelUploads3 = new Upload({
            client: this.client,
            params: param,
          });
          return await parallelUploads3.done();
        } catch (e) {
          console.log(e);
        }
      }),
    );
  }
  async deleteS3(key: string) {
    console.log(key);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      const response = await this.client.send(command);
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshToken } = refreshTokenDto;
        const decoded = this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESHTOKEN,
        });
        delete decoded.iat;
        delete decoded.exp;
        const tokens = await generateToken(decoded, false);
        return resolve(tokens);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
