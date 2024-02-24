export type IOptions = {
    id?: string;
    name: string;
}


export type ItemColumn = {
    id?: string;
    name: string;
    price: number;
    sizesId: string[];
    categoryId: string;
    stock: number;
    sizes?: string[];
    category?: string;
};