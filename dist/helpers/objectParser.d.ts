export declare class filterOptions {
    limit: number;
    skip: number;
    where?: Object;
    include?: Object;
    select?: Object;
    order?: Object;
}
export declare class prismaFilterOptions {
    take: number;
    skip: number;
    where?: object;
    include?: object;
    select?: object;
    orderBy?: object;
}
declare const listParser: ({ limit, skip, where, include, select, order, }: filterOptions) => prismaFilterOptions;
export default listParser;
export declare class ListDto {
    skip: number;
    limit: number;
    order: Object;
    where: Object;
    select: Object;
    include: Object;
}
export declare class GetDto {
    uuid: string;
}
