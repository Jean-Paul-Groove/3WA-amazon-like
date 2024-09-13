import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import { AppDispatch, useAppSelector } from "../store";
import { supabase } from "../supabase/supabaseClient";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Dashboard.css";
import InputLine from "../components/InputLine/InputLine";
import { postNewProduct } from "../utils/supabase/postProduct";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../store/productsReducer";
import { uploadImage } from "../utils/supabase/uploadImage";
const Dashboard = () => {
  interface DashboardProduct extends Product {seller:{id:number,name:string}}
  const [sellerProducts, setSellerProducts] = useState<DashboardProduct[]>([]);
  const [newProduct, setNewProduct] = useState({name:'',price:'',category:'',description:'',img:''})
  const [picture, setPicture] = useState()
  const [editPicture, setEditPicture] = useState()
  const [isModalOpen, setModalIsOpen] = useState<'NONE'|'EDIT'|'DELETE'>('NONE')
  const [productToModify,setProductToModify] = useState<Product | undefined>()
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>()
  function openEditModal(product:Product){
    setProductToModify(product)
    setModalIsOpen('EDIT')
    
  }
  function openDeleteModal(product:Product){
    setProductToModify(product)
    setModalIsOpen('DELETE')
    
  }
  function closeModal(){
    setProductToModify(undefined)
    setModalIsOpen('NONE')
  }
  async function fetchSellerProducts() {
    if (currentUser) {
      if (currentUser.type === "SELLER") {
        const { data, error } = await supabase.rpc("get_products_for_seller", {id_of_seller:currentUser.id});
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
  function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type:'NEW'|'EDIT' ='NEW'){
    e.preventDefault()
    if(e.target.name){
      if(type === 'NEW'){
        setNewProduct({...newProduct, [e.target.name]:e.target.value})
      }
      if(type === 'EDIT' && productToModify){
        setProductToModify({...productToModify, [e.target.name]:e.target.value})
      }
    }
  }
  function handlePhoto(evt:React.ChangeEvent){
    const photoImport = evt.target.files[0];
    setPicture(photoImport)

      setNewProduct({...newProduct, img:URL.createObjectURL(photoImport)})
  }
  function handleEditPhoto(evt:React.ChangeEvent){
    if(!productToModify){
      return
    }
    const photoImport = evt.target.files[0];
    setEditPicture(photoImport)

      setProductToModify({...productToModify, img:URL.createObjectURL(photoImport)})
  }
 async function handleSubmitNewProduct(e:React.FormEvent){
   e.preventDefault()
  if(newProduct.category && newProduct.img && newProduct.name && newProduct.price && picture && currentUser?.user_id){
    const {price,name,category,description} = newProduct
    await postNewProduct({name,category,description,price:+price},currentUser.user_id,picture )
    setNewProduct({name:'',price:'',category:'',description:'',img:''})
    fetchSellerProducts()
  }

  }
  async function handleConfirmModal(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.stopPropagation()
if(isModalOpen === 'DELETE' && productToModify){
await dispatch(deleteProduct(productToModify.id))
fetchSellerProducts()
closeModal()
}
if(isModalOpen === 'EDIT' && productToModify){
  const editedProduct = {...productToModify}
  if(editPicture){
    console.log(editPicture)

   const newUrl = await uploadImage('images/products',editPicture,'products-'+productToModify.id +'-'+Date.now())
   console.log(newUrl)
   editedProduct.img = newUrl
   setEditPicture(undefined)
  }
  console.log(productToModify)
  await dispatch(updateProduct(editedProduct))
  fetchSellerProducts()
closeModal()
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
        <form className="dashboard_add-product_form" action="">
          <InputLine label="Nom" value={newProduct.name} name="name" required onChange={handleChange} />
          <InputLine label="Prix" value={newProduct.price} name="price" required onChange={handleChange} />
          <InputLine label="Catégorie"value={newProduct.category} name="category" required onChange={handleChange} />
          <div className="dashboard_add-product_form_text-area-container">
          <label htmlFor="description">
            Description </label>
            <textarea name="description" value={newProduct.description} onChange={handleChange}/>
          </div>
         
          <button onClick={handleSubmitNewProduct} type="submit">Valider</button>
        </form></div>
      </section>
      <div className="dashboard_list">
        {sellerProducts?.length > 0 &&
          sellerProducts.map((product) => (
            <ProductCard canBeModified openEditModal={openEditModal} openDeleteModal={openDeleteModal} key={product.id} product={product} hideSeller hideButton />
          ))}
      </div>
     {isModalOpen !== 'NONE' && <>
    <div className="dashboard_modal-container" onClick={()=>closeModal()}>
       </div> <div className="dashboard_modal" >
        {  productToModify &&( isModalOpen  === 'DELETE'? <p>Voulez vous supprimer le produit {productToModify?.name} ?</p>: <form className="dashboard_add-product_form" action="">
          <InputLine label="Nom" value={productToModify.name} name="name" required onChange={(e)=>handleChange(e,'EDIT')} />
          <InputLine label="Prix" value={productToModify.price} name="price" required onChange={(e)=>handleChange(e,'EDIT')} />
          <InputLine label="Catégorie"value={productToModify.category} name="category" required onChange={(e)=>handleChange(e,'EDIT')} />
          <div className="dashboard_add-product_form_text-area-container">
          <label htmlFor="description">
            Description </label>
            <textarea name="description" value={productToModify.description} onChange={(e)=>handleChange(e,'EDIT')}/>
          </div>
          <div className="dashboard_add-product_img-container">
              <img src={productToModify.img} className="dashboard_add-product_img"/>
              <input type="file" name="photo" onChange={handleEditPhoto}/>
            </div>
         
        </form> )}
        <div className="dashboard_modal_actions">

<button onClick={(e)=>handleConfirmModal(e)} >Confirmer</button> <button onClick={(e)=> {e.stopPropagation();
  closeModal()}
}>Annuler</button>
</div>
        </div>
       </> }
    </main>
  );
};

export default Dashboard;
