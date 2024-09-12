import cart from '../../assets/cart.svg'
import { AppDispatch, useAppSelector } from '../../store'
import { toggleCartDetails } from '../../store/cartReducer'
import './Cart.css'
import { useDispatch } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()

    const cartTotalCount:number = useAppSelector(state => {
        return state.cart.products.length})
  return (<div className='cart'>
    <svg className='cart_logo' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 611M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
<div className='cart_badge' onClick={()=>dispatch(toggleCartDetails())}>{cartTotalCount}</div>
  </div>
)
}
export default Cart