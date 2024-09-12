import { useEffect, useState } from "react";
import InputLine from "../components/InputLine/InputLine";
import { supabase } from './../supabase/supabaseClient'; 
import BTNLogout from "../components/BTNLogout/BTNLogout";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/supabase/uploadImage";
import { Session } from "@supabase/supabase-js";


const FirstConnection = () => {

  const navigate = useNavigate();

  const [ sessionActive, setSessionActive ] = useState<{ session: Session; }>();
  const [ picture, setPicture ] = useState("");

  const [userNewMetaData, setNewUserMetaData] = useState({
    photo: '',
    name: '',
    type: '',
    address:'',
    email: '',
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session.session) {
        console.error("Erreur lors de la récupération de la session :", sessionError);
        navigate("/login");
        return;
      }
      else{
        setSessionActive(session);
      }
    }
    fetchSession();
  },[]);
  
  

  const handleChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    setNewUserMetaData({
      ...userNewMetaData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handlePhoto =async (evt) => {

    if(sessionActive){
      const photoImport = evt.target.files[0];

      setPicture(URL.createObjectURL(photoImport))
    const pictureUrl = await uploadImage('images/user',photoImport,sessionActive.session.user.id)
      setNewUserMetaData({
        ...userNewMetaData,
        photo: pictureUrl,
      });

  };
  }
  useEffect(() => {
  }, [userNewMetaData]);

  const submitForm = async (evt: React.FormEvent) => {
    evt.preventDefault();  
    
    if(sessionActive){
      const { data, error } = await supabase.rpc('first_connection_create_info', {
        informations : userNewMetaData,
        session_id : sessionActive.session.user.id,
      })
      if (error) {
        if(error.message === 'Un utilisateur avec cet ID existe déjà'){
          navigate("/account");
        }
        else{
          console.error("Erreur lors de la création de l'utilisateur :", error);
        }
      } else {
        console.log('Utilisateur créé avec succès :', data);
        navigate("/account");
      }
    }
    else{
      console.error("Erreur lors de la récupération de la session");
    }
  };

  return (
    <main className="auth-page" >
        <h2>Information personnelles</h2>
        <form 
          onSubmit={submitForm}
          className="auth-container first-connection"
          >
          {picture ? 
            <div className="photo-user-container">
              <img src={picture} alt="photo-user" className="photo-user-img"/>
              <button 
                onClick={() => setPicture("")}
              >
                Supprimer l'image
              </button>
            </div>
              : 
              <label>
                <div className="img-input">
                  <span>Importer photo</span>
                  <input type="file" name="photo" onChange={handlePhoto}/>
                </div>
              </label>
            }
          <InputLine
            label="Name"
            value={userNewMetaData.name}
            name="name"
            onChange={handleChange}
            required
            />
          <InputLine
            label="Adresse"
            value={userNewMetaData.address}
            name="address"
            onChange={handleChange}
            required
            />
          <InputLine
            label="Contact"
            value={userNewMetaData.email}
            name="email"
            onChange={handleChange}
            required
            />
          <label>
            Quel type d'utilisateur êtes-vous ?
            <select
              name="type"
              defaultValue=""
              required
              onChange={(evt) => setNewUserMetaData({ ...userNewMetaData, type: evt.target.value })}
              >
              <option value=""></option>
              <option value="CLIENT">Client</option>
              <option value="SELLER">Seller</option>
            </select>
          </label>
          <button type="submit" disabled={!userNewMetaData.type? true : false}>Confirmer</button>
        </form>

        <BTNLogout />
    </main>
  );
};

export default FirstConnection;