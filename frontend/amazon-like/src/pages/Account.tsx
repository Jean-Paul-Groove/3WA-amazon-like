import { useEffect } from "react";
import checkSession from "../bridge/checkSession";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import BTNLogout from "../components/BTNLogout";
import DetailWithLabel from "../components/DetailWithLabel";
import RatingLosange from "../components/RatingLosange";



const Account = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const init = async () => {
        try {
          const userData = await checkSession(true);
          console.log('userData init:', userData);
    
          if (!userData || !userData.name) {
            navigate("/first-connection");
          } else {
            console.log("User data from checkSession:", userData);
            setUser(userData);
          }
        } catch (error) {
          console.error("Error in session check:", error);
          navigate("/login");
        }
      };
    
      useEffect(() => {
        init();

        
      }, []);
    

  return (
    <main>
      {!user ? (
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
              <DetailWithLabel label='Email' content={user.email} />
              <DetailWithLabel label='Adresse' content={user.address} />
            </div>
          </div>
          <div>
            {user.type === 'SELLER' ? 
              (
                  <div
                    className="losange-rating-container"
                  >
                    {Array.from(5).map((rating, index) => (
                      <RatingLosange key={index} index={index}  rating={rating}/>
                    ))}
                  </div>    
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
