import cart from '../assets/cart.svg'
import { AppDispatch, useAppSelector } from '../store'
import { toggleCartDetails } from '../store/cartReducer'
import './Cart.css'
import { useDispatch } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()

    const cartTotalCount:number = useAppSelector(state => {
        return state.cart.products.length})
  return (<div className='cart'>
      <img src={cart} className='cart_logo' alt='your cart'/>
<div className='cart_badge' onClick={()=>dispatch(toggleCartDetails())}>{cartTotalCount}</div>
  </div>
)
}
export default Cart