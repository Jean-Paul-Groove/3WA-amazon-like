import {  createSlice } from "@reduxjs/toolkit";
import { Product } from "../utils/types";
const initialState = {
  products: [ ]as Product[],
  totalPrice:0,
  isOpen:false
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
      const indexToRemove = state.products.findIndex(product => product.id === action.payload)
      if(indexToRemove>-1){
        state.products.splice(indexToRemove, 1)
      }
               state.totalPrice = state.products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
        return state;
      },toggleCartDetails(state){
state.isOpen = !state.isOpen
return state
      },resetCart(state){
        state = initialState
        return state
      }
  },});

export const { addProductToCart, removeProductFromCart, toggleCartDetails, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
