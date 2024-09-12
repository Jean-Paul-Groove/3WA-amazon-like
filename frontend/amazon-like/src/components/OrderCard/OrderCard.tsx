import { formatDate } from '../../utils/FormateDate'
import { Order } from '../../utils/types'
import './OrderCard.css'
import { useNavigate } from 'react-router-dom'

interface OrderCardProps {
    order:Order
}
const OrderCard = (props:OrderCardProps) => {
const {order}=props
    const navigate = useNavigate()

    
    const handleClick = () => {
        console.log('clicked', order.id)
    }

  return (
    <div
        className='order-card-container'
    >
        <div>
            <p>{order.created_at}</p>
            <span>{order.total_price} €</span>
        </div>
        <div>
            {order.products?.map((product) => (
                <div key={`product-${product.id}-order-${order.id}`}>
                    <p>{product.name}</p>
                    <span>{product.price} €</span>
                </div>
            ))}
        </div>
        <div>
            <p>{order.status}</p>
            <span>{order.seller.name}</span>
            <button
                onClick={ handleClick}
                className='btn-order-card'
            >
                Voir plus
            </button>
        </div>
    </div>
  )
}

export default OrderCard