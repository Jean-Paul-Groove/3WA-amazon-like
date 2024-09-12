import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import { Token, User } from "../utils/types";
const initialState = {
  currentUser :null as CurrentUser,
};
type CurrentUser = User & Token |null
export type Seller = Pick<User, 'id'|'rating'|'name'> & {img:string}


export const fetchUserById = createAsyncThunk('products/fetchById', async (id:string|number):Promise<User[]|null>=>{
  console.log('fetchUserById',id);
  
      const result = await supabase.rpc("get_user_informations", {
        session_id: id,
      });
      console.log('reducer log',result)
      return result.data
    })
export const fetchSellerById = createAsyncThunk('products/fetchById', async (id:number):Promise<Seller[]|null>=>{
  console.log('fetchUserById',id);
  
      const result = await supabase.from('user').select('id,rating,name,img').eq('id',id)
      return result.data
    })
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUSer(state,action){
        state.currentUser = action.payload
    },
  },
}) 

export const { setCurrentUSer } = userSlice.actions

export default userSlice.reducer;
