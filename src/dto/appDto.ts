import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FilesUploadDto {
  @ApiProperty({
    type: 'array',
    name: 'files',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}

export class deleteFileDto {
  @ApiProperty()
  public key: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public refreshToken: string;
}
