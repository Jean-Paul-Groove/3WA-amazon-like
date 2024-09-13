import { supabase } from "../../supabase/supabaseClient";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;


export const uploadImage = async (folderPath:string, file:File,fileName:string)=> {
    const { data, error } = await supabase
    .storage
    .from(folderPath)
    .upload(fileName, file)
    if (error) {
      if(error.error === 'Duplicate'){
        console.log("erreur duplicate");
        
          return `${supabaseUrl}/storage/v1/object/public/${data?.fullPath}`
      }
    } else {
      console.log('Image uploadée avec succès :', data);
  }
  console.log(data?.fullPath)
  return `${supabaseUrl}/storage/v1/object/public/${data?.fullPath}`
}