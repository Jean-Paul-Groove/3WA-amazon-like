import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import Autocomplete from "../utils/Autocomplete/Autocomplete";
type DeliveryMode = "INDIVIDUAL" | "PICK_UP";
type Address = {
  label: string |undefined;
  position: number[];
};
const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state) => state.user.currentUser
  );
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("INDIVIDUAL");
  const [newAddress, setNewAddress] = useState<Address>({
    label: "",
    position: [0, 0],
  });
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [isChangeAddress, setChangeAddress] = useState(false);
  useEffect(() => {
    if (cart && cart.products.length === 0) {
      navigate("/products", { replace: true });
    }

  }, [cart]);
  useEffect(() => {
    if (deliveryMode === "INDIVIDUAL" && currentUser?.address) {
      setSelectedAddress(currentUser?.address);
    }
  }, [currentUser?.address, deliveryMode]);
  function changeAddress() {
    setChangeAddress(true);
  }
  function handleDeliveryModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true) {
      setDeliveryMode(e.target.value as DeliveryMode);
    }
  }
  function handleConfirmNewAddress(e: React.MouseEvent) {
    e.stopPropagation();
    setNewAddress({ label: "", position: [0,0] });
    setChangeAddress(false);
    // CHANGE HOME ADDRESS IN DATABASE
  }
  function handleCancelNewAddress(e: React.MouseEvent) {
    e.stopPropagation();
    setNewAddress({ label: "", position: [0,0] });
    setChangeAddress(false);
  }
  async function handleConfirmOrder(e:React.MouseEvent){
    e.stopPropagation()
    try{
      if(!selectedAddress?.label){
        throw new Error('No address was selected')
      }
      console.log({products:cart.products.map(product => product.id), client_id:currentUser?.id})
    }catch(error){
      console.log(error)
    }
  }
  return (
    <main className="checkout">
      <h1 className="checkout_title">Votre pannier</h1>
      <section>
        <h2>Votre commande</h2>
        <div className="checkout_product-list">
          {cart &&
            cart.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        {cart && (
          <div className="checkout_product-list_total">
            Total:
            <p>{cart.totalPrice.toFixed(2)} €</p>
          </div>
        )}
      </section>
      <section>
        <h2>Votre livraison</h2>
        <div className="checkout_delivery">
          <fieldset className="checkout_delivery_radio_container">
            <legend>Choisissez votre mode de livraison</legend>

            <div className="checkout_delivery_radio">
              <label htmlFor="home-address">Chez vous</label>
              <input
                type="radio"
                name="delivery-type"
                id="home-address"
                value="INDIVIDUAL"
                onChange={handleDeliveryModeChange}
                checked={deliveryMode === "INDIVIDUAL"}
              />
            </div>

            <div className="checkout_delivery_radio">
              <label htmlFor="relay-point">En point relais</label>
              <input
                type="radio"
                name="delivery-type"
                id="relay-point"
                value="PICK_UP"
                checked={deliveryMode === "PICK_UP"}
                onChange={handleDeliveryModeChange}
              />
            </div>
          </fieldset>
          <div className="checkout_delivery_home-address">
            {currentUser?.address && deliveryMode === "INDIVIDUAL" ? (
              isChangeAddress ? (
                <div>
                  <input
                    type="text"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({...newAddress, label:e.target.value})}
                  />{ isChangeAddress &&
                  <Autocomplete
                    setIsOpen={setChangeAddress}
                    input={newAddress.label}
                    setInput={({ input, latitude, longitude }) =>
                      setNewAddress({
                        label: input,
                        position: [longitude, latitude],
                      })
                    }
                  />}
                  <button onClick={handleConfirmNewAddress}>Confirmer</button>
                  <button onClick={handleCancelNewAddress}>Annuler</button>
                </div>
              ) : (
                <div>
                  Livraison:
                  <p>{currentUser?.address.label}</p>
                  <button onClick={() => changeAddress()}>
                    Choisir une autre adresse
                  </button>
                </div>
              )
            ) : (
              <div>En point relais</div>
            )}
          </div>
        </div>
      </section>
      <section>
        <h2>Moyen de paiement</h2>
      </section>
      <button onClick={handleConfirmOrder}>Confirmer</button>
    </main>
  );
};
export default CheckoutPage;
