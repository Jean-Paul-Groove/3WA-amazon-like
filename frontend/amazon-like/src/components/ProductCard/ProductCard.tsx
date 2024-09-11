import { useDispatch } from "react-redux"
import { Product } from "../../utils/types"
import './ProductCard.css'
import { addProductToCart, removeProductFromCart } from "../../store/cartReducer"
import { AppDispatch, useAppSelector } from "../../store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchUserById, Seller } from "../../store/userReducer"
import SellerCard from "../SellerCard/SellerCard"
interface ProductCardProps {
  product: Product,
  horizontal?:boolean
}
const ProductCard = (props:ProductCardProps) => {
  const [seller, setSeller] = useState<Seller>()
  const {product, horizontal} = props
  const dispactch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const isSelected = useAppSelector(state => state.cart.products.find(p => p.id ===product.id))
  useEffect(()=>{
    fetchSeller()
  }, [])
  async function  fetchSeller(){
    const res = await dispactch(fetchUserById(product.seller_id)).unwrap()
    if(res != null && res.length){
      setSeller(res[0])
    }
  }
  function handleClick(e:React.MouseEvent){
    e.stopPropagation()
    if(isSelected){
dispactch(removeProductFromCart(product.id))
    }
    else{
      dispactch(addProductToCart(product))
    }
  }
  if(horizontal){
    return(<figure className="product-card-horizontal">
      <div className="product-card_header">
      <img className="product-card_img" src={product.img} alt={product.name} />
      <h3 className="product-card_title">{product.name}</h3>
      <div className="product-card_price">{product.price.toFixed(2)} <span> €</span></div>
      </div>
      <div className="product-card_footer">
      {seller &&<div className="product-card_seller-container"><SellerCard seller={seller} smallRating/></div> }
      <button className="product-card_button" onClick={handleClick}>{ isSelected ? 'Retirer du panier': 'Ajouter au panier'}</button>

      </div>
  </figure>)
  }else{

    return (
      <figure onClick={()=>navigate('/products/'+product.id)} className={isSelected ? "product-card selected" :"product-card"}>
        <img className="product-card_img" src={product.img} alt={product.name} />
        <div className="product-card_footer">
        <div className="product-card_price">{product.price.toFixed(2)} <span> €</span></div>
        <h3 className="product-card_title">{product.name}</h3>
        <div className="product-card_category">{product.category}</div>
        {seller &&<div className="product-card_seller-container"><SellerCard seller={seller} smallRating/></div> }
        <button className="product-card_button" onClick={handleClick}>{ isSelected ? 'Retirer du panier': 'Ajouter au panier'}</button>

        </div>
    </figure>
  )
}
}
export default ProductCard