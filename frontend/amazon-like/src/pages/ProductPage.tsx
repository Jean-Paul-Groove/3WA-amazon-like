import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store";
import { fetchProductById } from "../store/productsReducer";
import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import './ProductPage.css'
import { addProductToCart, removeProductFromCart } from "../store/cartReducer";
import { fetchUserById } from "../store/userReducer";
const ProductPage = () => {
  const productId = useParams().id;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [seller, setSeller] = useState({})
  async function fetchProduct() {
    const res = await dispatch(fetchProductById(+productId)).unwrap();
    if (res != null && res.length) {
      setProduct(res[0]);
     await fetchProductSeller(res[0].sellerId)
    } else {
      console.log("RES = null");
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
        <div className="product_seller"></div>
      </main>
    );
  }
  return <></>;
};
export default ProductPage;
