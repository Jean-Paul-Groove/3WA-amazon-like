export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export type ChildrenType =  { 
    children: React.ReactNode
 };

export interface Product {
    id:number,
    name:string,
    category:string,
    created_at:string | number,
    description:string,
    img:string,
    price:number,
    sellerId:number,
    status:"AVAILABLE"|"SOLD"|"DELETED"
    orderId:number|null
    addressId:number|null

}