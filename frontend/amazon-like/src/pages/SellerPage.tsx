import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { fetchSellerById, Seller } from "../store/userReducer";
import SellerCard from "../components/SellerCard/SellerCard";
import { Product } from "../utils/types";
import { supabase } from "../supabase/supabaseClient";
import ProductCard from "../components/ProductCard/ProductCard";
import './SellerPage.css'


const SellerPage = () => {
  const [seller, setSeller] = useState<Seller>();
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      getSeller(id);
    }
  }, []);
  useEffect(() => {
    if (seller?.id) {
      fetchSellerProducts();
    }
  }, [seller]);
  async function getSeller(id: string | number) {
    const sellerInfo = await dispatch(fetchSellerById(+id)).unwrap();
    if (sellerInfo?.length) {
      setSeller(sellerInfo[0]);
    }
  }
  async function fetchSellerProducts() {
    if (seller) {
      const { data, error } = await supabase.rpc("get_products_for_seller", {
        id_of_seller: seller.id,
      });
      if (error) {
        console.error("Error fetching seller products:", error);
        return;
      }
      setSellerProducts(data);
    }
  }
  if (seller) {
    return (
      <main className="seller-page">
        <h1>Vous êtes sur la page de {seller.name}</h1>
        <div className="seller-page_seller-info">
          {" "}
          <SellerCard seller={seller} />
        </div>
        <section>
          {sellerProducts && sellerProducts.length >0 ? <h2> Voici ses produits :</h2> : <h2>{seller.name} n'a pas de produits en vente pour le moment</h2>}
           <div  className="seller-page_product-list">
             {sellerProducts && sellerProducts.length > 0 && sellerProducts.map(product=>
                            <ProductCard key={product.id} product={product} />
                        )}
            </div>
        </section>
      </main>
    );
  }
  return <main></main>;
};
export default SellerPage;
