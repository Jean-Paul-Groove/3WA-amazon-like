import { supabase } from "../../supabase/supabaseClient"
import { uploadImage } from "./uploadImage"

interface ProductInfo{
    name:string, 
    price:number, 
    category: string,  
    description: string, 
}

export const postNewProduct = async(productInfo:ProductInfo, session_id:string, picture:File)=> {
try{
    const res = await supabase.rpc('create_new_product', {product_info:productInfo, session_id})
    const productId = res.data as number
    const imgUrl = await uploadImage('images/products',picture,'products-'+productId)
   await supabase.rpc('add_picture_url_to_product', {id_of_product:productId,url:imgUrl})
}catch(error){
    console.log(error)
}

}
