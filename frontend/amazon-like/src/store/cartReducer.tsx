import {  createSlice } from "@reduxjs/toolkit";
import { Product } from "../utils/types";
const initialState = {
  products: [ ]as Product[],
  totalPrice:0
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action :{type:string, payload:Product }) {
      if(!state.products.find(product => product.id === action.payload.id)){
        state.products.push(action.payload)
        state.totalPrice = state.products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) 
      }
      return state;
    },  removeProductFromCart(state, action :{type:string, payload:number }) {
      console.log(action.payload)
      const indexToRemove = state.products.findIndex(product => product.id === action.payload)
      if(indexToRemove>-1){
        console.log(indexToRemove)
        state.products.splice(indexToRemove, 1)
      }
               state.totalPrice = state.products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
        return state;
      },
  },});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
