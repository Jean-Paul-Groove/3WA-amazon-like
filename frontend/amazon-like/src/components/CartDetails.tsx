import { useAppSelector } from "../store";
import ProductCard from "./ProductCard";
import "./CartDetails.css";
const CartDetails = ({ opened }:{opened:boolean}) => {
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  return (
    <section  className={opened ? "cart-details opened" : "cart-details"}>
      <h2>Votre pannier</h2>
      <div className="cart-details_list">
      {cartProducts?.length > 0 &&
        cartProducts.map((product) => (
          <ProductCard product={product} key={product.id} horizontal />
        ))}</div>
      <div className="cart-details_total">
        Prix total: <span className="cart-details_total_price">{totalPrice.toFixed(2)} €</span>
        <button className="cart-details-confirm" disabled={cartProducts?.length === 0}>Passer commande</button>
      </div>
    </section>
  );
};
export default CartDetails;
