import { formatDate } from '../../utils/FormateDate'
import './OrderCard.css'
import { useNavigate } from 'react-router-dom'

const OrderCard = (props) => {

    const navigate = useNavigate()

    

    const { id, products, totalPrice, status , seller , client, created_at  } = props.order

    const handleClick = () => {
        console.log('clicked', id)
    }

    
    // const formatedDate = formatDate(created_at)
    
    // console.log('date formated : ', formatedDate);

  return (
    <div
        className='order-card-container'
    >
        <div>
            <p>{created_at}</p>
            <span>{totalPrice} €</span>
        </div>
        <div>
            {products.map((product) => (
                <div key={`product-${product.id}-order-${id}`}>
                    <p>{product.name}</p>
                    <span>{product.price} €</span>
                </div>
            ))}
        </div>
        <div>
            <p>{status}</p>
            <span>{seller}</span>
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