import { Product } from "../utils/types"
import './ProductCard.css'
const ProductCard = ({product}:{product:Product}) => {
  return (
    <figure className="product-card">
        <img className="product-card_img" src={product.img} alt={product.name} />
        <div className="product-card_footer">
        <div className="product-card_price">{product.price.toFixed(2)} <span> €</span></div>
        <h3 className="product-card_title">{product.name}</h3>
        <div className="product-card_category">{product.category}</div>
        <button className="product-card_button">Ajouter au panier</button>

        </div>
    </figure>
  )
}
export default ProductCard