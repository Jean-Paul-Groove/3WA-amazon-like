import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
const initialState = {
  currentUser:{}
};

export const fetchUserById = createAsyncThunk('products/fetchById', async (id:number)=>{
    console.log(id)
      const result = await supabase
      .from("user")
      .select("id,rating,name,img").eq('id',id)
      return result.data
    })
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },});


export default userSlice.reducer;
