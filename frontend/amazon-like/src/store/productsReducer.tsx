import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import {RootState} from './index'
import { Product } from "../utils/types";
const initialState = {
  totalPages: 1,
  itemsPerPage: 20,
  currentPage: 0,
  itemCount: 0,
  startRange: 0,
  endRange: 0,
  status:'PENDING',
  productsDisplayed:[] as Product[],
  filters:{category:[], priceRange:{lowest:0,highest:999999},nameSearch:''}
};
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_undefined , thunkApi)=> {
    const getState = thunkApi.getState as () => RootState
    const productsState = getState().products
    try{
        if(productsState.currentPage>0 && productsState.itemCount>0){
            const startRange = (productsState.currentPage-1)*productsState.itemsPerPage
            const endRange = startRange + productsState.itemsPerPage
            
           let result 
           if(productsState.filters.nameSearch?.length>0){
            result= await supabase
            .from("product")
            .select("*").gte('price',productsState.filters.priceRange.lowest).lte('price',productsState.filters.priceRange.highest).textSearch('name',productsState.filters.nameSearch, {type:'websearch'}).order('created_at',{ascending:false}).range(startRange,endRange)
           
           }else{
            result= await supabase
            .from("product")
            .select("*").gte('price',productsState.filters.priceRange.lowest).lte('price',productsState.filters.priceRange.highest).order('created_at',{ascending:false}).range(startRange,endRange)
           
           }
          
            if(result.error){
                throw result.error
            }
            return result.data
          
        }    }catch(error){
        console.log(error)
    }
})
export const fetchProductById = createAsyncThunk('products/fetchById', async (id:number):Promise<Product[]>=>{
    const result = await supabase
    .from("product")
    .select("*").eq('id',id)
    return result.data as Product[]
  })
export const initPagination = createAsyncThunk<number >('products/initPagination', async (_undefined, {rejectWithValue})=> {
    try{
       const result = await supabase
        .from("product")
        .select("*", { count: "exact", head: true })
        if(result.count !=null){
            return result.count
        }else{
            return rejectWithValue(0)
        }
       
          
    }catch(error){
        return rejectWithValue(error)
    }

})
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    switchPage(state, action) {
      let newPage = Math.floor(action.payload);
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > state.totalPages) {
        newPage = state.totalPages;
      }
      state.currentPage = newPage;
      state.startRange = (state.currentPage - 1) * state.itemsPerPage;
      state.endRange = state.startRange + state.itemsPerPage;
      return state;
    },
    setSearchNameFilter(state,action){
      state.filters.nameSearch = action.payload
      return state
    },
    setLowerPriceRangeFilter(state,action){
      if(typeof action.payload ==='number'){
        if(action.payload>state.filters.priceRange.highest){
          state.filters.priceRange.lowest = state.filters.priceRange.highest
        }else{
          state.filters.priceRange.lowest = action.payload
        }
      }
      return state
    },    setHigherPriceRangeFilter(state,action){
      if(typeof action.payload ==='number'){
        if(action.payload<state.filters.priceRange.lowest){
          state.filters.priceRange.highest = state.filters.priceRange.lowest
        }else{
          state.filters.priceRange.highest = action.payload
        }
      }
      return state
    }
  },extraReducers(builder) {
      builder.addCase(initPagination.rejected, (state) => {
        state.status = 'REJECTED'
      })
      builder.addCase(initPagination.fulfilled, (state, action) => {
        
            if (action.payload != null) {
              state.itemCount = action.payload;
              state.totalPages = Math.floor(state.itemCount / state.itemsPerPage);
              if(state.totalPages === 0){
                state.totalPages =1
              }
              if (state.currentPage === 0) {
                state.currentPage = 1;
              }
              state.startRange = (state.currentPage - 1) * state.itemsPerPage;
            state.endRange = state.startRange + state.itemsPerPage;
            state.status = 'FULFILLED'
            }
            else{
                state.status = 'REJECTED'
            }
            return state;
          }
        )
        builder.addCase(fetchProducts.rejected, (state)=> {
             state.status = 'REJECTED'
        })
        builder.addCase(fetchProducts.fulfilled,(state, action)=> {
            state.status = 'FULFFILLED'
            if(action.payload){
                state.productsDisplayed = action.payload
            }
        })
  
}});

export const { switchPage, setSearchNameFilter, setLowerPriceRangeFilter, setHigherPriceRangeFilter } = productsSlice.actions;

export default productsSlice.reducer;
