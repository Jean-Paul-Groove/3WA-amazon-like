import { useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import './ProductListPage.css'
import  { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { fetchProducts, initPagination } from "../store/productsReducer";
import { Product } from "../utils/types";
const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productList:Product[] = useAppSelector(state => {
    return state.products.productsDisplayed})

async function fetchProductsToDisplay(){
  await   dispatch(initPagination()).unwrap()
  await dispatch(fetchProducts())
}
  useEffect(() => {
    fetchProductsToDisplay()
  }, []);

  return <main className="products">
    <h1 className="products_title">Parcourez nos produits</h1>
    <section className="products_list">
    {productList&&productList.length > 0 && productList.map(product =>  <ProductCard key={product.id} product={product} />)}
    </section>
    </main>;
};
export default ProductListPage;
