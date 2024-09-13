import { useEffect, useState } from 'react'
import { useAppSelector } from '../store'
import './CheckoutPage.css'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import Autocomplete from '../utils/Autocomplete/Autocomplete'
type DeliveryMode ='INDIVIDUAL'|'PICK_UP'
type Address = {label:string,
  position:[longitude:number,latitude:number]
}
const CheckoutPage = () => {
const cart = useAppSelector(state => state.cart)
const navigate = useNavigate()
const currentUserHomeAddress = useAppSelector(state=>state.user.currentUser?.address)
const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('INDIVIDUAL')
const [newAddress, setNewAddress] = useState('')
const [homeAddress, setHomeAddress]= useState<Address>()
const [selectedAddress, setSelectedAddress] = useState<Address>()
const [isChangeAddress, setChangeAddress] = useState(false)
useEffect(()=>{
if(cart && cart.products.length ===0){
  navigate('/products', {replace:true})
}
}, [cart])
useEffect(()=>{
  if(deliveryMode === 'INDIVIDUAL'){
    setSelectedAddress(homeAddress)
  }
}, [homeAddress, deliveryMode])
function changeAddress(){
  setChangeAddress(true)
}
function handleDeliveryModeChange(e:React.ChangeEvent<HTMLInputElement>){

if(e.target.checked === true){
  setDeliveryMode(e.target.value as DeliveryMode)
}

}
function handleConfirmNewAddress(e:React.MouseEvent){
  e.stopPropagation()
  setNewAddress('')
  setChangeAddress(false)
  // CHANGE HOME ADDRESS IN DATABASE
}
function handleCancelNewAddress(e:React.MouseEvent){
  e.stopPropagation()
  setNewAddress('')
  setChangeAddress(false)
}
  return (
    <main className='checkout'>
<h1 className='checkout_title'>Votre pannier</h1>
<section >
  <h2>Votre commande</h2>
  <div className='checkout_product-list'>
  {cart && cart.products.map(product => <ProductCard product={product}/>)}
  </div>
 { cart && <div className='checkout_product-list_total'>Total: 
    <p>{cart.totalPrice.toFixed(2)} €</p>
  </div>}
</section>
<section>
<h2>Votre livraison</h2>
<div className='checkout_delivery'>


<fieldset className='checkout_delivery_radio_container'>
  <legend>Choisissez votre mode de livraison</legend>

  <div className='checkout_delivery_radio'>
    <label  htmlFor="home-address">Chez vous</label>
  <input type="radio" name="delivery-type" id='home-address' value="INDIVIDUAL"onChange={handleDeliveryModeChange}  />
  </div>

  <div className='checkout_delivery_radio'>
    <label htmlFor="relay-point">En point relais</label>
  <input type="radio" name="delivery-type" id='relay-point' value="PICK_UP"  onChange={handleDeliveryModeChange}/>
  </div>
  </fieldset>
<div className='checkout_delivery_home-address'>
  {(currentUserHomeAddress && deliveryMode === 'INDIVIDUAL') ? (isChangeAddress ? <div>
    <input type="text" value={newAddress} onChange={(e)=>setNewAddress(e.target.value)} />
    <Autocomplete input={newAddress} setInput={setNewAddress}/><button onClick={handleConfirmNewAddress}>Confirmer</button><button onClick={handleCancelNewAddress}>Annuler</button></div> :<div>Livraison: 
    
    <p>{currentUserHomeAddress}</p>
    <button onClick={()=>changeAddress()}>Choisir une autre adresse</button></div>) : <div>En point relais</div>}
</div></div>
</section>
<section>
  <h2>Moyen de paiement</h2>
</section>
<button>Confirmer</button>
    </main>
  )
}
export default CheckoutPage