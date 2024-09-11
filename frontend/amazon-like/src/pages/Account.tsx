import { useEffect, useState } from "react";
import checkSession from "../bridge/checkSession";
import { useNavigate } from "react-router-dom";
import BTNLogout from "../components/BTNLogout/BTNLogout";
import DetailWithLabel from "../components/DetailWithLabel/DetailWithLabel";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { fetchUserById, setCurrentUSer } from "../store/userReducer";
import Chips from "../components/Chips/Chips";
import RatingContainer from "../components/RatingLosange/RatingContainer";
import OrderCard from "../components/OrderCard/OrderCard";
import { supabase } from "../supabase/supabaseClient";


const Account = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>()
    const user = useAppSelector(state => state.user.currentUser)

    const [ userBoughtsHistory , setUserBoughtsHistory ] = useState([]);
    const [ userSellsHistory , setUserSellsHistory ] = useState([]);
    const[ loading, setLoading ] = useState(true);


    const init = async () => {
        try {
          const userSession = await checkSession(true);
          if(userSession){
            const userInfo = await dispatch(fetchUserById(userSession.user_id)).unwrap();
            if(userInfo){
              dispatch(setCurrentUSer(
                {...userInfo,
                  supabase_token:userSession.supabase_token
                }
            ))
            }
            else{
              navigate('/first-connection')
            }
          }
        } catch (error) {
          console.error("Error in session check:", error);
          navigate("/login");
        }
      };

      // Pour chaque order_id dans history.sold et history.bought je fetch les orders


      const fetchOrderHistory = async ( type: string, id:number) => {
        try{
          // Fetch bought history
          const { data: order, error: orderError } = await supabase.rpc(`account_get_${type}_orders`,{
            order_id : id
          })
          if(orderError){
            console.error('Error fetching bought history:', orderError);
            return;
          }
          {type = 'boughts'}
          setUserBoughtsHistory([...userBoughtsHistory, order]);
        }
        catch(error){
          console.error('Error fetching history:', error);
        }
      }
    
      useEffect(() => {
        init();
      }, []);

      useEffect(()=> {
        setLoading(true);
        console.log('fetch histries');
        // Fetch bought history
        // Fetch sold history
        setLoading(false);
      },[user])

  return (
    <main
      className="account-container"
    >
      {user == null ? (
        <div>
          <h1>Account</h1>
          <p>Chargement...</p>
        </div>
      ) : (
        <div>
          <div
            className="account-detail-container"
          >
              <img
                src={user.profile_img+'.png'}
                alt={`photo de profile de ${user.name}`}
                className='profile-picture'
                />
            <div
              className='account-details-list'
              >
              <DetailWithLabel label='Nom' content={user.name} />
              <DetailWithLabel label='Contact' content={user.contact} />
              <DetailWithLabel label='Adresse' content={user.address} />
            </div>
          </div>
          <div>
            <div
              className="user-type-rating-container"
            >

              <Chips value={user.type} />
              {user.type === 'SELLER' && (<RatingContainer rating={user.rating} size={'L'} />)}
            </div>
            <div 
              className="history_container"
            >
                <div
                  className="order_history_container"
                >
                  <div
                    className="order_history_button"
                  >
                    <button
                      onClick={() => navigate('/dashboard')}
                      >
                      Mes produits
                    </button>
                  </div>
                  <div
                    className="order_history_list sell"
                  >
                    <h4>Historique des ventes</h4>
                    <div>
                      {loading ? 
                        <p>Chargement...</p> 
                      :
                        !user.history.sold ?
                          <p>Aucune vente</p>
                          :
                        (
                          user.history.sold.map((order) =>{

                            const data = fetchOrderHistory(order);

                            return(
                              <OrderCard order={data} key={`order-sell-${order}`} />
                            )} 
                          )
                        )
                      } 
                     
                    </div>
                  </div>
                </div>
                <div
                  className="order_history_container"
                >
                  <div
                    className="order_history_list sell"
                  >
                    <h4>Historique des ventes</h4>
                    <div>
                      {loading ? 
                        <p>Chargement...</p> 
                      :
                        !user.history.bought ?
                          <p>Aucun achat</p>
                          :
                        (
                          userBoughtsHistory.map((order) => (
                            <OrderCard order={order} key={`order-bought-${order.id}`} />
                          ))
                        )
                      } 
                     
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}

      <BTNLogout />
    </main>
  );
};

export default Account;
