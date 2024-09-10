import { useState } from 'react'
import cart from '../assets/cart.svg'
import { useAppSelector } from '../store'
import './Cart.css'
import CartDetails from './CartDetails'

const Cart = () => {
const [detailsOpened, setDetailsOpened] = useState(false)
function toggleCartDetails(){
  setDetailsOpened(!detailsOpened)
}
    const cartTotalCount:number = useAppSelector(state => {
        return state.cart.products.length})
  return (<div className='cart'>
      <img src={cart} className='cart_logo' alt='your cart'/>
<div className='cart_badge' onClick={()=>toggleCartDetails()}>{cartTotalCount}</div>
<CartDetails  opened={detailsOpened}/>  </div>
)
}
export default Cart