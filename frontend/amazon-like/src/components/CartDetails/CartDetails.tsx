import { useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../store";
import ProductCard from "../ProductCard/ProductCard";
import "./CartDetails.css";
import { useDispatch } from "react-redux";
import { toggleCartDetails } from "../../store/cartReducer";
const CartDetails = () => {
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const isOpen = useAppSelector(state => state.cart.isOpen)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  function goToCheckout(){
    dispatch(toggleCartDetails())
    navigate("/checkout")
  }
  return (
    <section  className={isOpen ? "cart-details opened" : "cart-details"}>
      <h2>Votre pannier</h2>
      <div className="cart-details_list">
      {cartProducts?.length > 0 &&
        cartProducts.map((product) => (
          <ProductCard product={product} key={product.id} horizontal />
        ))}</div>
      <div className="cart-details_total">
        Prix total: <span className="cart-details_total_price">{totalPrice.toFixed(2)} €</span>
        <button onClick={goToCheckout} className="cart-details-confirm" disabled={cartProducts?.length === 0}>Passer commande</button>
      </div>
    </section>
  );
};
export default CartDetails;
