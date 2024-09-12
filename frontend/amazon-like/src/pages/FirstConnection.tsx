import { useEffect, useState } from "react";
import InputLine from "../components/InputLine/InputLine";
import { supabase } from './../supabase/supabaseClient'; 
import { ButtonClickEvent } from "../lib/types"; 
import BTNLogout from "../components/BTNLogout/BTNLogout";
import { useNavigate } from "react-router-dom";


const FirstConnection = () => {

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const navigate = useNavigate();

  const [ sessionActive, setSessionActive ] = useState();
  const [ picture, setPicture ] = useState("");

  const [userNewMetaData, setNewUserMetaData] = useState({
    photo: '',
    name: undefined,
    type: undefined,
    address: undefined,
    email: undefined,
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
  
  

  const handleChange = (evt) => {
    setNewUserMetaData({
      ...userNewMetaData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handlePhoto =async (evt) => {

    if(sessionActive){
      const photoImport = evt.target.files[0];

      setPicture(URL.createObjectURL(photoImport))
    
      setNewUserMetaData({
        ...userNewMetaData,
        photo: `${supabaseUrl}/storage/v1/object/public/images/${sessionActive.session.user.id}`,
      });


      const { data, error } = await supabase
      .storage
      .from('images')
      .upload(sessionActive.session.user.id+'.png', photoImport)
      if (error) {
        console.error("Erreur lors de l'upload de l'image :", error);
      } else {
        console.log('Image uploadée avec succès :', data);
    }
  };
  }
  useEffect(() => {
  }, [userNewMetaData]);

  const submitForm = async (evt: ButtonClickEvent) => {
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