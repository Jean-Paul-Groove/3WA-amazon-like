import { formatDate } from '../../utils/FormateDate'
import { Order } from '../../utils/types'
import './OrderCard.css'
import { useNavigate } from 'react-router-dom'

const OrderCard = (order : Order) => {

    const navigate = useNavigate()

    
    const handleClick = () => {
        console.log('clicked', order.order.id)
    }

  return (
    <div
        className='order-card-container'
    >
        <div>
            <p>{order.order.created_at}</p>
            <span>{order.order.total_price} €</span>
        </div>
        <div>
            {order.order.products?.map((product) => (
                <div key={`product-${product.id}-order-${id}`}>
                    <p>{product.name}</p>
                    <span>{product.price} €</span>
                </div>
            ))}
        </div>
        <div>
            <p>{order.order.status}</p>
            <span>{order.order.seller.name}</span>
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