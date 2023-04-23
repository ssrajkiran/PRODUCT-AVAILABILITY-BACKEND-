import { GetDto, ListDto } from 'src/helpers/objectParser';
export declare class CreateShopnDto {
    name: string;
    website: string;
    email_address: string;
    coords: any;
    mobile_number: number;
}
export declare class resetPasswordDto {
    email_address: string;
}
export declare class ShopListDto extends ListDto {
}
export declare class ShopGetDto extends GetDto {
}
