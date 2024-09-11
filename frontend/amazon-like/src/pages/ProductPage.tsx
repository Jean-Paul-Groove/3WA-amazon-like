import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store";
import { fetchProductById } from "../store/productsReducer";
import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import './ProductPage.css'
import { addProductToCart, removeProductFromCart } from "../store/cartReducer";
import { fetchUserById, Seller } from "../store/userReducer";
import SellerCard from "../components/SellerCard/SellerCard";
const ProductPage = () => {
  const productId = useParams().id;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [seller, setSeller] = useState<Seller>()
  async function fetchProduct() {
    if(productId){
      const res = await dispatch(fetchProductById(+productId)).unwrap();
      if (res != null && res.length) {
        setProduct(res[0]);
        await fetchProductSeller(res[0].seller_id)
      } else {
        console.log("RES = null");
      }
    }
  }
  async function fetchProductSeller(id:number){
    const res = await dispatch(fetchUserById(id)).unwrap()
    if(res !=null && res.length ===0){
        setSeller(res[0])
    }
  }
  const isSelected = useAppSelector(state => state.cart.products.find(p => p.id ===product?.id))
  useEffect(() => {
    fetchProduct();
  }, []);
  function handleClick(){
    if(!product){
        return
    }
    if(isSelected){
        dispatch(removeProductFromCart(product.id))
    }
    else{
        dispatch(addProductToCart(product))
    }
  }
  if (product) {
    return (
      <main className="product">
        <div className="product_back-to-products" onClick={()=>navigate('/products')}>← Tous les produits</div>
        <figure className="product_fig">
          <figcaption className="product_fig_caption">
            <h1>{product.name}</h1>
            <div>{product.category}</div>
            <div>{product.price.toFixed(2)}€</div>
          </figcaption>
          <div className="product_fig_container">
          <img className={isSelected  ? "product_fig_img selected":"product_fig_img"} src={product.img} alt={product.name} />
          <button className={isSelected ? "product_button selected" :"product_button" } onClick={()=>handleClick()}>{isSelected ? 'Retirer du panier' :'Ajouter au panier'}</button>
          </div>
        </figure>
        <div className="product_desc_container">
        <div className="product_desc">{product.description}</div>
<div className="product_desc_map"></div>
        </div>
        <div className="product_seller">
          {seller && <SellerCard seller={seller} />}
        </div>
      </main>
    );
  }
  return <></>;
};
export default ProductPage;
