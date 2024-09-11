export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export type ChildrenType = {
  children: React.ReactNode;
};

export interface Product {
  id: number;
  name: string;
  category: string;
  created_at: string | number;
  description: string;
  img: string;
  price: number;
  sellerId: number;
  status: "AVAILABLE" | "SOLD" | "DELETED";
  orderId: number | null;
  addressId: number | null;
}



export interface User {
    id: number | undefined;
    user_id?: string | undefined;
    name: string | undefined;
    email: string | undefined;
    profile_img: string | undefined;
    rating: number | undefined;
    address: string | undefined;
    type: "SELLER" | "CLIENT" | "ADMIN" | undefined;
}

export interface Token {
    supabase_token:string|undefined
}