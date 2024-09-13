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
    address: {
      label:string | undefined;
      position: number[] | [];
    };
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
    status:  "AVAILABLE" | "PURCHASED" | "DELIVERY_IN_PROGRESS" | "DELIVERED" | "CANCELLED";;
  }
  dlv_address : {
    label: string;
    position: number[];
  };
  client? : {
    id: number;
    name: string;
    img: string;
    contact : string;
  };
  dlv_slip:[
      {
      id: number;
      exp:{
        address : {
          label: string;
          position: number[];
        };
      },
      products: Product[] ;
      informations_seller: {
        id: number;
        name: string;
        img: string;
        contact : string;
        rating: number;
      }
    }
  ];
  total_price: number;
  created_at: string;
}

export type OrderListType = 
 Order[] | null;

export type SellOrderType = {
  id: number;
  dlv :{
    type : "DELIVERY" | "PICKUP";
    dlv_date? : string;
    address : {
      label: string;
      position: number[];
    };
    status:  "AVAILABLE" | "PURCHASED" | "DELIVERY_IN_PROGRESS" | "DELIVERED" | "CANCELLED";;
  }
  client? : {
    id: number;
    name: string;
    img: string;
    contact : string;
  };
  products: Product[] ;
  total_price: number;
  created_at: string;
}

export type BoughtOrderType = {
  id: number;
  dlv :{
    address : {
      type : "DELIVERY" | "PICKUP";
      dlv_date? : string;
      label : string;
      position : number[];
    }
    status:  "AVAILABLE" | "PURCHASED" | "DELIVERY_IN_PROGRESS" | "DELIVERED" | "CANCELLED";;
  }
  products: [
    {
      id: number,
      img: string,
      name : string ,
      price: number,
      seller : {
        id : number,
        name : string,
        rating : number
      }
    }
  ];
  total_price: number;
  created_at: string;
}