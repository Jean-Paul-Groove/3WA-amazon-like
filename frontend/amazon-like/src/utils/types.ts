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
  seller_id: number;
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
    type: "SELLER" | "CLIENT" | "ADMIN";
    history: {
      sold: number[],
      bought : number[]
    },
    contact:string|undefined
}

export interface Token {
    supabase_token:string|undefined
}

export interface Order {
  id: number;
  dlv :{
    address: string;
    date: Date;
  }
  client : {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
    rating : number;
  };
  products: Product[];
  total_price: number;
  created_at: string;
  status: "AVAILABLE" | "PURCHASED" | "DELIVERY_IN_PROGRESS" | "DELIVERED" | "CANCELLED";
}

export type OrderListType =  Order[] | null;
