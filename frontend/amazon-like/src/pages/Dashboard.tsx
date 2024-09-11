import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Dashboard.css";
import InputLine from "../components/InputLine/InputLine";
const Dashboard = () => {
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({name:'',price:'',category:'',description:'',img:''})
  const [picture, setPicture] = useState()
  const currentUser = useAppSelector((state) => state.user.currentUser);
  async function fetchSellerProducts() {
    if (currentUser) {
      if (currentUser.type === "SELLER") {
        const { data, error } = await supabase.rpc("get_products_for_seller", {
          current_user_id: currentUser.id,
        });
        if (error) {
          console.error("Error fetching seller products:", error);
          return;
        }
        setSellerProducts(data);
      }
    }
  }
 
  useEffect(() => {
    fetchSellerProducts();
  }, [currentUser]);
  function handleChange(e:React.ChangeEvent<HTMLElement>){
    e.preventDefault()
    if(e.target.name){
      setNewProduct({...newProduct, [e.target.name]:e.target.value})
    }
  }
  function handlePhoto(evt:React.ChangeEventHandler<HTMLInputElement>){
    console.log('BOUUUUU')
    const photoImport = evt.target.files[0];
    setPicture(photoImport)

      setNewProduct({...newProduct, img:URL.createObjectURL(photoImport)})
  }
  function handleSubmitNewProduct(e){
   e.preventDefault()
  if(newProduct.category && newProduct.img && newProduct.name && newProduct.price){
    console.log(newProduct)
  }
  }
  return (
    <main className="dashboard">
      <h1>Votre espace de vente</h1>
      <section className="dashboard_add-product_section">
        <h2>Mettre un produit en vente</h2>
        <div className="dashboard_add-product">

        
        {newProduct?.img.length>0 ?
            <div className="dashboard_add-product_img-container">
              <img src={newProduct.img} className="dashboard_add-product_img"/>
              <button 
                onClick={() => {setNewProduct({...newProduct, img:''})
                 setPicture(undefined)}}
              >
                Supprimer l'image
              </button>
            </div>
              : 
              <label>
                <div className="dashboard_add-product_add-picture">
                  <span>Importer photo</span>
                  <input type="file" name="photo" onChange={handlePhoto}/>
                </div>
              </label>
            }
        <form action="">
          <InputLine label="Nom" value={newProduct.name} name="name" required onChange={handleChange} />
          <InputLine label="Prix" value={newProduct.price} name="price" required onChange={handleChange} />
          <InputLine label="Catégorie"value={newProduct.category} name="category" required onChange={handleChange} />
          <label htmlFor="description">
            Description
            <textarea name="description" value={newProduct.description} onChange={handleChange}/>
          </label>
          <button ty onClick={handleSubmitNewProduct} type="submit">Valider</button>
        </form></div>
      </section>
      <div className="dashboard_list">
        {sellerProducts.length > 0 &&
          sellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </main>
  );
};

export default Dashboard;
