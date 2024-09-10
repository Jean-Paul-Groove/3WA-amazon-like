import { useDispatch } from "react-redux"
import { Product } from "../utils/types"
import './ProductCard.css'
import { addProductToCart, removeProductFromCart } from "../store/cartReducer"
import { useAppSelector } from "../store"
interface ProductCardProps {
  product: Product,
  horizontal?:boolean
}
const ProductCard = (props:ProductCardProps) => {
  const {product, horizontal} = props
  const dispactch = useDispatch()
  const isSelected = useAppSelector(state => state.cart.products.find(p => p.id ===product.id))
  function handleClick(){
    if(isSelected){
dispactch(removeProductFromCart(product.id))
    }
    else{
      dispactch(addProductToCart(product))
    }
  }
  if(horizontal){
    return(<figure className="product-card-horizontal">
      <img className="product-card_img" src={product.img} alt={product.name} />
      <div className="product-card_footer">
      <h3 className="product-card_title">{product.name}</h3>
      <div className="product-card_price">{product.price.toFixed(2)} <span> €</span></div>
      <button className="product-card_button" onClick={()=>handleClick()}>{ isSelected ? 'Retirer du panier': 'Ajouter au panier'}</button>

      </div>
  </figure>)
  }else{

    return (
      <figure className={isSelected ? "product-card selected" :"product-card"}>
        <img className="product-card_img" src={product.img} alt={product.name} />
        <div className="product-card_footer">
        <div className="product-card_price">{product.price.toFixed(2)} <span> €</span></div>
        <h3 className="product-card_title">{product.name}</h3>
        <div className="product-card_category">{product.category}</div>
        <button className="product-card_button" onClick={()=>handleClick()}>{ isSelected ? 'Retirer du panier': 'Ajouter au panier'}</button>

        </div>
    </figure>
  )
}
}
export default ProductCard