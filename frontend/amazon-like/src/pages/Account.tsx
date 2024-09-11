import { useEffect, useState } from "react";
import checkSession from "../bridge/checkSession";
import { useNavigate } from "react-router-dom";
import BTNLogout from "../components/BTNLogout";
import DetailWithLabel from "../components/DetailWithLabel/DetailWithLabel";
import RatingLosange from "../components/RatingLosange/RatingLosange";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { setCurrentUSer } from "../store/userReducer";
import Chips from "../components/Chips/Chips";
import { supabase } from "../supabase/supabaseClient";



const Account = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector(state => state.user.currentUser)
    const arrayRating = [0, 1 , 2 , 3 , 4];


    const [ userOrderData , setUserOrderData ] = useState([]);
    const[ loading, setLoading ] = useState(true);

    const fetchSellerOrder = async () => {
        const { data , error } = await supabase.rpc('account_get_seller_orders',{
          current_user_id: user.id
        })
        if(error){
            console.error('Error fetching user order data:', error);
            return;
        }
        setUserOrderData(data);
        setLoading(false);
      }

    const fetchClientOrder = async () => {
        const { data , error } = await supabase.rpc('account_get_client_orders',{
          current_user_id: user.id
        })
        if(error){
            console.error('Error fetching user order data:', error);
            return;
        }
        setUserOrderData(data);
        setLoading(false);
      }


    const init = async () => {
        try {
          const userData = await checkSession(true);
          console.log('userData init:', userData);
          if (!userData || !userData.name) {
            navigate("/first-connection");
          } else {
            console.log("User data from checkSession:", userData);
            dispatch(setCurrentUSer(userData))
          }
        } catch (error) {
          console.error("Error in session check:", error);
          navigate("/login");
        }
      };
    
      useEffect(() => {
        init();
      }, []);
    
      useEffect(() => {
        if (user && user.type === "SELLER") {
          fetchSellerOrder();
        }
        else if(user && user.type === "CLIENT"){
          fetchClientOrder();
        }
      }, [user]);

  return (
    <main>
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
              className="chips-container"
            >
            </div>
            {user.type === 'SELLER' ? 
                (
                  <>
                  <div
                    className="userType-container"
                  >

                    <Chips value={user.type} />
                    <div
                      className="losange-rating-container"
                      >
                      {arrayRating.map((_, index) => (
                        <RatingLosange key={index} index={_}  rating={user.rating} />
                      ))}
                    </div>    
                  </div>
                  <div>
                    <button
                      onClick={() => navigate('/dashboard')}
                    >
                      Mes produits
                    </button>
                  </div>
                  </>

                )
              :
              user.type === 'CLIENT' ? 
                  (
                    <>
                    <div
                      className="userType-container"
                    >
                      <Chips value={user.type} />
                      <div
                        className="losange-rating-container"
                      >
                        {Array(5).map((rating, index) => (
                          <RatingLosange key={index} index={index} rating={rating}/>
                        ))}
                      </div>   
                    </div> 
                    <div>
                      <span>Mes historiques d'achats</span>
                      <div>
                        
                      </div>
                    </div>
                    </>
                  )
                :
                  (
                    null
                  )
              }

          </div>
        </div>
      )}

      <BTNLogout />
    </main>
  );
};

export default Account;
