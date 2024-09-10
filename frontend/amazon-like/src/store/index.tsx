import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer'
import { useSelector } from 'react-redux'


const store = configureStore({
  reducer: {
   products: productsReducer,
   cart:cartReducer
  }
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()
export default store