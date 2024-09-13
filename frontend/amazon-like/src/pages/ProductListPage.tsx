import { useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import './ProductListPage.css'
import  { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { fetchProducts, initPagination, switchPage } from "../store/productsReducer";
import { Product } from "../utils/types";
import Filters from "../components/Filters/Filters";
const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productList:Product[] = useAppSelector(state => {
    return state.products.productsDisplayed})
const pagination = useAppSelector(state => state.products)
async function fetchProductsToDisplay(){
  await   dispatch(initPagination()).unwrap()
  await dispatch(fetchProducts())
}
  useEffect(() => {
    fetchProductsToDisplay()
  }, [pagination.currentPage, pagination.filters]);

function goToPage(pageNumber:number){
  if(pageNumber !== pagination.currentPage){
    dispatch(switchPage(pageNumber))
  }
}
  return <main className="products">
    <h1 className="products_title">Parcourez nos produits</h1>
    <Filters/>
    <section className="products_list">
    {productList&&productList.length > 0 && productList.map(product =>  <ProductCard key={product.id} product={product} />)}
    </section>
    <div className="products_pagination">
      <p>Pages:</p>
    {pagination?.totalPages && <div>{[...new Array(pagination.totalPages)].map((value,index) => <p key={index} className={pagination.currentPage === index+1 ? 'currentPage products_pagination_page':'products_pagination_page' } onClick={()=>goToPage(index+1)}>{index+1}</p>)}</div>}
    </div>
    </main>;
};
export default ProductListPage;
