import { Product } from "../utils/types"
import './ProductCard.css'
const ProductCard = ({product}:{product:Product}) => {
  return (
    <figure className="product-card">
        <h3 className="product-card_title">{product.name}</h3>
        <img className="product-card_img" src={product.img} alt={product.name} />
        <div className="product-card_footer">
        <div className="product-card_price">{product.price + ' €'}</div>
        <div className="product-card_category">{product.category}</div>

        </div>
    </figure>
  )
}
export default ProductCard