import { useEffect, useState } from "react";
import InputLine from "../components/inputLine";
import { supabase } from './../supabase/supabaseClient';  // Assurez-vous d'importer votre client Supabase
import { ButtonClickEvent } from "../lib/types"; 
const FirstConnection = () => {
  const [userMetaData, setUserMetaData] = useState({
    photo: "",
    name: "",
    type: "",
    address: "",
    email: "",
  });

  const handleChange = (evt) => {
    setUserMetaData({
      ...userMetaData,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    console.log('userMetaData :', userMetaData);
  }, [userMetaData]);

  const submitForm = async (evt: ButtonClickEvent) => {
    evt.preventDefault();
    console.log('submitForm');

    const { data, error } = await supabase.rpc('first_connection_create_info', {
      formData: userMetaData,  
      user_id: supabase.auth.user().id,
    });

    if (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    } else {
      console.log('Utilisateur créé avec succès :', data);
    }
  };

  return (
    <main>
      <form onSubmit={submitForm}>
        <label>
          {userMetaData.photo ? 
            <img src={userMetaData.photo} alt="user"/>
            : 
            <div>
              <input type="file" name="photo" onChange={handleChange}/>
            </div>
          }
        </label>
        <InputLine
          label="Name"
          value={userMetaData.name}
          name="name"
          onChange={handleChange}
        />
        <InputLine
          label="Adresse"
          value={userMetaData.address}
          name="address"
          onChange={handleChange}
        />
        <InputLine
          label="Contact"
          value={userMetaData.email}
          name="email"
          onChange={handleChange}
        />
        <label>
          Quel type d'utilisateur êtes-vous ?
          <select
            name="type"
            defaultValue=" "
            onChange={(evt) => setUserMetaData({ ...userMetaData, type: evt.target.value })}
          >
            <option value=" "></option>
            <option value="CLIENT">Client</option>
            <option value="SELLER">Seller</option>
          </select>
        </label>
        <button type="submit">Confirmer</button>
      </form>
    </main>
  );
};

export default FirstConnection;