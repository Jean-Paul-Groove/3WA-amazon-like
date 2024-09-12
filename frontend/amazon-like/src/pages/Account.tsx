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
import { OrderListType } from "../utils/types";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.user.currentUser);

  const [userBoughtsHistoryList, setUserBoughtsHistoryList] = useState<OrderListType | null>();
  const [userSellsHistoryList, setUserSellsHistoryList] = useState<OrderListType | null>();


  const fetchBoughtsHistory = async () => {
    const { data: boughts, error: boughtsError } = await supabase.rpc("account_get_boughts_orders",{session_user_id : user?.id});
    if (boughtsError) {
      console.error("Erreur lors de la récupération de l'historique des achats :", boughtsError);
      return;
    }
    else if ( boughts.length === 0){
      return null
    } 
    else{
      setUserBoughtsHistoryList(boughts);
    }   
  }
  const fetchSellsHistory = async () => {
    const { data: sells, error: sellsError } = await supabase.rpc('account_get_sells_orders',{session_user_id : user.id})
    if (sellsError) {
      console.error("Erreur lors de la récupération de l'historique des achats :", boughtsError);
      return;
    }
    else if ( sells.length === 0){
      return null
    } 
    else{
    setUserSellsHistoryList(sells);
    }
  }


  const init = async () => {
    try {
      const userSession = await checkSession(true);
      if (userSession) {
        const userInfo = await dispatch(fetchUserById(userSession.user_id)).unwrap();
        if (userInfo) {
          dispatch(
            setCurrentUSer({
              ...userInfo,
              supabase_token: userSession.supabase_token,
            })
          );
        } else {
          navigate("/first-connection");
        }
      }
    } catch (error) {
      console.error("Error in session check:", error);
      navigate("/login");
    }
  };

  // Fetch des commandes pour les historiques d'achat et de vente
  

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (user) {
      if(user?.history?.bought){
      fetchBoughtsHistory();
      }
      if(user?.history?.sold){
      fetchSellsHistory();
      }
    }
  }, [user]);

  return (
    <main className="account-container">
      {user == null ? (
        <div>
          <h1>Account</h1>
          <p>Chargement...</p>
        </div>
      ) : (
        <div>
          <div className="account-detail-container">
            <img
              src={user.profile_img}
              alt={`photo de profile de ${user.name}`}
              className="profile-picture"
            />
            <div className="account-details-list">
              <DetailWithLabel label="Nom" content={user.name} />
              <DetailWithLabel label="Contact" content={user.contact} />
              <DetailWithLabel label="Adresse" content={user.address} />
            </div>
          </div>
          <div>
            <div className="user-type-rating-container">
              <Chips value={user.type} />
              {user.type === "SELLER" && <RatingContainer rating={user.rating} size={"L"} />}
            </div>
            <div className="history_container">
              <div className="order_history_container">
                <div
                  className="order_history_header"
                >
                  <div className="order_history_button">
                    <button onClick={() => navigate("/dashboard")}>Mes produits</button>
                  </div>
                    <h4>Historique des ventes</h4>
                  </div>
                  <div 
                    className="order_history_list"
                  >
                    {!userSellsHistoryList ? (
                      <p>Aucune vente</p>
                    ) : (
                      userSellsHistoryList.map((order, index) => (
                        <OrderCard order={order} key={`order-sell-${index}`} />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="order_history_container">
                <div className="order_history_header">
                  <h4>Historique des achats</h4>
                </div>
                <div className="order_history_list bought">
                    {!userBoughtsHistoryList ? (
                      <p>Aucun achat</p>
                    ) : (
                      userBoughtsHistoryList.map((order, index) => (
                        <OrderCard order={order} key={`order-bought-${index}`} />
                      ))
                    )}
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