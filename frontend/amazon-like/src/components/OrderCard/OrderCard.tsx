import { formatDateFRComplete } from "../../utils/FormateDate";
import { Order, Product } from "../../utils/types";
import "./OrderCard.css";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  order: Order;
  orderType: string;
}
const OrderCard = (props: OrderCardProps) => {
  const { order, orderType } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("order :", order.id);
    
    // navigate('/order/'+order.id)
  };

  const ProductCard = (product)=>{

    const data = product.product;
        
    return(
    <figure
      className={"order-card-product-card"}
    >
      <img className="order-card-product-card-img" src={data.img} alt={data.name} />
      <div className="order-card-product-card-footer">
        <div className="order-card-product-card-price">
          {data.price} <span> €</span>
        </div>
        <h3 className="order-card-product-card-title">{data.name}</h3>
      </div>
    </figure>
  )};

  return (
    <article className="order-card-container">
      <div className="order-card-header">
        <p>{formatDateFRComplete(order.created_at)}</p>
        <span>Montant de la commande : <strong>{order.total_price}</strong> €</span>
      </div>
      <div className="order-card-product-list">
        {order.products?.map((product) => (
           <ProductCard product={product} key={`order-${order.id}-product-${product.id}`} />
        ))}
      </div>
      <div className="order-card-body">
        <p> status de la commande : {order.status}</p>
      </div>
      <div className="order-card-footer">
        {orderType === "SELL" ? (
          <span>Client : {order.client.name}</span>
        ) : orderType === "BOUGHT" ? (
          <span>Vendeur : {order.seller.name}</span>
        ) : (
          <div className="order-card-seller-client">
            <span>Client : {order.client.name}</span>
            <span>Vendeur : {order.seller.name}</span>
          </div>
        )}
        <button onClick={handleClick} className="btn-order-card">
          Voir plus
        </button>
      </div>
    </article>
  );
};

export default OrderCard;
