import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import { Token, User } from "../utils/types";
const initialState = {
  currentUser :null as CurrentUser
};
type CurrentUser = User & Token |null
export type Seller = Pick<User, 'id'|'rating'|'name'> & {img:string}
export const fetchUserById = createAsyncThunk('products/fetchById', async (id:number):Promise<Seller[]|null>=>{
      const result = await supabase
      .from("user")
      .select("id,rating,name,img").eq('id',id)
      console.log(result)
      return result.data
    })
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUSer(state,action){
      if(action.payload != null){
        state.currentUser = action.payload
      }
    }
  },});
  export const { setCurrentUSer} = userSlice.actions

export default userSlice.reducer;
