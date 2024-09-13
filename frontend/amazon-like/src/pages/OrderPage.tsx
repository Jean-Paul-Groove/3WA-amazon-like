import { useEffect, useState } from 'react'
import './OrderPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { useAppSelector } from '../store';
import { Order } from '../utils/types';
import RatingContainer from '../components/RatingLosange/RatingContainer';
import { formatDate } from '../utils/FormateDate';


const OrderPage = () => {


    const [ order, setOrder ] = useState<Order>();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.user.currentUser);

    const pos = [45.3530, 2.9128]

    const id = useParams().id;

    const init = async () => {
        if(user ){
            const { data, error } = await supabase.rpc('order_get_order_information',{
                session_user_id: user.id,
                current_order_id: id
            });
            if(error ) {
                console.error("Erreur lors de la récupération de la commande :", error);
                return;
            }
            else{
                setOrder(data);
            }
        }
        else{
            return navigate('/account');
        }
    }

    useEffect(() => {
        init();
    },[]);

    const ProductCard = ({data})=>{        
        
        const handleClick = () => {
            navigate('/products/'+data.id);
        }
            
        return(
        <figure
          className={"order-card-product-card"}
        >
          <img className="order-card-product-card-img" src={data?.img} alt={data?.name} />
          <div className="order-card-product-card-footer">
            <div className="order-card-product-card-price">
              {data?.price} <span> €</span>
            </div>
            <h3 className="order-card-product-card-title">{data?.name}</h3>
            <button className="product-card_button" onClick={handleClick}>Voir produit</button>
          </div>
        </figure>
      )};

  return (
    <main
        className='order-page-main'
    >
        { order ? 
        (
            <>
                <div
                    className='order-page-title'
                    >
                    <h1>Commande numéro {order.id}</h1>
                    <p> Date de la commande : <span>{formatDate(order.created_at)}</span></p>
                </div>
                <div
                    className='order-page-total-price'
                >
                    <p>Total du montant de la commande : <span>{order.total_price} €</span></p>
                </div>
                <div
                    className='order-page-info-container'
                >
                    <div
                        className='order-page-person-container'
                    >
                        <img 
                            src={order?.client?.img} 
                            alt={order?.client?.name} 
                            className='order-page-person-img'
                            />
                        <div
                            className='order-page-info'
                            >
                            <h4> Client </h4>
                            <p> Nom : <span>{order?.client?.name}</span></p>
                            <p> Adresse de livraison : <span>{order.dlv_address.label}</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className='order-page-slip-container'
                >
                    { order.dlv_slip.map((slip) => (
                        <div
                            className='order-page-slip'
                            key={`slip-${slip.id}`}
                        >
                        <div
                            className='order-page-person-container'
                        >
                            <img 
                                src={slip.informations_seller.img} 
                                alt={slip.informations_seller.name} 
                                className='order-page-person-img'
                                />
                            <div
                                className='order-page-info'
                                >
                                <h4> Vendeur </h4>
                                <p> Nom : <span>{slip.informations_seller?.name}</span></p>
                                <p> Adresse de vente : <span>{slip.exp.address?.label}</span></p>
                                <div
                                    className='order-page-seller-rating'
                                >
                                <p> Note :</p>
                                <RatingContainer rating={slip.informations_seller?.rating} size={"M"}/>
                                </div>
                                <div
                                    className='order-page-seller-button'
                                >
                                    <button
                                        onClick={() => navigate('/seller/'+slip.informations_seller?.id)}
                                        >Voir page du vendeur
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        <div>
                            <h2>Produits</h2>
                            <div
                                className='order-page-products-list'
                            >
                                {slip.products && slip.products.map((product) => (
                                    <ProductCard data={product} key={`slip-${slip.id}-product-${product.id}`}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </>
        )
        :
        (
            <strong>Commande introuvable</strong>
        )
    }
    </main>
  )
}

export default OrderPage;